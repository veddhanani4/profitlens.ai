# 🔧 Quick Fix Script - Add CSS to All Pages

## Run this PowerShell script to add CSS links to all HTML pages

```powershell
# Navigate to project directory
cd C:\Users\A\Downloads\antigravity

# List of HTML files to update
$files = @(
    'auth.html',
    'profit-analyzer.html',
    'electricity-analyzer.html',
    'billing.html',
    'contact.html',
    'feedback.html',
    'privacy-policy.html',
    'terms-of-service.html'
)

# CSS links to add
$cssLinks = @"
  <link rel="stylesheet" href="navigation.css">
  <link rel="stylesheet" href="footer.css">
  <link rel="stylesheet" href="hover-effects.css">
"@

# Update each file
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Check if already updated
        if ($content -notmatch 'navigation.css') {
            # Find responsive.css and add after it
            $content = $content -replace '(<link rel="stylesheet" href="responsive.css">)', "`$1`r`n$cssLinks"
            
            # Save file
            Set-Content $file -Value $content -NoNewline
            Write-Host "✅ Updated: $file" -ForegroundColor Green
        } else {
            Write-Host "⏭️  Already updated: $file" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ Not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Done! All files updated." -ForegroundColor Cyan
```

## Or manually add these 3 lines to each HTML file:

Add after `<link rel="stylesheet" href="responsive.css">`:

```html
<link rel="stylesheet" href="navigation.css">
<link rel="stylesheet" href="footer.css">
<link rel="stylesheet" href="hover-effects.css">
```

## Files to update:
- [ ] auth.html
- [ ] profit-analyzer.html
- [ ] electricity-analyzer.html
- [ ] billing.html
- [ ] contact.html
- [ ] feedback.html
- [ ] privacy-policy.html
- [ ] terms-of-service.html
