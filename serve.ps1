<#
.SYNOPSIS
  Petit serveur HTTP statique pour previsualiser le site en local.
.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\serve.ps1
  powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 3000
#>
param(
    [int]$Port = 8080,
    [string]$Root = $PSScriptRoot
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path $Root).Path

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.htm'  = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.png'  = 'image/png'
    '.gif'  = 'image/gif'
    '.webp' = 'image/webp'
    '.ico'  = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
    '.ttf'  = 'font/ttf'
    '.pdf'  = 'application/pdf'
    '.mp4'  = 'video/mp4'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try {
    $listener.Start()
} catch {
    Write-Host "Impossible d'ecouter sur le port $Port : $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Essayez un autre port : .\serve.ps1 -Port 3000" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "  Super The - serveur local" -ForegroundColor Green
Write-Host "  Racine : $Root"
Write-Host "  URL    : http://localhost:$Port" -ForegroundColor Cyan
Write-Host "  Ctrl+C pour arreter."
Write-Host ""

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response

        try {

        $logPath = $req.Url.AbsolutePath
        $rel = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($rel)) { $rel = 'index.html' }
        $rel = $rel -replace '/', '\'

        $path = [System.IO.Path]::GetFullPath((Join-Path $Root $rel))

        # Empeche de sortir de la racine du site.
        if (-not $path.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
            $res.StatusCode = 403
            $res.Close()
            continue
        }

        if (Test-Path -LiteralPath $path -PathType Container) {
            $path = Join-Path $path 'index.html'
        }

        if (Test-Path -LiteralPath $path -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($path)
            $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
            $type = $mime[$ext]
            if (-not $type) { $type = 'application/octet-stream' }
            $res.ContentType = $type
            $res.Headers.Add('Cache-Control', 'no-cache')
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host ("  200  " + $logPath)
        } else {
            $body = [System.Text.Encoding]::UTF8.GetBytes('<h1>404</h1><p>Fichier introuvable.</p>')
            $res.StatusCode = 404
            $res.ContentType = 'text/html; charset=utf-8'
            $res.ContentLength64 = $body.Length
            $res.OutputStream.Write($body, 0, $body.Length)
            Write-Host ("  404  " + $logPath) -ForegroundColor DarkYellow
        }
        $res.Close()
        } catch {
            # Un client qui se deconnecte ne doit pas arreter le serveur.
            Write-Host ("  ERR  " + $logPath + " : " + $_.Exception.Message) -ForegroundColor DarkYellow
            try { $res.Close() } catch { }
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "Serveur arrete."
}
