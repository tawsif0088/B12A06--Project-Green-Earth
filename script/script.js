const loadCategory = () => {
  const uri = "https://openapi.programming-hero.com/api/categories";
  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadTrees = (id) => { 
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  console.log(id)
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTrees(data.plants));
};

const loadAllTrees = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTrees(data.plants));
};

const displayCategory = (categories) => {
  const catContainer = document.getElementById("category-container");
  catContainer.innerHTML = " ";

  for (let category of categories) {
   
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
        <button onclick="loadTrees('${category.id}')" class="btn btn-block btn-category shadow space-y-3 mt-3 px-3 py-2 rounded-md font-medium
           hover:bg-green-300 hover:text-gray-900">
                  ${category.category_name}
        </button>
              
    `;
    catContainer.appendChild(categoryCard);
  };
};

const displayTrees = (trees) => {
  const treesSection = document.getElementById("trees-section");
  treesSection.innerHTML = " ";
  trees.forEach((tree) => {
    const treeCard = document.createElement("div");
    treeCard.innerHTML = `
    <article
                class="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition group flex flex-col h-full"
              >
                <div class="rounded-xl w-full aspect-[16/11]">
                  <img
                    class="rounded-xl w-full aspect-[16/11]"
                    src="${tree.image}"
                    alt=""
                  />
                </div>
                <div class="mt-3 flex flex-col h-full">
                  <h4 class="font-semibold text-gray-800">${tree.name}</h4>
                  <p class="text-sm text-gray-500 mt-1">
                    ${tree.description}...                    
                  </p>
                  <div class="mt-3 flex items-center justify-between">
                    <span
                      class="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700"
                      >${tree.category}</span
                    >
                    <span class="font-semibold text-gray-700">${tree.price}</span>
                  </div>
                 
                  <button
                    class="mt-3.5 w-full rounded-full bg-green-700 text-white font-semibold py-2.5 transition hover:bg-green-900 active:scale-[.98]"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
      
    `;
    treesSection.appendChild(treeCard);
  });
 
};

loadCategory();
loadAllTrees();

