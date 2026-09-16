<#
.SYNOPSIS
  Lance le site en local et l'expose via un tunnel Cloudflare temporaire.
.DESCRIPTION
  Demarre serve.ps1 puis un quick tunnel cloudflared (aucun compte requis).
  Affiche l'URL publique a partager. Ctrl+C arrete le tunnel et le serveur.
  L'URL est jetable : elle change a chaque lancement et meurt a l'arret.
.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\tunnel.ps1
  powershell -ExecutionPolicy Bypass -File .\tunnel.ps1 -Port 3000
#>
param(
    [int]$Port = 8080
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

# Localise cloudflared.
$cf = 'C:\Program Files (x86)\cloudflared\cloudflared.exe'
if (-not (Test-Path -LiteralPath $cf)) {
    $cmd = Get-Command cloudflared -ErrorAction SilentlyContinue
    if ($cmd) {
        $cf = $cmd.Source
    } else {
        Write-Host "cloudflared introuvable. Installez-le : winget install Cloudflare.cloudflared" -ForegroundColor Red
        exit 1
    }
}

$log = Join-Path $env:TEMP "superthe-tunnel.log"
if (Test-Path -LiteralPath $log) { Remove-Item -LiteralPath $log -Force }

$serve = $null
$tunnel = $null
try {
    # 1. Serveur statique local.
    $serve = Start-Process powershell `
        -ArgumentList '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $root 'serve.ps1'), '-Port', $Port `
        -WindowStyle Minimized -PassThru
    Start-Sleep -Seconds 2

    # 2. Tunnel Cloudflare.
    #    --http-host-header : serve.ps1 ecoute sur localhost et rejette
    #    tout autre en-tete Host (sinon 400 Bad Request).
    $tunnel = Start-Process $cf `
        -ArgumentList 'tunnel', '--url', "http://localhost:$Port", '--http-host-header', "localhost:$Port" `
        -WindowStyle Hidden -PassThru -RedirectStandardOutput $log -RedirectStandardError "$log.err"

    # 3. Recupere l'URL publique dans les logs.
    $url = $null
    foreach ($i in 1..60) {
        Start-Sleep -Milliseconds 500
        foreach ($f in @($log, "$log.err")) {
            if (Test-Path -LiteralPath $f) {
                $m = Select-String -LiteralPath $f -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' -AllMatches |
                     Select-Object -First 1
                if ($m) { $url = $m.Matches[0].Value; break }
            }
        }
        if ($url) { break }
    }

    if (-not $url) {
        Write-Host "Le tunnel n'a pas renvoye d'URL. Voir $log" -ForegroundColor Red
        exit 1
    }

    Write-Host ""
    Write-Host "  Super The - demo en ligne" -ForegroundColor Green
    Write-Host "  Local  : http://localhost:$Port"
    Write-Host "  Public : $url" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  URL temporaire : elle change a chaque lancement." -ForegroundColor DarkGray
    Write-Host "  Ctrl+C pour tout arreter." -ForegroundColor DarkGray
    Write-Host ""

    Wait-Process -Id $tunnel.Id
} finally {
    foreach ($p in @($tunnel, $serve)) {
        if ($p -and -not $p.HasExited) {
            try { Stop-Process -Id $p.Id -Force -ErrorAction Stop } catch { }
        }
    }
    Write-Host "Tunnel et serveur arretes." -ForegroundColor Yellow
}
