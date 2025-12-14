const removeActiveBtn = () => {
  const categoriesButton = document.querySelectorAll(".categories-btn");
  categoriesButton.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loading = (status) => {
  if (status == true) {
    document.getElementById("spaning").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spaning").classList.add("hidden");
  }
};

const LoadCategoriesId = (id) => {
  loading(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      const activeBtn = document.getElementById(`categories-btn-${id}`);
      activeBtn.classList.add("active");
      displayCard(data.plants);
    });
};

const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
};

const loadCardDetails = (id) => {
  loading(true);

  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCardDetails(data.plants);
    });
};

const displayCardDetails = (data) => {
  // console.log(data);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <div class="space-y-4">
                <h3 class="font-semibold text-[#1F2937] text-3xl">${data.name}</h3>
                <img src="${data.image}" alt="" class="w-full rounded-lg aspect-3/2" />
                <p class="font-semibold text-[#1F2937] text-xl">Category: <span class="font-normal text-gray-600">${data.category}</span></p>
                <p class="font-semibold text-[#1F2937] text-xl">Price:৳ <span class="font-normal text-gray-600">${data.price}</span></p>
                <p class="font-semibold text-[#1F2937] text-xl">Description: <span class="font-normal text-gray-600">${data.description}</span></p>
              </div>
  `;
  document.getElementById("my_modal").showModal();
};

const displayCard = (details) => {
  const cardContainer = document.getElementById("card-container");
  // console.log(details);
  cardContainer.innerHTML = "";
  details.forEach((info) => {
    // console.log(info.image);
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="p-4 bg-white shadow-sm rounded-lg">
                <img src="${info.image}" alt="" class=" rounded-lg w-full aspect-3/2 mb-3">
                <div class="">
                    <h3 onclick="loadCardDetails(${info.id})" class="font-semibold text-[#1F2937] ">${info.name}</h3>
                    <p class="my-2 text-xs opacity-[0.8] text-[#1F2937] line-clamp-2">${info.description}</p>
                    
                </div>
                <div class="flex items-center justify-between mt-3">
                    <p class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-full font-medium">${info.category}</p>
                     <p class="text-[#1F2937] font-semibold">৳<span>${info.price}</span></p>
                </div>
                <div id="add-to-cart-${info.id}" onclick="btnClick(${info.id})" class="mt-3 bg-[#15803D] py-3 text-center font-medium text-white rounded-full">
                    <button class="">Add to Cart</button>
                </div>
            </div>
        `;
    cardContainer.append(card);
  });
  loading(false);
};

const loadAllPlants = () => {
  loading(true);

  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      displayAllPlants(data.plants);
    });
};
{
  /* <button class="btn" onclick="my_modal_5.showModal()">open modal</button> */
}

const removeCart = (price, id) => {
  const deleteBtn = document.getElementById(`delete-btn-${id}`);

  const a = deleteBtn.parentNode.parentNode.parentNode;
  // console.log(a);

  a.innerHTML = "";

  let priceAll = parseInt(document.getElementById("total-price").innerText);

  priceAll = priceAll - price;
  document.getElementById("total-price").innerText = priceAll;
};

const yourCart = (title, price, id) => {
  // console.log(title, price);
  alert(`${title}` + "has been added to the cart");
  const yourCartContainer = document.getElementById("your-cart-container");
  const cartDiv = document.createElement("div");
  cartDiv.innerHTML = `
  <div class="px-2 py-2 rounded-lg bg-[#F0FDF4] mb-4">
              <div class="flex items-center justify-between">
                <div class="">
                  <h2 class="mb-2 font-semibold">${title}</h2>
                  <p class="text-[#1F2937] opacity-[0.5]">৳ <span class="">${price}</span> x 1</p>
                </div>
                <div id="delete-btn-${id}" onclick="removeCart(${price}, ${id})" class="text-red-700">
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
            </div>
  `;
  let totalPrice = parseInt(document.getElementById("total-price").innerText);
  let finalPrice = price + totalPrice;
  document.getElementById("total-price").innerText = finalPrice;
  // console.log(finalPrice);
  yourCartContainer.append(cartDiv);
};

const btnClick = (id) => {
  // console.log(id);
  const addBtn = document.getElementById(`add-to-cart-${id}`);
  const treeTitle = addBtn.parentNode.children[1].children[0].textContent;
  // console.log(treeTitle);
  const treePrice = parseInt(
    addBtn.parentNode.children[2].children[1].children[0].textContent
  );
  // console.log(treePrice);
  yourCart(treeTitle, treePrice, id);
};

const displayAllPlants = (plants) => {
  // console.log(plants);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  plants.forEach((plant) => {
    // console.log(plant);
    const allTreeCard = document.createElement("div");
    allTreeCard.innerHTML = `
    <div class="p-4 bg-white shadow-sm rounded-lg">
                <img src="${plant.image}" alt="" class=" rounded-lg w-full aspect-3/2 mb-3">
                <div class="">
                    <h3 onclick="loadCardDetails(${plant.id})" class="font-semibold text-[rgb(31,41,55)] ">${plant.name}</h3>
                    <p class="my-2 text-xs opacity-[0.8] text-[#1F2937] line-clamp-2">${plant.description}</p>
                    
                </div>
                <div class="flex items-center justify-between mt-3">
                    <p class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 rounded-full font-medium">${plant.category}</p>
                    <p class="text-[#1F2937] font-semibold">৳<span>${plant.price}</span></p>
                </div>
                <div id="add-to-cart-${plant.id}" onclick="btnClick(${plant.id})" class=" mt-3 bg-[#15803D] py-3 text-center font-medium text-white rounded-full">
                    <button class="">Add to Cart</button>
                </div>
            </div>
    `;
    cardContainer.append(allTreeCard);
  });
  loading(false);
};

// onclick="addToCartBtn(${plant.name})"

const displayCategories = (cats) => {
  //   console.log(cat);
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = `<h4 id="trees-categories" onclick='loadAllPlants()' 
              class="categories-btn w-full text-left px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-[#15803D] hover:text-white transition"
            >
              All Trees
            </h4>`;
  cats.forEach((cat) => {
    // console.log(cat);
    const itemCat = document.createElement("h4");

    itemCat.innerHTML = `
    <h4 id='categories-btn-${cat.id}' onclick="LoadCategoriesId(${cat.id})"
              class="categories-btn shadow px-3 py-2 rounded-md font-medium hover:bg-green-300 hover:text-gray-900"
            >
              ${cat.category_name}
            </h4>
    `;
    categoriesContainer.append(itemCat);
  });
};

loadAllPlants();
loadCategories();
