# Super Thé — site vitrine

Site statique (HTML / CSS / JS, sans dépendance ni build) pour Super Thé :
bubble tea, thés glacés, smoothies et fast-food, avec panier de commande
et envoi de la commande par WhatsApp.

## Structure

```
index.html        page unique (hero, menu, livraison, histoire, galerie, boutiques, contact)
css/style.css     styles
js/app.js         catalogue produits + panier
img/              photos, logo, visuels produits (img/p/)
serve.ps1         petit serveur local pour la prévisualisation
sources/          photos, captures et maquette d'origine (non servies par le site)
```

## Lancer en local

Le site est 100 % statique : un double-clic sur `index.html` suffit.

Pour le servir en HTTP (recommandé, comportement identique à la prod) :

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Puis ouvrir http://localhost:8080 . `Ctrl+C` pour arrêter.
Port personnalisable : `.\serve.ps1 -Port 3000`

## Mise en ligne

Aucun build : il suffit de déposer le contenu du dossier sur n'importe quel
hébergeur statique (GitHub Pages, Netlify, Vercel, ou un simple FTP).
