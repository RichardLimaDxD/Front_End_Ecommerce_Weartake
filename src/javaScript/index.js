const renderProducts = (array) => {
  const containerProduct = document.querySelector(".container__listProducts");

  containerProduct.innerHTML = "";

  array.forEach((element) => {
    const container = createProducts(element);

    containerProduct.appendChild(container);
  });
};

const createProducts = ({
  id,
  img,
  nameItem,
  description,
  value,
  addCart,
  tag,
}) => {
  const tagLi = document.createElement("li");

  const imgItem = document.createElement("img");

  const tagItem = document.createElement("h3");

  const title = document.createElement("h2");

  const descriptionProduts = document.createElement("p");

  const price = document.createElement("span");

  const addToCart = document.createElement("button");

  addToCart.classList.add("buttonCards");
  addToCart.id = `cardsId${id}`;

  imgItem.src = `./src/${img}`;
  imgItem.alt = "products img";

  tagItem.innerText = tag;

  title.innerText = nameItem;

  descriptionProduts.innerText = description;

  price.innerText = `R$ ${value}`;

  addToCart.innerText = addCart;

  addToCart.addEventListener("click", (event) => {
    count++;

    document.querySelector(".countItem").innerHTML = `${count}`;

    const getId = event.target.id;

    const id = parseInt(getId.substring(7));

    const findItem = findIdList(id);

    const itensCart = sendItemToCart(findItem);

    document.querySelector(".container__cart").appendChild(itensCart);

    countValue += findItem.value;

    document.querySelector(".totalPrice").innerHTML = `R$ ${countValue},00`;
  });

  tagLi.append(imgItem, tagItem, title, descriptionProduts, price, addToCart);

  return tagLi;
};

const findIdList = (id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      return data[i];
    }
  }
};

const sendItemToCart = ({ id, img, nameItem, value }) => {
  const tagLi = document.createElement("li");

  const imgItem = document.createElement("img");

  const div = document.createElement("div");

  const title = document.createElement("h2");

  const price = document.createElement("span");

  const removeToCart = document.createElement("button");

  removeToCart.classList.add("buttonCardsRemove");
  removeToCart.id = `cardsId${id}`;

  tagLi.id = id;

  div.classList.add("div__containerCart");

  imgItem.src = `./src/${img}`;
  imgItem.alt = "products img";

  title.innerText = nameItem;

  price.innerText = `R$ ${value}`;

  removeToCart.innerText = "Remover produto";

  removeToCart.addEventListener("click", (event) => {
    count--;

    document.querySelector(".countItem").innerHTML = `${count}`;

    const getPathValue = event.composedPath();
    getPathValue[2].remove();

    countValue -= value;

    document.querySelector(".totalPrice").innerHTML = `R$ ${countValue},00`;
  });

  tagLi.append(imgItem, div);
  div.append(title, price, removeToCart);

  return tagLi;
};

const renderFilter = (array) => {
  const filterButtons = document.querySelectorAll(".filter__item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const filteredProducts = productFilter(array, event.target.innerText);
      event.target.innerText === "Todos"
        ? renderProducts(array)
        : renderProducts(filteredProducts);
    });
  });
};

const productFilter = (array, categoryItem) => {
  const filteredProducts = array.filter((item) => {
    return item.tag === categoryItem;
  });

  return filteredProducts;
};

const renderSearch = (array) => {
  const searchInput = document.querySelector(
    ".container__searchButtons > input"
  );

  searchInput.addEventListener("keyup", () => {
    const productFound = searchProducts(array, searchInput.value);

    renderProducts(productFound);
  });
};

const searchProducts = (array, searchElement) => {
  const productFound = array.filter((item) => {
    return (
      item.nameItem
        .toLowerCase()
        .includes(searchElement.toLowerCase().trim()) ||
      item.tag.toLowerCase().includes(searchElement.toLowerCase().trim())
    );
  });

  return productFound;
};

renderProducts(data);
renderFilter(data);
renderSearch(data);
