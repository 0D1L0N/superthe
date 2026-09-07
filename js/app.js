(function () {
  "use strict";

  const F = n => n.toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, " ") + " FCFA";
  const DELIVERY_FEE = 1000;

  const EXTRAS = [
    { name: "Flan à la mangue", price: 200 },
    { name: "Perles", price: 200 },
    { name: "Jelly", price: 200 },
    { name: "Portion de frites", price: 1000 }
  ];

  const CATS = [
    {
      key: "Thé au lait",
      note: "500 ml ou 700 ml, chaud ou glacé. Base thé infusé le matin, lait entier, sucre ajustable.",
      items: [
        { name: "SUPER THÉ (thé au lait aux perles)", m: 1200, l: 1400, badge: "Le signature", photo: "img/p/perles.jpg", desc: "La recette maison : thé noir infusé, lait entier et perles de tapioca cuites toutes les deux heures, encore tièdes au fond du gobelet.", parts: ["Thé noir", "Lait entier", "Perles de tapioca", "Sucre de canne", "Glace"] },
        { name: "Thé au lait classique", m: 1200, l: 1400, badge: "Classique", photo: "img/cup-caramel.jpg", desc: "Le thé au lait sans topping, tout en douceur. La base de tout le reste de la carte.", parts: ["Thé noir", "Lait entier", "Sucre de canne", "Glace"] },
        { name: "Thé au lait aux jellys", m: 1200, l: 1400, badge: "Texture", photo: "img/placeholder.svg", desc: "Cubes de gelée fruitée à la place des perles : plus fermes, plus frais sous la dent.", parts: ["Thé noir", "Lait entier", "Jelly fruité", "Glace"] },
        { name: "Thé au lait au flans de mangue", m: 1200, l: 1400, badge: "Gourmand", photo: "img/placeholder.svg", desc: "Flan à la mangue préparé le matin, texture crème renversée qui fond dans le thé.", parts: ["Thé noir", "Lait entier", "Flan mangue", "Purée de mangue"] },
        { name: "Thé au lait aux mélanges", m: 1200, l: 1400, badge: "Tout dedans", photo: "img/cup-fraise.jpg", desc: "Perles, jelly et flan dans le même gobelet, pour ceux qui n'arrivent pas à choisir.", parts: ["Thé noir", "Lait entier", "Perles", "Jelly", "Flan mangue"] },
        { name: "Thé vert au lait au menthe", m: 1200, l: 1400, badge: "Très frais", photo: "img/g3.jpg", desc: "Menthe fraîche pilée dans le thé vert au lait : plus végétal, finale glaciale.", parts: ["Thé vert jasmin", "Lait entier", "Menthe fraîche", "Glace"] }
      ]
    },
    {
      key: "Thé vert aux fruits",
      note: "500 ml ou 700 ml, chaud ou glacé. Thé vert jasmin et fruits frais, sans lait.",
      items: [
        { name: "Thé vert à la mangue", m: 1300, l: 1500, badge: "Best-seller", photo: "img/p/the-fruits.jpg", desc: "Mangue mûre mixée dans le thé vert glacé, la version la plus solaire de la carte.", parts: ["Thé vert jasmin", "Mangue fraîche", "Glace"] },
        { name: "Thé vert à l'ananas", m: 1300, l: 1500, badge: "Acidulé", photo: "img/p/the-fruits.jpg", desc: "Ananas frais coupé au comptoir, morceaux compris. Acidité franche, peu sucré.", parts: ["Thé vert jasmin", "Ananas frais", "Glace"] },
        { name: "Thé vert au fruit de la passion et à l'ananas", m: 1300, l: 1500, badge: "Duo tropical", photo: "img/p/the-fruits.jpg", desc: "La passion pour l'acidité, l'ananas pour le sucre. Les grains de passion restent dans le verre.", parts: ["Thé vert jasmin", "Pulpe de passion", "Ananas frais", "Glace"] },
        { name: "Thé vert au citron", m: 1200, l: 1400, badge: "Désaltérant", photo: "img/placeholder.svg", desc: "Citron pressé minute dans le thé vert : le plus léger et le moins cher des thés fruités.", parts: ["Thé vert jasmin", "Citron pressé", "Glace"] },
        { name: "Thé vert au citron et au sel de mer", m: 1300, l: 1500, badge: "Sucré-salé", photo: "img/placeholder.svg", desc: "Citron pressé relevé d'une pointe de sel de mer. L'équilibre qui fait revenir.", parts: ["Thé vert jasmin", "Citron pressé", "Sel de mer", "Glace"] },
        { name: "Thé vert aux fruits (cocktail)", m: 1300, l: 1500, badge: "Cocktail", photo: "img/p/the-fruits.jpg", desc: "Mangue, ananas et passion réunis dans le même gobelet. Sans alcool.", parts: ["Thé vert jasmin", "Mangue", "Ananas", "Passion"] }
      ]
    },
    {
      key: "Smoothies",
      note: "Petit ou grand format. Fruits entiers mixés à la commande avec du lait glacé, aucune poudre.",
      items: [
        { name: "Smoothie à la mangue", m: 1400, l: 1500, badge: "Épais", photo: "img/p/smoothies.jpg", desc: "Mangue et lait glacé mixés serré, texture à la cuillère.", parts: ["Mangue fraîche", "Lait glacé", "Glace pilée"] },
        { name: "Smoothie à l'ananas", m: 1400, l: 1500, badge: "Vif", photo: "img/p/smoothies.jpg", desc: "Ananas frais mixé, mousse légère et acidité vive.", parts: ["Ananas frais", "Lait glacé", "Glace pilée"] },
        { name: "Smoothie à la banane", m: 1400, l: 1500, badge: "Rassasiant", photo: "img/p/smoothies.jpg", desc: "Banane bien mûre et lait glacé : le plus nourrissant du lot.", parts: ["Banane", "Lait glacé", "Glace pilée"] }
      ]
    },
    {
      key: "Café",
      note: "Chaud ou glacé, préparé à la machine, à emporter ou sur place.",
      items: [
        { name: "Americana", m: 1500, badge: "Long", photo: "img/placeholder.svg", desc: "Expresso allongé à l'eau chaude : long, corsé, sans lait.", parts: ["Café en grains", "Eau chaude"] },
        { name: "Expresso", m: 2000, badge: "Serré", photo: "img/placeholder.svg", desc: "Servi court, double dose de café.", parts: ["Café en grains", "Eau"] },
        { name: "Latté", m: 2000, badge: "Doux", photo: "img/placeholder.svg", desc: "Expresso noyé de lait chaud, mousse fine sur le dessus.", parts: ["Expresso", "Lait chaud", "Mousse de lait"] },
        { name: "Latte aux noisettes / vanilles / menthes", m: 2000, badge: "3 parfums", photo: "img/placeholder.svg", desc: "Le latté avec le sirop de votre choix : noisette, vanille ou menthe. À préciser à la commande.", parts: ["Expresso", "Lait chaud", "Sirop au choix"] }
      ]
    },
    {
      key: "Pâtisseries",
      note: "Préparées à la commande, à prendre avec la boisson.",
      items: [
        { name: "Gaufres simple", m: 1200, badge: "Chaud", photo: "img/placeholder.svg", desc: "Gaufre cuite au moment, croustillante dehors et moelleuse dedans.", parts: ["Pâte à gaufre maison", "Beurre", "Sucre"] }
      ]
    },
    {
      key: "Fast-food",
      note: "Le salé du midi et du soir, monté à la commande.",
      items: [
        { name: "Chawama viande", m: 2000, badge: "Sauce maison", photo: "img/placeholder.svg", desc: "Viande grillée roulée serré dans le pain, avec la sauce spéciale maison.", parts: ["Pain libanais", "Viande grillée", "Crudités", "Sauce spéciale maison"] },
        { name: "Super chawarma", m: 2500, badge: "Généreux", photo: "img/placeholder.svg", desc: "Le chawarma version double : viande, œufs et sauce maison.", parts: ["Pain libanais", "Viande grillée", "Œufs", "Crudités", "Sauce maison"] },
        { name: "Hamburger royal", m: 2000, badge: "Complet", photo: "img/placeholder.svg", desc: "Viande, frites, tomate et oignon dans un pain brioché.", parts: ["Pain brioché", "Viande", "Frites", "Tomate", "Oignon"] },
        { name: "Super hamburger", m: 3500, badge: "Le plus grand", photo: "img/p/frites.jpg", desc: "Viande, œufs et une portion de frites incluse. Pour les grosses faims.", parts: ["Pain brioché", "Viande", "Œufs", "Portion de frites"] }
      ]
    }
  ];

  const ITEM_COUNT = CATS.reduce((a, c) => a + c.items.length, 0);

  const state = {
    cat: CATS[0].key,
    cart: [],
    cartOpen: false,
    mode: "pickup",
    sent: false,
    detail: null,
    detailCatKey: "",
    size: "m",
    extras: []
  };

  const el = id => document.getElementById(id);

  const els = {
    cartCount: el("cart-count"),
    statItemCount: el("stat-item-count"),
    categories: el("categories"),
    catNote: el("cat-note"),
    menuGrid: el("menu-grid"),
    detailOverlay: el("detail-overlay"),
    detailBackdrop: el("detail-backdrop"),
    detailPhoto: el("detail-photo"),
    detailCat: el("detail-cat"),
    detailName: el("detail-name"),
    detailClose: el("detail-close"),
    detailDesc: el("detail-desc"),
    detailParts: el("detail-parts"),
    detailSizes: el("detail-sizes"),
    detailExtras: el("detail-extras"),
    detailAdd: el("detail-add"),
    detailTotal: el("detail-total"),
    cartOverlay: el("cart-overlay"),
    cartBackdrop: el("cart-backdrop"),
    cartClose: el("cart-close"),
    modePickup: el("mode-pickup"),
    modeDelivery: el("mode-delivery"),
    cartLines: el("cart-lines"),
    cartEmptyNote: el("cart-empty-note"),
    deliveryFields: el("delivery-fields"),
    cartSubtotal: el("cart-subtotal"),
    feeLabel: el("fee-label"),
    feeValue: el("fee-value"),
    cartTotal: el("cart-total"),
    modeNote: el("mode-note"),
    cartCheckout: el("cart-checkout"),
    btnOpenCart: el("btn-open-cart"),
    btnDeliveryCta: el("btn-delivery-cta"),
    btnPickupCta: el("btn-pickup-cta"),
    contactForm: el("contact-form"),
    contactSubmit: el("contact-submit")
  };

  function activeCategory() {
    return CATS.find(c => c.key === state.cat) || CATS[0];
  }

  function detailPrice() {
    const d = state.detail;
    if (!d) return 0;
    const base = state.size === "l" && d.l ? d.l : d.m;
    return base + state.extras.reduce((a, name) => {
      const ex = EXTRAS.find(e => e.name === name);
      return a + (ex ? ex.price : 0);
    }, 0);
  }

  function priceLabel(it) {
    return it.l ? F(it.m).replace(" FCFA", "") + " / " + F(it.l) : F(it.m);
  }

  function renderCategories() {
    els.categories.innerHTML = "";
    CATS.forEach(cat => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-btn" + (cat.key === state.cat ? " is-active" : "");
      btn.textContent = cat.key;
      btn.addEventListener("click", () => {
        state.cat = cat.key;
        renderCategories();
        renderMenu();
      });
      els.categories.appendChild(btn);
    });
  }

  function renderMenu() {
    const active = activeCategory();
    els.catNote.textContent = active.note;
    els.menuGrid.innerHTML = "";
    active.items.forEach(item => {
      const card = document.createElement("article");
      card.className = "item-card";
      card.innerHTML =
        '<div class="item-photo-wrap">' +
          '<img class="item-photo" src="' + item.photo + '" alt="' + escapeHtml(item.name) + '" />' +
          '<span class="item-badge">' + escapeHtml(item.badge) + '</span>' +
        '</div>' +
        '<div class="item-body">' +
          '<div class="item-row">' +
            '<h3 class="item-name">' + escapeHtml(item.name) + '</h3>' +
            '<span class="item-price">' + priceLabel(item) + '</span>' +
          '</div>' +
          '<p class="item-desc">' + escapeHtml(item.desc) + '</p>' +
          '<span class="item-cta">Voir la photo et composer →</span>' +
        '</div>';
      card.addEventListener("click", () => openItem(item, active.key));
      els.menuGrid.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function openItem(item, catKey) {
    state.detail = item;
    state.detailCatKey = catKey;
    state.size = "m";
    state.extras = [];
    renderDetail();
    els.detailOverlay.hidden = false;
  }

  function closeDetail() {
    els.detailOverlay.hidden = true;
    state.detail = null;
  }

  function renderDetail() {
    const d = state.detail;
    if (!d) return;
    els.detailPhoto.src = d.photo;
    els.detailPhoto.alt = d.name;
    els.detailCat.textContent = state.detailCatKey;
    els.detailName.textContent = d.name;
    els.detailDesc.textContent = d.desc;

    els.detailParts.innerHTML = "";
    d.parts.forEach(part => {
      const span = document.createElement("span");
      span.className = "pill";
      span.textContent = part;
      els.detailParts.appendChild(span);
    });

    const sizes = d.l
      ? [{ key: "m", label: "500 ml — " + F(d.m) }, { key: "l", label: "700 ml — " + F(d.l) }]
      : [{ key: "m", label: "Portion — " + F(d.m) }];
    els.detailSizes.innerHTML = "";
    sizes.forEach(s => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "size-btn" + (state.size === s.key ? " is-active" : "");
      btn.textContent = s.label;
      btn.addEventListener("click", () => {
        state.size = s.key;
        renderDetail();
      });
      els.detailSizes.appendChild(btn);
    });

    els.detailExtras.innerHTML = "";
    EXTRAS.forEach(e => {
      const btn = document.createElement("button");
      btn.type = "button";
      const active = state.extras.includes(e.name);
      btn.className = "extra-btn" + (active ? " is-active" : "");
      btn.textContent = "+ " + e.name + " (" + e.price.toLocaleString("fr-FR") + " F)";
      btn.addEventListener("click", () => {
        state.extras = active ? state.extras.filter(n => n !== e.name) : [...state.extras, e.name];
        renderDetail();
      });
      els.detailExtras.appendChild(btn);
    });

    els.detailTotal.textContent = F(detailPrice());
  }

  function addDetailToCart() {
    const d = state.detail;
    if (!d) return;
    const sizeLabel = d.l ? (state.size === "l" ? "700 ml" : "500 ml") : "portion";
    state.cart.push({
      name: d.name,
      photo: d.photo,
      price: detailPrice(),
      sizeLabel,
      extras: [...state.extras]
    });
    closeDetail();
    openCart();
    renderCart();
  }

  function removeCartLine(index) {
    state.cart.splice(index, 1);
    renderCart();
  }

  function openCart() {
    els.cartOverlay.hidden = false;
    state.cartOpen = true;
  }
  function closeCart() {
    els.cartOverlay.hidden = true;
    state.cartOpen = false;
  }

  function setMode(mode) {
    state.mode = mode;
    openCart();
    renderCart();
  }

  function renderCart() {
    const cart = state.cart;
    els.cartCount.textContent = cart.length;

    els.modePickup.className = "mode-btn" + (state.mode === "pickup" ? " is-active" : "");
    els.modeDelivery.className = "mode-btn" + (state.mode === "delivery" ? " is-active" : "");

    els.cartLines.innerHTML = "";
    cart.forEach((line, i) => {
      const row = document.createElement("div");
      row.className = "cart-line";
      const detailText = line.sizeLabel + (line.extras.length ? " · " + line.extras.join(", ") : "") + " · " + F(line.price);
      row.innerHTML =
        '<div class="cart-line-photo"><img src="' + line.photo + '" alt="' + escapeHtml(line.name) + '" /></div>' +
        '<div class="cart-line-info">' +
          '<div class="cart-line-name">' + escapeHtml(line.name) + '</div>' +
          '<div class="cart-line-detail">' + escapeHtml(detailText) + '</div>' +
        '</div>' +
        '<button type="button" class="btn-remove" aria-label="Retirer">−</button>';
      row.querySelector(".btn-remove").addEventListener("click", () => removeCartLine(i));
      els.cartLines.appendChild(row);
    });
    els.cartEmptyNote.textContent = cart.length ? "" : "Votre commande est vide. Cliquez sur un article du menu pour l'ajouter.";

    const isDelivery = state.mode === "delivery";
    els.deliveryFields.hidden = !isDelivery;

    const sub = cart.reduce((a, i) => a + i.price, 0);
    const fee = isDelivery && cart.length ? DELIVERY_FEE : 0;

    els.cartSubtotal.textContent = F(sub);
    els.feeLabel.textContent = isDelivery ? "Livraison" : "Retrait en boutique";
    els.feeValue.textContent = isDelivery ? (cart.length ? F(DELIVERY_FEE) : "1 000 FCFA") : "Gratuit";
    els.cartTotal.textContent = F(sub + fee);
    els.modeNote.textContent = isDelivery
      ? "Livraison en 30 min environ, paiement Mobile Money ou espèces à la porte."
      : "Prêt en 10 min, à retirer au comptoir.";
    els.cartCheckout.textContent = isDelivery ? "Valider la livraison" : "Valider le retrait";
  }

  function init() {
    els.statItemCount.textContent = ITEM_COUNT;

    renderCategories();
    renderMenu();
    renderCart();

    els.btnOpenCart.addEventListener("click", openCart);
    els.cartClose.addEventListener("click", closeCart);
    els.cartBackdrop.addEventListener("click", closeCart);

    els.detailClose.addEventListener("click", closeDetail);
    els.detailBackdrop.addEventListener("click", closeDetail);
    els.detailAdd.addEventListener("click", addDetailToCart);

    els.modePickup.addEventListener("click", () => setMode("pickup"));
    els.modeDelivery.addEventListener("click", () => setMode("delivery"));
    els.btnDeliveryCta.addEventListener("click", () => setMode("delivery"));
    els.btnPickupCta.addEventListener("click", () => setMode("pickup"));
    els.cartCheckout.addEventListener("click", closeCart);

    els.contactForm.addEventListener("submit", e => {
      e.preventDefault();
      state.sent = true;
      els.contactSubmit.textContent = "Message envoyé ✓";
    });

    document.addEventListener("keydown", e => {
      if (e.key !== "Escape") return;
      if (!els.detailOverlay.hidden) closeDetail();
      if (!els.cartOverlay.hidden) closeCart();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
