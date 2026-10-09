<?php
/**
 * Feel Good Insurance — contact & quote form handler.
 * Receives JSON from the website forms, filters spam and emails the lead to the agency.
 * Works on standard PHP hosting (e.g. Hostinger). Configure the constants below.
 */

const TO_EMAIL   = 'cvega@fgirenonv.com';           // where leads are delivered
const FROM_EMAIL = 'no-reply@fgirenonv.com';        // must be a mailbox/domain hosted on this server
const SITE_NAME  = 'Feel Good Insurance Website';
const MIN_SECONDS_ON_PAGE = 3;                      // bots submit instantly
const MAX_PER_HOUR_PER_IP = 8;
const SAVE_COPY = true;                             // also keep a CSV backup in api/leads/

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function out($ok, $error = null, $code = 200) {
  http_response_code($code);
  echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(false, 'method', 405);

// Same-origin check (forms are only posted from this website)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin && parse_url($origin, PHP_URL_HOST) !== $host) out(false, 'origin', 403);

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) $data = $_POST;
if (!$data) out(false, 'empty', 400);

// Honeypot + timing
if (!empty($data['company_website'])) out(true); // silently accept bots
$ts = isset($data['ts']) ? (int) $data['ts'] : 0;
if ($ts && (round(microtime(true) * 1000) - $ts) < MIN_SECONDS_ON_PAGE * 1000) out(true);

// Simple per-IP rate limit
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/fgi_rl_' . md5($ip);
$hits = array_filter(explode(',', @file_get_contents($rlFile) ?: ''), fn($t) => $t && $t > time() - 3600);
if (count($hits) >= MAX_PER_HOUR_PER_IP) out(false, 'rate', 429);
$hits[] = time();
@file_put_contents($rlFile, implode(',', $hits));

// Clean + validate
$clean = function ($v) { return trim(preg_replace('/[\r\n]+/', ' ', strip_tags((string) $v))); };
$first = $clean($data['first_name'] ?? '');
$last  = $clean($data['last_name'] ?? '');
$phone = $clean($data['phone'] ?? '');
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
if (!$first || !$last || strlen(preg_replace('/\D/', '', $phone)) < 10 || !$email) out(false, 'validation', 422);

$labels = [
  'form' => 'Form', 'lang' => 'Site language', 'language' => 'Preferred language', 'contact_method' => 'Contact by',
  'first_name' => 'First name', 'last_name' => 'Last name', 'phone' => 'Phone', 'email' => 'Email',
  'interest' => 'Interested in', 'coverage[]' => 'Coverage requested', 'zip' => 'ZIP', 'timeline' => 'Timeline',
  'vehicles' => 'Vehicles', 'drivers' => 'Drivers', 'sr22' => 'Needs SR-22', 'current_insurer' => 'Current insurer',
  'property_type' => 'Property type', 'year_built' => 'Year built', 'age_range' => 'Age', 'life_amount' => 'Life coverage amount',
  'business_type' => 'Business type', 'employees' => 'Employees', 'destination' => 'Destination', 'travel_dates' => 'Travel dates',
  'doc_need' => 'DMV / notary need', 'message' => 'Message', 'sms_consent' => 'SMS consent', 'email_consent' => 'Email/phone consent', 'page' => 'Submitted from',
];

$isQuote = ($data['form'] ?? '') === 'quote';
$subject = ($isQuote ? 'New quote request' : 'New website message') . " — $first $last";
$rows = '';
$csv = [date('c'), $ip];
foreach ($labels as $key => $label) {
  $val = $key === 'message' || $key === 'doc_need' ? trim(strip_tags((string) ($data[$key] ?? ''))) : $clean($data[$key] ?? '');
  if ($key === 'form') $val = $isQuote ? 'Quote wizard' : 'Contact form';
  $csv[] = $val;
  if ($val === '') continue;
  $rows .= '<tr><th align="left" style="padding:8px 12px;background:#f7f3ec;border-bottom:1px solid #eee;font:600 13px Arial;color:#555;white-space:nowrap">' . htmlspecialchars($label) . '</th><td style="padding:8px 12px;border-bottom:1px solid #eee;font:14px Arial;color:#222">' . nl2br(htmlspecialchars($val)) . '</td></tr>';
}

$html = '<div style="max-width:640px;margin:auto;font-family:Arial,sans-serif">'
  . '<div style="background:#0e0e0c;color:#e2c88f;padding:18px 22px;border-radius:10px 10px 0 0;font:700 16px Arial">' . htmlspecialchars($subject) . '</div>'
  . '<table cellspacing="0" cellpadding="0" style="width:100%;border:1px solid #eee;border-top:0">' . $rows . '</table>'
  . '<p style="font:12px Arial;color:#888">Reply directly to this email to respond to the client.</p></div>';

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/html; charset=UTF-8',
  'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>',
  'Reply-To: ' . "$first $last <$email>",
  'X-Mailer: PHP/' . phpversion(),
];
$sent = @mail(TO_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $html, implode("\r\n", $headers), '-f' . FROM_EMAIL);

if (SAVE_COPY) {
  $dir = __DIR__ . '/leads';
  if (!is_dir($dir)) { @mkdir($dir, 0750); @file_put_contents("$dir/.htaccess", "Require all denied\nDeny from all\n"); }
  $fh = @fopen("$dir/leads-" . date('Y-m') . '.csv', 'a');
  if ($fh) { $saved = fputcsv($fh, $csv) !== false; fclose($fh); }
}

// Only report success when the lead was actually emailed or stored
if (!$sent && empty($saved)) out(false, 'mail', 500);
out(true);
