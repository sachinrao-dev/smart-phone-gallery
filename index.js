const filterDiv = document.getElementById("brand-filter");
const filters = document.getElementsByName("brand");
const contentDiv = document.getElementById("content");
const searchBar = document.getElementById("searchBar");

initial();
const priceData = [
  {
    start_price: 1000,
    end_price: 5000,
  },
  {
    start_price: 5000,
    end_price: 10000,
  },
  {
    start_price: 10000,
    end_price: 13000,
  },
  {
    end_price: 15000,
  },
];

function initial() {
  filterDiv.innerHTML = "";
  contentDiv.innerHTML = "";
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const uniqueBrand = [...new Set(data.map((item) => item.brand))];
      renderData(data);
      renderFilterRadio(uniqueBrand);
      renderPrice();
    });
}

function renderData(data) {
  contentDiv.innerHTML = "";
  if (data.length) {
    data.forEach((item) => {
      const dataDiv = document.createElement("div");
      dataDiv.className = "data";
      const img = document.createElement("img");
      img.height = "200";
      img.width = "200";
      img.src = item.img;
      img.alt = "No image";
      const nameDiv = document.createElement("div");
      nameDiv.innerText = `Name : ${item.name}`;
      const brandDiv = document.createElement("div");
      brandDiv.innerText = `Brand : ${item.brand}`;
      const priceDiv = document.createElement("div");
      priceDiv.innerText = `Price: ${item.price}`;
      dataDiv.appendChild(img);
      dataDiv.appendChild(nameDiv);
      dataDiv.appendChild(brandDiv);
      dataDiv.appendChild(priceDiv);
      contentDiv.appendChild(dataDiv);
    });
  } else {
    const dataDiv = document.createElement("div");
    dataDiv.className = "data";
    dataDiv.innerHTML = "NO Data Available";
    contentDiv.appendChild(dataDiv);
  }
}
function getFilterData(item) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      let filteredData = data;
      filters.forEach((e) => {
        if (e.checked) {
          filteredData = data.filter((item) => {
            return item.brand == e.value;
          });
        }
      });
      if (item) {
        if (!item.start_price) {
          filteredData = filteredData.filter((items) => {
            return items.price >= item.end_price;
          });
        } else {
          filteredData = filteredData.filter((items) => {
            return (
              items.price >= item.start_price && items.price < item.end_price
            );
          });
        }
      }
      if (searchBar.value) {
        filteredData = filteredData.filter((item) => {
          return (
            item.name.toLowerCase() === searchBar.value.toLowerCase().trim()
          );
        });
      }
      renderData(filteredData);
      console.log(filteredData, "object");
    });
}
function renderPrice() {
  const priceDiv = document.createElement("div");
  priceDiv.className = "priceFilter";
  priceData.forEach((item) => {
    const anchorLink = document.createElement("a");
    anchorLink.className = "priceLink";
    if (!item.start_price) {
      anchorLink.innerHTML = `over ${item.end_price}`;
    } else {
      anchorLink.innerHTML = `${item.start_price}- ${item.end_price}`;
    }
    anchorLink.addEventListener("click", () => {
      getFilterData(item);
    });
    priceDiv.appendChild(anchorLink);
    filterDiv.append(priceDiv);
  });
}

function renderFilterRadio(data) {
  data.forEach((item) => {
    const radioInput = document.createElement("input");
    const radioLabel = document.createElement("label");
    radioInput.type = "radio";
    radioInput.name = "brand";
    radioInput.value = item;
    radioInput.className = "brand-radio";
    radioLabel.htmlFor = "brand";
    radioLabel.innerText = item;
    radioInput.addEventListener("click", () => {
      getFilterData();
    });
    filterDiv.appendChild(radioInput);
    filterDiv.appendChild(radioLabel);
  });
}
