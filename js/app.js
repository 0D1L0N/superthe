(function () {
  "use strict";

  function F(n) {
    return n.toLocaleString("fr-FR").replace(/[  ]/g, " ") + " FCFA";
  }

  /* Les quatre ajouts du tableau de la boutique. Tous au même prix. */
  var EXTRA_PRICE = 200;

  var EXTRAS = [
    { name: "Perles", price: EXTRA_PRICE, note: "tapioca cuit sur place" },
    { name: "Flan mangue", price: EXTRA_PRICE, note: "préparé le matin" },
    { name: "Jelly", price: EXTRA_PRICE, note: "gelée fruitée, ferme" },
    { name: "Jelly noir", price: EXTRA_PRICE, note: "cubes de gelée noire" }
  ];

  /* Les salons. Un champ laisse vide n'est tout simplement pas affiche :
     remplir la valeur ici suffit a le faire apparaitre sur le site. */
  var SHOPS = [
    {
      ville: "Vodjè",
      adresse: "",              // ex. "Carrefour Vodjè, en face de la pharmacie"
      ouverture: "",            // ex. "9 h"
      fermeture: "",            // ex. "22 h"
      jours: "",                // ex. "Lundi au samedi"
      tel: "+2290155995757",
      maps: "",                 // lien Google Maps du salon
      statut: "ouvert"
    },
    {
      ville: "Calavi",
      adresse: "",
      ouverture: "",
      fermeture: "",
      jours: "",
      tel: "+2290192119292",
      maps: "",
      statut: "ouvert"
    },
    {
      ville: "Akpakpa",
      adresse: "",
      ouverture: "",
      fermeture: "",
      jours: "",
      tel: "",
      maps: "",
      statut: "ouvert"
    },
    {
      ville: "Porto-Novo",
      adresse: "",
      ouverture: "",
      fermeture: "",
      jours: "",
      tel: "",
      maps: "",
      statut: "bientot"
    }
  ];

  var CATS = [
    {
      key: "Thé au lait",
      note: "Thé noir infusé le matin, lait entier, sucre à votre main. 500 ml ou 700 ml, chaud ou glacé, ou en glace pilée servie en grand format.",
      items: [
        { name: "Glace pilée simple", m: 2000, badge: "Nouveau", photo: "img/p/glace-simple.jpg", desc: "Le thé au lait en version glace pilée, nappé de caramel, avec des éclats de biscuit dans toute la hauteur du gobelet." },
        { name: "Glace pilée à la menthe", m: 2200, badge: "Nouveau", photo: "img/p/glace-menthe.jpg", desc: "La même glace pilée, à la menthe, avec des éclats de biscuit noir. La plus fraîche des trois." },
        { name: "Glace pilée au chocolat", m: 2500, badge: "Nouveau", photo: "img/p/glace-chocolat.jpg", desc: "Un nappage chocolat qui coule le long du gobelet, des éclats de biscuit dedans. La plus gourmande." },
        { name: "Super Thé aux perles", m: 1200, l: 1400, badge: "Le signature", photo: "img/p/lait-perles.jpg", desc: "Celui par lequel tout a commencé. Thé noir infusé, lait entier, et des perles encore tièdes au fond du gobelet." },
        { name: "Thé au lait classique", m: 1200, l: 1400, badge: "Classique", photo: "img/p/lait-classique.jpg", desc: "Rien dedans, tout dans le thé. La base sur laquelle repose le reste de la carte." },
        { name: "Thé au lait au jelly", m: 1200, l: 1400, badge: "Texture", photo: "img/p/lait-jelly.jpg", desc: "Des cubes de gelée fruitée à la place des perles : plus fermes sous la dent, plus frais en bouche." },
        { name: "Thé au lait au flan de mangue", m: 1200, l: 1400, badge: "Gourmand", photo: "img/p/lait-flan-mangue.jpg", desc: "Le flan est fait le matin. Il fond doucement dans le thé et le rend presque crémeux." },
        { name: "Thé au lait aux mélanges", m: 1200, l: 1400, badge: "Tout dedans", photo: "img/p/lait-melanges.jpg", desc: "Perles, jelly et flan dans le même gobelet. Pour ceux qui refusent de choisir." },
        { name: "Thé vert au lait à la menthe", m: 1200, l: 1400, badge: "Très frais", photo: "img/p/lait-menthe.jpg", desc: "De la menthe fraîche pilée dans le thé vert au lait. Plus végétal, finale glaciale." }
      ]
    },
    {
      key: "Thé vert aux fruits",
      note: "Thé vert au jasmin et fruits coupés devant vous. Sans lait, peu sucré. 500 ml ou 700 ml.",
      items: [
        { name: "Thé vert à la mangue", m: 1300, l: 1500, badge: "Best-seller", photo: "img/p/vert-mangue.jpg", desc: "De la mangue mûre mixée dans le thé glacé. La boisson la plus solaire de la carte." },
        { name: "Thé vert à l'ananas", m: 1300, l: 1500, badge: "Acidulé", photo: "img/p/the-fruits.jpg", desc: "Ananas frais coupé au comptoir, morceaux compris. Acidité franche, très peu de sucre." },
        { name: "Thé vert passion-ananas", m: 1300, l: 1500, badge: "Duo tropical", photo: "img/p/vert-cocktail-3.jpg", desc: "La passion apporte l'acidité, l'ananas le sucre. Les grains restent dans le verre, c'est voulu." },
        { name: "Thé vert au citron", m: 1200, l: 1400, badge: "Désaltérant", photo: "img/p/vert-citron.jpg", desc: "Citron pressé à la minute. Le plus léger et le moins cher des thés aux fruits." },
        { name: "Thé vert citron et sel de mer", m: 1300, l: 1500, badge: "Sucré-salé", photo: "img/p/vert-citron-sel.jpg", desc: "Une pointe de sel de mer sur le citron pressé. Surprenant au premier verre, addictif au deuxième." },
        { name: "Cocktail thé vert aux fruits", m: 1300, l: 1500, badge: "Cocktail", photo: "img/p/vert-cocktail.jpg", desc: "Mangue, ananas et passion réunis dans le même gobelet. Sans alcool, sans compromis." }
      ]
    },
    {
      key: "Smoothies",
      note: "Fruits entiers mixés à la commande avec du lait glacé. Aucune poudre, aucun sirop.",
      items: [
        { name: "Smoothie à la mangue", m: 1400, l: 1500, badge: "Épais", photo: "img/p/smoothie-mangue.jpg", desc: "Mixé serré : la paille tient debout toute seule. À boire ou à manger à la cuillère." },
        { name: "Smoothie à l'ananas", m: 1400, l: 1500, badge: "Vif", photo: "img/p/smoothies.jpg", desc: "Ananas frais mixé avec du lait glacé. Mousse légère et acidité qui réveille." },
        { name: "Smoothie à la banane", m: 1400, l: 1500, badge: "Rassasiant", photo: "img/p/smoothie-banane.jpg", desc: "Banane bien mûre, lait glacé. Le plus nourrissant du lot, un vrai petit-déjeuner." }
      ]
    },
    {
      key: "Café",
      note: "Préparé à la machine, chaud ou glacé, sur place ou à emporter.",
      items: [
        { name: "Americano", m: 1500, badge: "Long", photo: "img/p/cafe-americano.jpg", desc: "Un expresso allongé à l'eau chaude. Long, corsé, sans lait." },
        { name: "Expresso", m: 2000, badge: "Serré", photo: "img/p/cafe-expresso.jpg", desc: "Servi court, double dose de café. Pour ceux qui savent pourquoi ils sont là." },
        { name: "Latte", m: 2000, badge: "Doux", photo: "img/p/cafe-latte.jpg", desc: "Expresso noyé de lait chaud, mousse fine sur le dessus." },
        { name: "Latte noisette, vanille ou menthe", m: 2000, badge: "3 parfums", photo: "img/p/cafe-latte-parfume.jpg", desc: "Le latte avec le sirop de votre choix. Précisez-le à la commande." }
      ]
    },
    {
      key: "Pâtisseries",
      note: "Cuites au moment, à prendre avec la boisson.",
      items: [
        { name: "Gaufre simple", m: 1200, badge: "Chaud", photo: "img/p/gaufre.jpg", desc: "Croustillante dehors, moelleuse dedans. Elle sort du gaufrier quand vous commandez." }
      ]
    },
    {
      key: "Fast-food",
      note: "Le salé du midi et du soir, monté à la commande.",
      items: [
        { name: "Chawarma viande", m: 2000, badge: "Sauce maison", photo: "img/p/fastfood.jpg", desc: "Viande grillée roulée serré dans le pain, avec la sauce spéciale de la maison." },
        { name: "Super chawarma", m: 2500, badge: "Généreux", photo: "img/p/super-chawarma.jpg", desc: "Le chawarma en version double : plus de viande, des œufs, la même sauce." },
        { name: "Hamburger royal", m: 2000, badge: "Complet", photo: "img/p/hamburger-royal.jpg", desc: "Viande, frites, tomate et oignon dans un pain brioché." },
        { name: "Super hamburger", m: 3500, badge: "Le plus grand", photo: "img/p/frites-portion.jpg", desc: "Viande, œufs et une portion de frites comprise. Pour les vraies faims." }
      ]
    }
  ];

  var state = {
    cat: CATS[0].key,
    cart: [],
    mode: "pickup",
    detail: null,
    detailCat: "",
    size: "m",
    extras: []
  };

  function el(id) { return document.getElementById(id); }

  var ui = {};
  [
    "cart-count", "categories", "cat-note", "menu-grid",
    "detail-overlay", "detail-backdrop", "detail-photo", "detail-badge",
    "detail-price-from", "detail-cat", "detail-name", "detail-close",
    "detail-desc", "detail-sizes", "detail-add", "detail-total",
    "extras-open", "extras-close", "extras-done", "extras-popover",
    "extras-list", "extras-summary",
    "cart-overlay", "cart-backdrop", "cart-close", "mode-pickup",
    "mode-delivery", "cart-lines", "delivery-fields", "cart-subtotal",
    "fee-label", "fee-value", "cart-total", "mode-note", "cart-checkout",
    "btn-open-cart", "btn-delivery-cta", "btn-pickup-cta", "btn-hero-delivery",
    "contact-form", "contact-submit", "site-header", "d-address", "d-whatsapp",
    "shops-grid", "nav-toggle", "main-nav"
  ].forEach(function (id) {
    ui[id] = el(id);
  });

  function escapeHtml(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function activeCategory() {
    for (var i = 0; i < CATS.length; i++) {
      if (CATS[i].key === state.cat) return CATS[i];
    }
    return CATS[0];
  }

  function extrasTotal() {
    return state.extras.reduce(function (a, name) {
      for (var i = 0; i < EXTRAS.length; i++) {
        if (EXTRAS[i].name === name) return a + EXTRAS[i].price;
      }
      return a;
    }, 0);
  }

  function detailPrice() {
    var d = state.detail;
    if (!d) return 0;
    var base = state.size === "l" && d.l ? d.l : d.m;
    return base + extrasTotal();
  }

  function priceLabel(it) {
    return it.l
      ? it.m.toLocaleString("fr-FR").replace(/[  ]/g, " ") + " / " + F(it.l)
      : F(it.m);
  }

  /* ---------- Menu ---------- */

  function renderCategories() {
    ui["categories"].innerHTML = "";
    CATS.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-btn" + (cat.key === state.cat ? " is-active" : "");
      btn.textContent = cat.key;
      btn.setAttribute("aria-pressed", cat.key === state.cat ? "true" : "false");
      btn.addEventListener("click", function () {
        state.cat = cat.key;
        renderCategories();
        renderMenu();
      });
      ui["categories"].appendChild(btn);
    });
  }

  function renderMenu() {
    var active = activeCategory();
    ui["cat-note"].textContent = active.note;
    ui["menu-grid"].innerHTML = "";

    active.items.forEach(function (item, i) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "item-card reveal";
      card.setAttribute("data-delay", String(i % 4));
      card.innerHTML =
        '<span class="item-media">' +
          '<img class="item-photo" src="' + item.photo + '" alt="" loading="lazy" />' +
          '<span class="item-badge' + (item.badge === "Nouveau" ? " item-badge--new" : "") + '">' +
            escapeHtml(item.badge) + "</span>" +
          '<span class="item-price">' + priceLabel(item) + "</span>" +
        "</span>" +
        '<span class="item-body">' +
          '<span class="item-name">' + escapeHtml(item.name) + "</span>" +
          '<span class="item-desc">' + escapeHtml(item.desc) + "</span>" +
          '<span class="item-cta">Composer' +
            ' <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          "</span>" +
        "</span>";
      card.addEventListener("click", function () { openItem(item, active.key); });
      ui["menu-grid"].appendChild(card);
      observeReveal(card);
    });
  }

  /* ---------- Menu de navigation (mobile) ---------- */

  function setNav(open) {
    ui["main-nav"].classList.toggle("is-open", open);
    ui["nav-toggle"].setAttribute("aria-expanded", open ? "true" : "false");
    ui["nav-toggle"].setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }

  function initNav() {
    ui["nav-toggle"].addEventListener("click", function () {
      setNav(ui["nav-toggle"].getAttribute("aria-expanded") !== "true");
    });

    /* Le panneau se referme dès qu'on part vers une section. */
    Array.prototype.forEach.call(ui["main-nav"].querySelectorAll(".nav-link"), function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });

    /* Repasser en grand écran doit repartir d'un état propre. */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }

  /* ---------- Salons ---------- */

  /* Un champ vide n'affiche rien : le visiteur ne voit jamais de trou à
     combler, seulement les informations réellement disponibles. */
  function shopLine(label, value) {
    if (!value) return "";
    return '<p class="shop-line"><span class="shop-label">' + label + "</span>" + escapeHtml(value) + "</p>";
  }

  function renderShops() {
    ui["shops-grid"].innerHTML = "";

    SHOPS.forEach(function (s, i) {
      var soon = s.statut === "bientot";
      var horaires = s.ouverture && s.fermeture ? s.ouverture + " – " + s.fermeture : "";
      if (horaires && s.jours) horaires = s.jours + " · " + horaires;

      var card = document.createElement("article");
      card.className = "shop-card reveal" + (soon ? " shop-card--soon" : "");
      card.setAttribute("data-delay", String(i % 4));

      var html =
        '<h3 class="shop-name">' + escapeHtml(s.ville) + "</h3>" +
        shopLine("Adresse", s.adresse) +
        shopLine("Horaires", horaires);

      if (s.tel) {
        html += '<a href="tel:' + s.tel.replace(/\s/g, "") + '" class="shop-phone">' + escapeHtml(s.tel) + "</a>";
      }

      if (s.maps) {
        html +=
          '<a href="' + s.maps + '" target="_blank" rel="noopener" class="shop-maps">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>' +
            "</svg> Ouvrir dans Maps</a>";
      }

      html += soon
        ? '<span class="shop-tag shop-tag--soon">Ouverture prochaine</span>'
        : '<span class="shop-tag">Retrait &amp; livraison</span>';

      card.innerHTML = html;
      ui["shops-grid"].appendChild(card);
      observeReveal(card);
    });
  }

  /* ---------- Fiche produit ---------- */

  function lockScroll(on) {
    document.body.style.overflow = on ? "hidden" : "";
  }

  function openItem(item, catKey) {
    state.detail = item;
    state.detailCat = catKey;
    state.size = "m";
    state.extras = [];
    closeExtras();
    renderDetail();
    ui["detail-overlay"].hidden = false;
    lockScroll(true);
    ui["detail-close"].focus();
  }

  /* Ouvre une fiche depuis n'importe où — les cartes de la section nouveauté
     s'en servent pour amener directement à la commande. */
  function openItemByName(name) {
    for (var c = 0; c < CATS.length; c++) {
      for (var i = 0; i < CATS[c].items.length; i++) {
        if (CATS[c].items[i].name === name) {
          openItem(CATS[c].items[i], CATS[c].key);
          return true;
        }
      }
    }
    return false;
  }

  function closeDetail() {
    closeExtras();
    ui["detail-overlay"].hidden = true;
    state.detail = null;
    if (ui["cart-overlay"].hidden) lockScroll(false);
  }

  function renderDetail() {
    var d = state.detail;
    if (!d) return;

    ui["detail-photo"].src = d.photo;
    ui["detail-photo"].alt = d.name;
    ui["detail-badge"].textContent = d.badge;
    ui["detail-badge"].className = "detail-badge" + (d.badge === "Nouveau" ? " item-badge--new" : "");
    ui["detail-cat"].textContent = state.detailCat;
    ui["detail-price-from"].textContent = "dès " + F(d.m);
    ui["detail-name"].textContent = d.name;
    ui["detail-desc"].textContent = d.desc;

    var sizes = d.l
      ? [
          { key: "m", label: "500 ml", price: d.m },
          { key: "l", label: "700 ml", price: d.l }
        ]
      : [{ key: "m", label: "Portion", price: d.m }];

    ui["detail-sizes"].innerHTML = "";
    sizes.forEach(function (s) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "size-btn" + (state.size === s.key ? " is-active" : "");
      btn.innerHTML = "<b>" + s.label + "</b><span>" + F(s.price) + "</span>";
      btn.addEventListener("click", function () {
        state.size = s.key;
        renderDetail();
      });
      ui["detail-sizes"].appendChild(btn);
    });

    renderExtras();
    ui["detail-total"].textContent = F(detailPrice());
  }

  /* ---------- Petite fenêtre des ajouts ---------- */

  function renderExtras() {
    ui["extras-list"].innerHTML = "";
    EXTRAS.forEach(function (e) {
      var on = state.extras.indexOf(e.name) !== -1;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "extra-opt" + (on ? " is-on" : "");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.innerHTML =
        '<span class="extra-check" aria-hidden="true">✓</span>' +
        '<span class="extra-name">' + escapeHtml(e.name) +
          ' <span style="font-weight:400;opacity:.55">· ' + escapeHtml(e.note) + "</span></span>" +
        '<span class="extra-price">+' + e.price.toLocaleString("fr-FR") + " F</span>";
      btn.addEventListener("click", function () {
        state.extras = on
          ? state.extras.filter(function (n) { return n !== e.name; })
          : state.extras.concat([e.name]);
        renderExtras();
        ui["detail-total"].textContent = F(detailPrice());
      });
      ui["extras-list"].appendChild(btn);
    });

    var n = state.extras.length;
    ui["extras-summary"].textContent = n
      ? state.extras.join(", ") + " · +" + extrasTotal().toLocaleString("fr-FR") + " F"
      : "Perles, flan, jelly ou jelly noir · 200 F";
  }

  function openExtras() {
    ui["extras-popover"].hidden = false;
    ui["extras-open"].setAttribute("aria-expanded", "true");
    ui["extras-close"].focus();
  }

  function closeExtras() {
    ui["extras-popover"].hidden = true;
    ui["extras-open"].setAttribute("aria-expanded", "false");
  }

  /* Deux lignes identiques (même article, même format, mêmes ajouts) doivent
     se regrouper en une seule ligne avec une quantité. */
  function lineKey(line) {
    return line.name + "|" + line.sizeLabel + "|" + line.extras.slice().sort().join(",");
  }

  function addDetailToCart() {
    var d = state.detail;
    if (!d) return;

    var line = {
      name: d.name,
      photo: d.photo,
      price: detailPrice(),
      sizeLabel: d.l ? (state.size === "l" ? "700 ml" : "500 ml") : "portion",
      extras: state.extras.slice(),
      qty: 1
    };

    var key = lineKey(line);
    var existing = null;
    for (var i = 0; i < state.cart.length; i++) {
      if (lineKey(state.cart[i]) === key) { existing = state.cart[i]; break; }
    }

    if (existing) existing.qty += 1;
    else state.cart.push(line);

    closeDetail();
    bumpCount();
    openCart();
    renderCart();
  }

  /* Descendre sous 1 retire la ligne. */
  function changeQty(index, delta) {
    var line = state.cart[index];
    if (!line) return;
    line.qty += delta;
    if (line.qty < 1) state.cart.splice(index, 1);
    renderCart();
  }

  function cartCount() {
    return state.cart.reduce(function (a, l) { return a + l.qty; }, 0);
  }

  /* ---------- Panier ---------- */

  function bumpCount() {
    var c = ui["cart-count"];
    c.classList.remove("is-bumped");
    void c.offsetWidth;
    c.classList.add("is-bumped");
  }

  function openCart() {
    ui["cart-overlay"].hidden = false;
    lockScroll(true);
  }

  function closeCart() {
    ui["cart-overlay"].hidden = true;
    if (ui["detail-overlay"].hidden) lockScroll(false);
  }

  function setMode(mode) {
    state.mode = mode;
    openCart();
    renderCart();
  }

  function renderCart() {
    var cart = state.cart;
    ui["cart-count"].textContent = cartCount();

    ui["mode-pickup"].className = "mode-btn" + (state.mode === "pickup" ? " is-active" : "");
    ui["mode-delivery"].className = "mode-btn" + (state.mode === "delivery" ? " is-active" : "");

    ui["cart-lines"].innerHTML = "";

    if (!cart.length) {
      ui["cart-lines"].innerHTML =
        '<div class="cart-empty">' +
          '<span class="cart-empty-icon" aria-hidden="true">🧋</span>' +
          "<p>Votre commande est vide. Touchez un article du menu pour l'ajouter.</p>" +
        "</div>";
    } else {
      cart.forEach(function (line, i) {
        var detail = line.sizeLabel + (line.extras.length ? " · " + line.extras.join(", ") : "");
        var minusLabel = line.qty > 1
          ? "Retirer un " + line.name
          : "Retirer " + line.name + " de la commande";

        var row = document.createElement("div");
        row.className = "cart-line";
        row.innerHTML =
          '<span class="cart-line-photo"><img src="' + line.photo + '" alt="" /></span>' +
          '<span class="cart-line-body">' +
            '<span class="cart-line-name">' + escapeHtml(line.name) + "</span>" +
            '<span class="cart-line-detail">' + escapeHtml(detail) + "</span>" +
            '<span class="cart-line-foot">' +
              '<span class="qty">' +
                '<button type="button" class="qty-btn" data-delta="-1" aria-label="' + escapeHtml(minusLabel) + '">−</button>' +
                '<span class="qty-val">' + line.qty + "</span>" +
                '<button type="button" class="qty-btn" data-delta="1" aria-label="Ajouter un ' + escapeHtml(line.name) + '">+</button>' +
              "</span>" +
              '<span class="cart-line-price">' + F(line.price * line.qty) + "</span>" +
            "</span>" +
          "</span>";

        Array.prototype.forEach.call(row.querySelectorAll(".qty-btn"), function (btn) {
          btn.addEventListener("click", function () {
            changeQty(i, parseInt(btn.getAttribute("data-delta"), 10));
          });
        });
        ui["cart-lines"].appendChild(row);
      });
    }

    var isDelivery = state.mode === "delivery";
    ui["delivery-fields"].hidden = !isDelivery;

    var sub = cart.reduce(function (a, l) { return a + l.price * l.qty; }, 0);

    ui["cart-subtotal"].textContent = F(sub);
    ui["fee-label"].textContent = isDelivery ? "Livraison" : "Retrait en boutique";
    /* Super Thé ne fixe pas le prix de la course : c'est le livreur qui
       s'arrange avec le client selon le trajet. */
    ui["fee-value"].textContent = isDelivery ? "selon le trajet" : "Gratuit";
    ui["cart-total"].textContent = F(sub);
    ui["mode-note"].textContent = isDelivery
      ? "Vous réglez vos boissons ici. La course, vous la voyez directement avec le livreur : on lui transmet votre numéro WhatsApp."
      : "Votre commande vous attend au comptoir. Rien à payer en plus.";
    ui["cart-checkout"].textContent = isDelivery ? "Payer et envoyer" : "Valider le retrait";
  }

  function checkout() {
    if (!state.cart.length) return;

    if (state.mode === "delivery") {
      var addr = ui["d-address"].value.trim();
      var wa = ui["d-whatsapp"].value.trim();
      if (!addr || !wa) {
        (addr ? ui["d-whatsapp"] : ui["d-address"]).focus();
        ui["mode-note"].textContent = "Il nous faut l'adresse et le numéro WhatsApp pour envoyer le livreur.";
        return;
      }
    }

    ui["cart-checkout"].textContent = "Commande envoyée ✓";
    ui["mode-note"].textContent = state.mode === "delivery"
      ? "C'est parti. Le livreur vous écrit sur WhatsApp pour l'adresse et le prix de la course."
      : "C'est noté. Passez quand vous voulez au comptoir.";
  }

  /* ---------- Apparition au défilement ---------- */

  var revealObserver = null;

  function observeReveal(node) {
    if (revealObserver) revealObserver.observe(node);
    else node.classList.add("is-in");
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (n) {
        n.classList.add("is-in");
      });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (n) {
      revealObserver.observe(n);
    });
  }

  /* ---------- Démarrage ---------- */

  function init() {
    initReveal();
    initNav();
    renderCategories();
    renderMenu();
    renderShops();
    renderCart();

    Array.prototype.forEach.call(document.querySelectorAll("[data-item]"), function (btn) {
      btn.addEventListener("click", function () {
        openItemByName(btn.getAttribute("data-item"));
      });
    });

    ui["btn-open-cart"].addEventListener("click", openCart);
    ui["cart-close"].addEventListener("click", closeCart);
    ui["cart-backdrop"].addEventListener("click", closeCart);
    ui["cart-checkout"].addEventListener("click", checkout);

    ui["detail-close"].addEventListener("click", closeDetail);
    ui["detail-backdrop"].addEventListener("click", closeDetail);
    ui["detail-add"].addEventListener("click", addDetailToCart);

    ui["extras-open"].addEventListener("click", openExtras);
    ui["extras-close"].addEventListener("click", closeExtras);
    ui["extras-done"].addEventListener("click", closeExtras);

    ui["mode-pickup"].addEventListener("click", function () { setMode("pickup"); });
    ui["mode-delivery"].addEventListener("click", function () { setMode("delivery"); });
    ui["btn-pickup-cta"].addEventListener("click", function () { setMode("pickup"); });
    ui["btn-delivery-cta"].addEventListener("click", function () { setMode("delivery"); });
    ui["btn-hero-delivery"].addEventListener("click", function () { setMode("delivery"); });

    ui["contact-form"].addEventListener("submit", function (e) {
      e.preventDefault();
      ui["contact-submit"].textContent = "Demande envoyée ✓";
      ui["contact-submit"].disabled = true;
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!ui["extras-popover"].hidden) { closeExtras(); return; }
      if (!ui["detail-overlay"].hidden) { closeDetail(); return; }
      if (!ui["cart-overlay"].hidden) { closeCart(); return; }
      if (ui["main-nav"].classList.contains("is-open")) setNav(false);
    });

    var onScroll = function () {
      ui["site-header"].classList.toggle("is-stuck", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
