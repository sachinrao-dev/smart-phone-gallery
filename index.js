const filterDiv = document.getElementById('brand-filter')
const filters = document.getElementsByName('brand')
const contentDiv = document.getElementById('content')
const searchBar = document.getElementById('searchBar')

initial();

function filterItems() {
  contentDiv.innerHTML = ''
  filters.forEach((e) => {
    if(e.checked) {
      fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      const newData = data.filter((item) => {
        return item.brand == e.value})
      renderData(newData)
    });
    }
  })
}

function initial() {
  filterDiv.innerHTML= ''
  contentDiv.innerHTML = ''
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      const uniqueBrand = [...new Set(data.map((item) => item.brand))];
      renderData(data);
      renderFilterRadio(uniqueBrand);
    });
}

function renderData(data) {
  contentDiv.innerHTML= ""
    if(data.length){
      data.forEach((item) => {
        const dataDiv = document.createElement('div')
        dataDiv.className = "data"
        const img = document.createElement('img')
        img.height = "200"
        img.width = "200"
        img.src = item.img
        img.alt = "No image"
        const nameDiv = document.createElement('div')
        nameDiv.innerText = `Name : ${item.name}`
        const brandDiv = document.createElement('div')
        brandDiv.innerText = `Brand : ${item.brand}`
        const priceDiv = document.createElement('div')
        priceDiv.innerText = `Price: ${item.price}`
        dataDiv.appendChild(img)
        dataDiv.appendChild(nameDiv)
        dataDiv.appendChild(brandDiv)
        dataDiv.appendChild(priceDiv)
        contentDiv.appendChild(dataDiv)
      })
    } else {
      const dataDiv = document.createElement('div')
      dataDiv.className = "data"
      dataDiv.innerHTML = "NO Data Available"
      contentDiv.appendChild(dataDiv)
    }
}

function renderFilterRadio(data) {
  data.forEach((item) => {
    const radioInput = document.createElement('input')
    const radioLabel = document.createElement('label')
    radioInput.type = "radio"
    radioInput.name = "brand"
    radioInput.value = item
    radioInput.className = "brand-radio"
    radioLabel.htmlFor = "brand"
    radioLabel.innerText = item
    filterDiv.appendChild(radioInput);
    filterDiv.appendChild(radioLabel);
  })
}