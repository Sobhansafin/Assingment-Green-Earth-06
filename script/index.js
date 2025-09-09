let total = 0;

// Spinner show/hide
const showSpinner = () => document.getElementById("spinner").classList.remove("hidden");
const hideSpinner = () => document.getElementById("spinner").classList.add("hidden");

// Load categories
async function loadCategories() {
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  hideSpinner();

  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = `
    <li><a onclick="loadProducts()" class="active bg-green-600 text-white">All Trees</a></li>
  `;
  data.categories.forEach(cat => {
    const li = document.createElement("li");
    li.innerHTML = `<a onclick="loadProductsByCategory(${cat.id}, this)">${cat.category}</a>`;
    categoryList.appendChild(li);
  });
}

// Load all products
async function loadProducts() {
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideSpinner();
  displayProducts(data.plants);
}

// Load products by category
async function loadProductsByCategory(id, el) {
  showSpinner();
  const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
  const data = await res.json();
  hideSpinner();

  document.querySelectorAll("#category-list a").forEach(a => a.classList.remove("bg-green-600", "text-white"));
  el.classList.add("bg-green-600", "text-white");

  displayProducts(data.plants);
}

// Display products
function displayProducts(plants) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "card bg-white shadow";
    card.innerHTML = `
      <figure><img src="${plant.image}" class="h-40 w-full object-cover rounded-t-lg"></figure>
      <div class="card-body">
        <h2 onclick="openModal(${plant.id})" class="font-semibold cursor-pointer text-green-700 underline">${plant.name}</h2>
        <p class="text-sm text-gray-600">${plant.short_description}</p>
        <div class="flex justify-between">
          <span class="badge bg-[#DCFCE7] text-[#62AB80] text-[15px]">${plant.category}</span>
          <span class="font-bold text-[15px]">৳${plant.price}</span>
        </div>
        <button onclick="addToCart('${plant.name}', ${plant.price})" class="btn bg-[#15803D] text-white rounded-3xl w-full mt-2">Add to Cart</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

// Modal
async function openModal(id) {
  showSpinner();
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  hideSpinner();

  document.getElementById("modal-title").textContent = data.plant.name;
  document.getElementById("modal-img").src = data.plant.image;
  document.getElementById("modal-desc").textContent = data.plant.description;
  document.getElementById("modal-category").textContent = data.plant.category;
  document.getElementById("modal-price").textContent = data.plant.price;

  document.getElementById("plant-modal").showModal();
}

// Cart
function addToCart(name, price) {
  const cartItems = document.getElementById("cart-items");
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-white px-3 py-2 rounded shadow";
  li.innerHTML = `
    <span>${name}</span>
    <span>৳${price}</span>
    <button onclick="removeFromCart(this, ${price})" class="text-red-500">❌</button>
  `;
  cartItems.appendChild(li);

  total += price;
  document.getElementById("cart-total").textContent = total;
}

function removeFromCart(btn, price) {
  btn.parentElement.remove();
  total -= price;
  document.getElementById("cart-total").textContent = total;
}

// Clear cart

const clearCartBtn = document.getElementById("clear-cart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    document.getElementById("cart-items").innerHTML = "";
    total = 0;
    document.getElementById("cart-total").textContent = 0;
  });
}

// document.getElementById("clear-cart").addEventListener("click", () => {
//   document.getElementById("cart-items").innerHTML = "";
//   total = 0;
//   document.getElementById("cart-total").textContent = 0;
// });

// Init
loadCategories();
loadProducts();


















//  const cartItemsEl = document.getElementById("cart-items");
//     const cartTotalEl = document.getElementById("cart-total");
//     let cart = [];

//     function renderCart() {
//       cartItemsEl.innerHTML = "";
//       let total = 0;
//       cart.forEach((item, index) => {
//         total += item.price * item.qty;
//         const li = document.createElement("li");
//         li.className = "flex justify-between items-center";
//         li.innerHTML = `
//           <span>\${item.name} (x\${item.qty})</span>
//           <span>$\${item.price * item.qty}</span>
//           <button class="btn btn-xs btn-error ml-2" onclick="removeFromCart(\${index})">X</button>
//         `;
//         cartItemsEl.appendChild(li);
//       });
//       cartTotalEl.textContent = total;
//     }

//     function addToCart(name, price) {
//       const existing = cart.find(item => item.name === name);
//       if (existing) {
//         existing.qty++;
//       } else {
//         cart.push({ name, price: parseFloat(price), qty: 1 });
//       }
//       renderCart();
//     }

//     function removeFromCart(index) {
//       cart.splice(index, 1);
//       renderCart();
//     }

//     document.querySelectorAll(".add-to-cart").forEach(btn => {
//       btn.addEventListener("click", () => {
//         const name = btn.getAttribute("data-name");
//         const price = btn.getAttribute("data-price");
//         addToCart(name, price);
//       });
//     });