# DreamHost Deployment Guide for masumimuseum.com

## ✅ PACKAGE READY
**File**: `masumimuseum-dreamhost.tar.gz` (23MB)
**Contents**: Complete CI3 site, no database required

## Deployment Steps

### 1. DreamHost Account Setup
1. Log into DreamHost panel
2. Add new user: `masumimuseum`
3. Add domain: `masumimuseum.com`
4. Point domain to new user's directory

### 2. File Upload
```bash
# Upload via SFTP/FTP to:
/home/masumimuseum/masumimuseum.com/

# Extract the package:
tar -xzf masumimuseum-dreamhost.tar.gz
```

### 3. Required File Additions
Create `index.php` in root directory:
```php
<?php
/**
 * CodeIgniter Bootstrap for DreamHost
 */
define('ENVIRONMENT', 'production');

if (defined('ENVIRONMENT')) {
    switch (ENVIRONMENT) {
        case 'development':
            error_reporting(E_ALL);
            break;
        case 'production':
            error_reporting(0);
            break;
    }
}

$system_path = 'system';
$application_folder = 'application';

define('BASEPATH', str_replace("\\", "/", realpath(dirname(__FILE__))).'/');

if (realpath($system_path) !== FALSE) {
    $system_path = realpath($system_path).'/';
}

$system_path = rtrim($system_path, '/').'/';

if (!is_dir($system_path)) {
    exit("Your system folder path does not appear to be set correctly.");
}

define('SYSDIR', trim(strrchr(trim($system_path, '/'), '/'), '/'));
define('FCPATH', str_replace(SYSDIR.'/', '', $system_path));
define('APPPATH', $application_folder.'/');

require_once BASEPATH.'system/core/CodeIgniter.php';
?>
```

### 4. Root .htaccess
Create `.htaccess` in domain root:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 5. Configuration Updates
Update `application/config/config.php`:
```php
// Line 18-23, replace with:
$config['base_url'] = 'https://masumimuseum.com/';

// Ensure this line exists:
$config['permitted_uri_chars'] = 'a-z 0-9~%.:_\\-/';
```

## Testing Checklist
- [ ] https://masumimuseum.com loads
- [ ] Navigation menu works
- [ ] Image galleries display
- [ ] PHP includes function
- [ ] Links to masumihayashi.com work
- [ ] HTTPS redirect works

## Key Benefits
✅ **No Database Setup Required** - Site is static + CI3 routing only
✅ **Native PHP Environment** - DreamHost handles CI3 perfectly
✅ **Clean Installation** - No conflicts with other sites
✅ **Quick Rollback** - Can revert via DNS if issues

## Emergency Fallback
If issues occur:
1. Use emergency redirect: Point DNS to emergency-redirect.html
2. Fix issues on subdomain first
3. masumihayashi.com redirects can handle traffic temporarily

**Next**: Upload package to DreamHost and follow deployment steps!