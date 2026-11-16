# CLAUDE.md — Site Super Thé

> Lu automatiquement par Claude Code au début de chaque session.

## Le projet en une phrase
Site vitrine d'un client (bar à bubble tea, thés glacés, smoothies, fast-food) avec catalogue, panier et envoi de la commande par WhatsApp.

## Stack
100 % statique : `index.html` (page unique), `css/style.css`, `js/app.js` (catalogue + panier). Aucune dépendance, aucun build.

## Lancer
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1     # http://localhost:8080
powershell -ExecutionPolicy Bypass -File .\tunnel.ps1    # URL publique temporaire (cloudflared) pour une démo client
```

## Règles
- Pas de framework ni d'outil de build : rester en HTML/CSS/JS simple.
- `sources/` contient les photos et maquettes d'origine : jamais servies par le site, ne pas les référencer.
- Typographie : Plus Jakarta Sans. Photos produits dans `img/p/`.
- Messages de commit en français, à l'impératif (« Ajoute… », « Remplace… »).

## À faire
- `img/hero-1.jpg` et `img/hero-2.jpg` sont des doublures : les vraies images sont à exporter à la main depuis le projet Claude Design (voir README).
- Hébergement : la publication GitHub Pages a été retirée (commit f67aea1).
