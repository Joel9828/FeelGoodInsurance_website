/* Feel Good Insurance — interactive 3D service-area map (Three.js)
   Loaded on demand by main.js when a [data-area3d] section approaches the viewport. */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const GOLD = new THREE.Color('#e2c88f');
const GOLD_DEEP = new THREE.Color('#c7a25a');

/* ---------- terrain height field (procedural Northern Nevada) ---------- */
function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y) { let f = 0, amp = 0.5; for (let i = 0; i < 4; i++) { f += amp * vnoise(x, y); x *= 2.03; y *= 2.03; amp *= 0.5; } return f; }
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function makeHeight(towns, lake) {
  return (x, z) => {
    let h = fbm(x * 0.035 + 7, z * 0.035 + 3) * 7 - 2.2;
    h += smooth(-26, -62, x) * (10 + fbm(x * 0.07, z * 0.07) * 11);        // Sierra Nevada to the west
    h += smooth(16, 32, x) * smooth(62, 40, x) * fbm(x * 0.08 + 4, z * 0.08) * 7; // Pah Rah / Virginia ranges
    h += smooth(60, 90, Math.hypot(x, z)) * 4;                              // rim
    for (const t of towns) { const d = Math.hypot(x - t.x, z - t.z); h = h * (0.35 + 0.65 * smooth(2.5, 11, d)) + (1 - smooth(2.5, 11, d)) * 0.6; }
    const dl = Math.hypot((x - lake.x) / 1.0, (z - lake.z) / 1.45);
    h = h * smooth(7, 15, dl) + (1 - smooth(7, 15, dl)) * -1.4;            // Lake Tahoe basin
    return h;
  };
}

/* ---------- shaders ---------- */
const terrainVS = `
  varying vec3 vPos; varying float vDepth;
  void main(){ vec4 wp = modelMatrix*vec4(position,1.0); vPos = wp.xyz; vec4 mv = viewMatrix*wp; vDepth = -mv.z; gl_Position = projectionMatrix*mv; }`;
const terrainFS = `
  uniform float uTime; uniform vec3 uHL; uniform float uHLa; uniform float uReveal; uniform vec3 uGold;
  varying vec3 vPos; varying float vDepth;
  float line(float v, float w){ float d = abs(fract(v-0.5)-0.5)/max(fwidth(v),1e-4); return 1.0-min(d/w,1.0); }
  void main(){
    vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
    float lit = clamp(dot(n, normalize(vec3(-0.5,0.9,0.35))),0.0,1.0);
    float h = vPos.y;
    vec3 base = mix(vec3(0.05,0.045,0.038), vec3(0.2,0.17,0.12), smoothstep(-2.0,18.0,h));
    base *= 0.6 + 0.9*lit;
    float minor = line(h*0.9, 1.0);
    float major = line(h*0.18, 1.2);
    float grid = max(line(vPos.x/8.0,0.8), line(vPos.z/8.0,0.8))*0.05;
    float r = length(vPos.xz);
    float reveal = smoothstep(uReveal*170.0, uReveal*170.0-22.0, r);
    float scanR = mod(uTime*16.0, 190.0);
    float scan = exp(-pow((r-scanR)/2.6,2.0))*0.55*(1.0-scanR/190.0);
    float hl = uHLa*exp(-pow(length(vPos.xz-uHL.xz),2.0)/30.0);
    vec3 col = base + uGold*(minor*0.24 + major*0.6 + grid + scan*0.6 + hl*0.55);
    col += uGold*hl*0.25*line(length(vPos.xz-uHL.xz)*0.6 - uTime*1.5, 1.4);
    float fog = smoothstep(140.0, 320.0, vDepth);
    col = mix(col, vec3(0.04,0.037,0.032), fog);
    gl_FragColor = vec4(col*reveal + vec3(0.04,0.037,0.032)*(1.0-reveal), 1.0);
  }`;
const flowVS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const arcFS = `
  uniform float uTime; uniform float uDraw; uniform float uHi; uniform vec3 uColor; varying vec2 vUv;
  void main(){
    if (vUv.x > uDraw) discard;
    float dash = smoothstep(0.35,0.5,fract(vUv.x*6.0 - uTime*(0.6+uHi*1.4)));
    float head = exp(-pow((vUv.x - fract(uTime*0.35+uHi*0.0))*10.0,2.0));
    float a = (0.18 + uHi*0.55) + dash*(0.12+uHi*0.35) + head*0.6;
    gl_FragColor = vec4(uColor*(1.0+uHi*0.6), a);
  }`;
const beamFS = `
  uniform float uHi; uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
  void main(){
    float a = pow(1.0-vUv.y, 1.6)*(0.32+uHi*0.55);
    a *= 0.85 + 0.15*sin(vUv.y*40.0 - uTime*6.0);
    gl_FragColor = vec4(mix(uColor, vec3(1.0), uHi*0.5), a);
  }`;
const roadFS = `
  uniform float uTime; varying vec2 vUv;
  void main(){ float d = smoothstep(0.55,0.75,fract(vUv.x*40.0 - uTime*1.2)); gl_FragColor = vec4(vec3(1.0,0.93,0.78), 0.25 + d*0.65); }`;
const lakeFS = `
  uniform float uTime; varying vec2 vUv;
  void main(){
    vec2 p = vUv-0.5; float r = length(p*vec2(1.0,0.7));
    float rip = 0.5+0.5*sin(r*60.0 - uTime*2.0);
    vec3 col = mix(vec3(0.12,0.24,0.32), vec3(0.32,0.52,0.62), rip*0.35 + 0.25);
    float edge = smoothstep(0.5,0.42,r);
    gl_FragColor = vec4(col + vec3(0.9,0.8,0.55)*pow(rip,12.0)*0.25, 0.85*edge);
  }`;

function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,240,205,1)'); gr.addColorStop(0.25, 'rgba(226,200,143,.55)'); gr.addColorStop(1, 'rgba(226,200,143,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function mount(root) {
  const data = JSON.parse(root.querySelector('.a3d-data').textContent);
  const stage = root.querySelector('.a3d-stage');
  const canvas = stage.querySelector('canvas');
  const labelsEl = stage.querySelector('.a3d-labels');
  const card = stage.querySelector('.a3d-card');
  const compact = root.dataset.mode === 'compact';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
  catch { root.classList.add('a3d-nogl'); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b0a09', 150, 340);
  const camera = new THREE.PerspectiveCamera(36, 1, 0.5, 900);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.06; controls.enablePan = false; controls.enableZoom = false;
  controls.minPolarAngle = 0.45; controls.maxPolarAngle = 1.2; controls.rotateSpeed = 0.55;
  controls.autoRotate = !reduce; controls.autoRotateSpeed = 0.35;

  scene.add(new THREE.AmbientLight('#fff4dc', 0.6));
  const key = new THREE.DirectionalLight('#ffe7b0', 2.2); key.position.set(-40, 70, 30); scene.add(key);
  const rim = new THREE.PointLight('#c7a25a', 400, 120); rim.position.set(0, 25, 0); scene.add(rim);

  const towns = data.areas.filter((a) => a.x != null);
  const hq = towns.find((t) => t.hq);
  const H = makeHeight(towns, data.lake);

  /* terrain */
  const SIZE = 280, SEG = innerWidth < 700 ? 120 : compact ? 140 : 160;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG); geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setY(i, H(pos.getX(i), pos.getZ(i)));
  geo.computeVertexNormals();
  const tUni = { uTime: { value: 0 }, uHL: { value: new THREE.Vector3(999, 0, 999) }, uHLa: { value: 0 }, uReveal: { value: reduce ? 1 : 0 }, uGold: { value: GOLD.clone() } };
  const terrain = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms: tUni, vertexShader: terrainVS, fragmentShader: terrainFS, extensions: { derivatives: true } }));
  scene.add(terrain);

  /* Lake Tahoe */
  const lakeGeo = new THREE.CircleGeometry(1, 64); lakeGeo.rotateX(-Math.PI / 2);
  const lakeUni = { uTime: { value: 0 } };
  const lakeMesh = new THREE.Mesh(lakeGeo, new THREE.ShaderMaterial({ uniforms: lakeUni, vertexShader: flowVS, fragmentShader: lakeFS, transparent: true, depthWrite: false }));
  lakeMesh.scale.set(9.5, 1, 14); lakeMesh.position.set(data.lake.x, -0.9, data.lake.z); scene.add(lakeMesh);

  /* I-80 */
  const roadPts = data.road.map(([x, z]) => new THREE.Vector3(x, H(x, z) + 0.35, z));
  const roadCurve = new THREE.CatmullRomCurve3(roadPts);
  const roadUni = { uTime: { value: 0 } };
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(roadCurve, 260, 0.22, 6), new THREE.ShaderMaterial({ uniforms: roadUni, vertexShader: flowVS, fragmentShader: roadFS, transparent: true, depthWrite: false })));

  /* markers */
  const glowTex = glowTexture();
  const hitTargets = [];
  const markers = new Map();
  towns.forEach((t, i) => {
    const g = new THREE.Group();
    const base = H(t.x, t.z);
    g.position.set(t.x, base, t.z);
    const isHQ = !!t.hq, beamH = isHQ ? 26 : 14 + (i % 3) * 2;
    const beamUni = { uHi: { value: 0 }, uTime: tUni.uTime, uColor: { value: GOLD.clone() } };
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(isHQ ? 0.7 : 0.42, isHQ ? 0.7 : 0.42, beamH, 20, 1, true), new THREE.ShaderMaterial({ uniforms: beamUni, vertexShader: flowVS, fragmentShader: beamFS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    beam.position.y = beamH / 2; beam.scale.y = reduce ? 1 : 0.001; g.add(beam);
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(isHQ ? 2.6 : 1.6, 0), new THREE.MeshStandardMaterial({ color: GOLD_DEEP, emissive: '#7a5a1e', emissiveIntensity: 0.6, metalness: 0.85, roughness: 0.22, flatShading: true }));
    gem.scale.set(1, 1.45, 1); gem.position.y = beamH + (isHQ ? 3.4 : 2.4); gem.visible = reduce; g.add(gem);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: GOLD, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 }));
    halo.scale.setScalar(isHQ ? 14 : 8.5); halo.position.copy(gem.position); halo.visible = reduce; g.add(halo);
    const ringMat = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.95, 48), ringMat); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.25; g.add(ring);
    const ring2 = ring.clone(); ring2.material = ringMat.clone(); g.add(ring2);
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(isHQ ? 4 : 3.2, isHQ ? 4 : 3.2, beamH + 6, 8), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = (beamH + 6) / 2; hit.userData.id = t.id; g.add(hit); hitTargets.push(hit);
    scene.add(g);

    let arc = null;
    if (!isHQ) {
      const a = new THREE.Vector3(hq.x, H(hq.x, hq.z) + 1.2, hq.z), b = new THREE.Vector3(t.x, base + 0.6, t.z);
      const d = a.distanceTo(b);
      const mid = a.clone().lerp(b, 0.5); mid.y += 6 + d * 0.38;
      const uni = { uTime: tUni.uTime, uDraw: { value: reduce ? 1 : 0 }, uHi: { value: 0 }, uColor: { value: GOLD.clone() } };
      arc = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, mid, b), 80, 0.09, 6), new THREE.ShaderMaterial({ uniforms: uni, vertexShader: flowVS, fragmentShader: arcFS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      scene.add(arc);
    }
    const label = document.createElement('button');
    label.type = 'button'; label.className = 'a3d-label' + (isHQ ? ' hq' : ''); label.textContent = isHQ ? `${t.short} · HQ` : t.short; label.dataset.area = t.id;
    labelsEl.append(label);
    const dist = Math.hypot(t.x - hq.x, t.z - hq.z);
    markers.set(t.id, { t, g, beam, beamUni, gem, halo, ring, ring2, arc, label, beamH, delay: 0.9 + dist / 90, hi: 0 });
  });

  /* floating gold dust */
  const N = compact ? 260 : 420;
  const dust = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { dust[i * 3] = (Math.random() - 0.5) * 170; dust[i * 3 + 1] = 4 + Math.random() * 40; dust[i * 3 + 2] = (Math.random() - 0.5) * 170; }
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3));
  const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ map: glowTex, color: GOLD, size: 1.1, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(dustPts);

  /* camera choreography */
  const home = compact ? { pos: new THREE.Vector3(40, 92, 124), target: new THREE.Vector3(6, 0, 4) } : { pos: new THREE.Vector3(46, 104, 140), target: new THREE.Vector3(8, 0, 2) };
  camera.position.set(home.pos.x * 1.9, 150, home.pos.z * 2.1);
  controls.target.copy(home.target);
  const goal = { pos: home.pos.clone(), target: home.target.clone(), active: true };
  let selected = null, hovered = null, introT = reduce ? 99 : 0, introStart = performance.now(), idleTimer;

  function flyTo(id) {
    const m = id && markers.get(id);
    if (!m) { goal.pos.copy(home.pos); goal.target.copy(home.target); goal.active = true; return; }
    const tgt = new THREE.Vector3(m.t.x, H(m.t.x, m.t.z) + 4, m.t.z);
    const dir = camera.position.clone().sub(controls.target).setY(0).normalize();
    goal.target.copy(tgt);
    goal.pos.copy(tgt).add(dir.multiplyScalar(compact ? 58 : 64)).setY(tgt.y + (compact ? 42 : 46));
    goal.active = true;
  }

  /* UI wiring */
  const listItems = [...root.querySelectorAll('.a3d-item[data-area]')];
  const byId = Object.fromEntries(data.areas.map((a) => [a.id, a]));
  function showCard(id) {
    const a = byId[id] || byId[hq.id];
    card.querySelector('.a3d-card-county').textContent = a.county;
    card.querySelector('.a3d-card-name').textContent = a.name;
    card.querySelector('.a3d-card-info').textContent = a.info;
    const link = card.querySelector('.a3d-card-link'); link.href = a.url; link.querySelector('span').textContent = a.cta;
    card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
  }
  function select(id, { fly = true, keep = false } = {}) {
    selected = id;
    listItems.forEach((el) => el.classList.toggle('active', el.dataset.area === id));
    markers.forEach((m, k) => m.label.classList.toggle('active', k === id));
    if (id) { showCard(id); tUni.uHLa.value = 1; const m = markers.get(id); if (m) tUni.uHL.value.set(m.t.x, 0, m.t.z); else tUni.uHLa.value = 0; }
    else { tUni.uHLa.value = 0; showCard(hq.id); }
    controls.autoRotate = false;
    clearTimeout(idleTimer);
    if (!keep) idleTimer = setTimeout(() => { if (!hovered) { select(null, { fly: true, keep: true }); controls.autoRotate = !reduce; } }, 9000);
    if (fly) flyTo(id && markers.has(id) ? id : null);
  }
  listItems.forEach((el) => {
    el.addEventListener('mouseenter', () => select(el.dataset.area));
    el.addEventListener('focus', () => select(el.dataset.area));
  });
  labelsEl.addEventListener('click', (e) => { const b = e.target.closest('.a3d-label'); if (b) select(b.dataset.area); });
  labelsEl.addEventListener('mouseover', (e) => { const b = e.target.closest('.a3d-label'); hovered = b ? b.dataset.area : null; });
  labelsEl.addEventListener('mouseout', () => { hovered = null; });

  const ctl = (sel, fn) => { const b = stage.querySelector(sel); if (b) b.addEventListener('click', fn); };
  const zoom = (f) => { const d = camera.position.clone().sub(controls.target).multiplyScalar(f); const len = d.length(); if (len < 40 || len > 260) return; goal.pos.copy(controls.target).add(d); goal.target.copy(controls.target); goal.active = true; };
  ctl('[data-a3d="in"]', () => zoom(0.8));
  ctl('[data-a3d="out"]', () => zoom(1.25));
  ctl('[data-a3d="reset"]', () => { select(null, { keep: true }); controls.autoRotate = !reduce; });
  ctl('[data-a3d="spin"]', (e) => { controls.autoRotate = !controls.autoRotate; e.currentTarget.classList.toggle('off', !controls.autoRotate); });

  // search filter (full mode)
  const search = root.querySelector('.a3d-search input');
  search?.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    listItems.forEach((el) => { el.hidden = q && !el.textContent.toLowerCase().includes(q); });
    root.querySelectorAll('.a3d-group').forEach((g) => { g.hidden = ![...g.querySelectorAll('.a3d-item')].some((x) => !x.hidden); });
    const first = listItems.find((el) => !el.hidden); if (q && first) select(first.dataset.area);
  });

  /* pointer picking */
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let downAt = null;
  const pick = (e) => {
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(hitTargets, false)[0];
    return hit ? hit.object.userData.id : null;
  };
  canvas.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const id = pick(e); hovered = id; canvas.style.cursor = id ? 'pointer' : 'grab'; });
  canvas.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; goal.active = false; controls.autoRotate = false; root.classList.add('a3d-touched'); });
  canvas.addEventListener('pointerup', (e) => {
    if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
    const id = pick(e);
    if (id) { if (selected === id && e.pointerType === 'mouse') location.href = byId[id].url; else select(id); }
  });

  /* sizing + visibility */
  const resize = () => { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < 600 ? 46 : 36; camera.updateProjectionMatrix(); };
  new ResizeObserver(resize).observe(stage); resize();
  // Pause only when the stage is clearly scrolled far away (some embedded browsers misreport visibility)
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { rootMargin: '200px 0px' }).observe(stage);

  /* initial state */
  if (data.hl && markers.has(data.hl)) setTimeout(() => select(data.hl, { keep: true }), reduce ? 0 : 2600);
  else showCard(hq.id);
  root._a3d = { renderer, get introT() { return introT; }, get visible() { return visible; }, get frames() { return frames; } };
  root.classList.add('a3d-ready');
  setTimeout(() => root.classList.add('a3d-touched'), 7000);

  /* render loop */
  const clock = new THREE.Clock();
  const v = new THREE.Vector3();
  let frames = 0;
  let lastFrame = 0, rafId = 0;
  const loop = () => { rafId = requestAnimationFrame(loop); if (visible) frame(); };
  // if the browser stops giving us animation frames, draw on interaction instead
  const kick = () => { if (performance.now() - lastFrame > 400) frame(); };
  ['pointermove', 'pointerdown', 'scroll', 'wheel', 'touchmove', 'keydown'].forEach((ev) => addEventListener(ev, kick, { passive: true }));
  // safety net: if no frames arrive at all, jump straight to the finished scene
  setTimeout(() => { if (frames < 20) { introStart = performance.now() - 10000; goal.active = false; camera.position.copy(home.pos); controls.target.copy(home.target); frame(); } }, 3500);
  const frame = () => {
    frames++; lastFrame = performance.now();
    const raw = Math.min(clock.getDelta(), 1), dt = Math.min(raw, 0.05);
    const time = clock.elapsedTime;
    tUni.uTime.value = time; lakeUni.uTime.value = time; roadUni.uTime.value = time;
    if (!reduce) { introT = (performance.now() - introStart) / 1000; tUni.uReveal.value = Math.min(1, introT / 2.2); }

    if (goal.active) {
      const kp = 1 - Math.pow(1 - 0.045, raw * 60), kt = 1 - Math.pow(1 - 0.06, raw * 60);
      camera.position.lerp(goal.pos, kp); controls.target.lerp(goal.target, kt);
      if (camera.position.distanceTo(goal.pos) < 0.3) goal.active = false;
    }
    controls.update();

    const focus = hovered || selected;
    markers.forEach((m, id) => {
      const k = Math.max(0, Math.min(1, (introT - m.delay) / 1.1));
      const e = 1 - Math.pow(1 - k, 3);
      m.beam.scale.y = Math.max(0.001, e);
      m.gem.visible = m.halo.visible = k > 0.6;
      const target = id === focus ? 1 : 0;
      m.hi += (target - m.hi) * (1 - Math.pow(0.88, raw * 60));
      m.beamUni.uHi.value = m.hi;
      const dim = focus && id !== focus ? 0.45 : 1;
      m.gem.rotation.y += dt * (0.8 + m.hi * 2.5);
      m.gem.position.y = m.beamH + (m.t.hq ? 3.4 : 2.4) + Math.sin(time * 1.6 + m.delay * 3) * 0.35 + m.hi * 1.2;
      m.gem.scale.set(1 + m.hi * 0.35, (1 + m.hi * 0.35) * 1.45, 1 + m.hi * 0.35);
      m.gem.material.emissiveIntensity = (0.5 + m.hi * 1.6) * dim;
      m.halo.position.y = m.gem.position.y; m.halo.material.opacity = (0.55 + m.hi * 0.45) * dim;
      const p1 = (time * 0.55 + m.delay) % 1, p2 = (time * 0.55 + m.delay + 0.5) % 1;
      m.ring.scale.setScalar(1 + p1 * (2.6 + m.hi * 2)); m.ring.material.opacity = (1 - p1) * 0.55 * k * dim;
      m.ring2.scale.setScalar(1 + p2 * (2.6 + m.hi * 2)); m.ring2.material.opacity = (1 - p2) * 0.55 * k * dim;
      if (m.arc) {
        const ak = Math.max(0, Math.min(1, (introT - m.delay + 0.4) / 1.2));
        m.arc.material.uniforms.uDraw.value = 1 - Math.pow(1 - ak, 3);
        m.arc.material.uniforms.uHi.value = m.hi;
        m.arc.material.opacity = 1;
        m.arc.visible = !(focus && id !== focus && focus !== hq.id) || true;
        m.arc.material.uniforms.uColor.value.copy(GOLD).multiplyScalar(focus && id !== focus ? 0.35 : 1);
      }
      // project label (placed after the loop, with collision avoidance)
      v.set(m.t.x, m.gem.position.y + (m.t.hq ? 4.4 : 3.2), m.t.z).project(camera);
      m.sx = ((v.x + 1) / 2) * stage.clientWidth; m.sy = ((1 - v.y) / 2) * stage.clientHeight;
      m.onScreen = v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1 && k > 0.7;
      m.depth = v.z;
      m.label.classList.toggle('hover', id === hovered);
    });
    // labels: focused + HQ first, then nearest to camera; hide any that would overlap one already shown
    const placed = [];
    [...markers.values()].sort((a, b) => ((b.t.id === focus) - (a.t.id === focus)) || ((!!b.t.hq) - (!!a.t.hq)) || (a.depth - b.depth)).forEach((m) => {
      const w = m.label.offsetWidth || 80, h = 26;
      const box = { x: m.sx - w / 2, y: m.sy - h, w, h };
      const clash = placed.some((p) => box.x < p.x + p.w + 4 && box.x + box.w + 4 > p.x && box.y < p.y + p.h + 2 && box.y + box.h + 2 > p.y);
      const show = m.onScreen && !clash;
      if (show) placed.push(box);
      m.label.style.transform = `translate3d(${m.sx.toFixed(1)}px, ${m.sy.toFixed(1)}px, 0) translate(-50%, -100%)`;
      m.label.style.opacity = show ? String(focus && m.t.id !== focus ? 0.55 : 1) : '0';
      m.label.style.pointerEvents = show ? 'auto' : 'none';
    });
    const dp = dustGeo.attributes.position;
    for (let i = 0; i < N; i++) { let y = dp.getY(i) + dt * (0.6 + (i % 5) * 0.12); if (y > 46) y = 4; dp.setY(i, y); }
    dp.needsUpdate = true;
    rim.intensity = 300 + Math.sin(time * 1.3) * 80;
    renderer.render(scene, camera);
  };
  loop();
}
