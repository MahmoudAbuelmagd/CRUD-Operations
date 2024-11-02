
var productName = document.getElementById("prodName");
var productPrice = document.getElementById("prodPrice");
var productCat = document.getElementById("prodCat");
var productDes = document.getElementById("prodDes");
var prodImage = document.getElementById("prodImage");
var productSearch = document.getElementById("productSearch");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn")
var allInputs = document.querySelectorAll(".input")
var allProducts = [];
var imagePath;

if (localStorage.getItem("products") != null) { // has data => get then display 
  allProducts = JSON.parse(localStorage.getItem("products")); 
  displayProduct(allProducts);
} 

function addProduct() {
  if ( validate(productName) && validate(productPrice) &&validate(productCat) && validate(productDes)) {
    if (prodImage.files[0] == undefined) {
      imagePath = "iphone1.jfif";
    } else {
      imagePath = prodImage.files[0].name;
    }
    var product = {
      code: productName.value,
      price: productPrice.value,
      cat: productCat.value,
      des: productDes.value,
      image:`images/${imagePath}` ,
    }
    
    allProducts.push(product);
    displayProduct(allProducts);
    localStorage.setItem("products", JSON.stringify(allProducts)) // convert arr of objects to string
    clearForm();
    productName.classList.remove("is-valid")
    productPrice.classList.remove("is-valid")
    productCat.classList.remove("is-valid")
    productDes.classList.remove("is-valid")
  }
}
function clearForm(){
  productName.value = "";
  productPrice.value = "";
  productDes.value = "";
  productCat.value = "";
  prodImage.value = "";
}

function displayProduct(arr) {
  box = ``;
  for (var i = 0; i < arr.length; i++){
    box +=`  <div class="col-md-3 text-center text-white ">
              <div class="bg-secondary p-3">
                <img src=${arr[i].image} class="w-100" alt="">
                <h2> ${arr[i].code}</h2>
                <h2> ${arr[i].price}</h2>
                <h3> ${arr[i].des}</h3>
                <h3> ${arr[i].cat}</h3>
                <button onclick='deleteProduct(${i})' class="form-control btn btn-danger py-3"> DELETE PRODUCT</button>
                <button onclick='getProductData(${i})' class="form-control btn btn-outline-warning mt-3 py-3"> UPDATE PRODUCT</button>
              </div>
            </div>`
  }
  document.getElementById("demo").innerHTML = box;
}

function deleteProduct(term) {
  allProducts.splice(term, 1)
  displayProduct(allProducts);
  localStorage.setItem("products", JSON.stringify(allProducts))
}

function searchProduct() {
  var term = productSearch.value;
  var searchBox = [];
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].code.toLowerCase().includes(term.toLowerCase())) {
      searchBox.push(allProducts[i]);
    }
    displayProduct(searchBox);
  }
}

var clickedIndex;
function getProductData(index) {
  addBtn.classList.add("d-none")
  updateBtn.classList.remove("d-none")
  clickedIndex = index;
  productName.value = allProducts[index].code;
  productPrice.value = allProducts[index].price;
  productDes.value = allProducts[index].des;
  productCat.value = allProducts[index].cat;
  scrollToTop();
}


function updateProduct() {
  addBtn.classList.remove("d-none")
  updateBtn.classList.add("d-none")
  allProducts[clickedIndex].code = productName.value;
  allProducts[clickedIndex].price = productPrice.value;
  allProducts[clickedIndex].des = productDes.value;
  allProducts[clickedIndex].cat = productCat.value;
  //check if user add photo or not
  if (prodImage.files.length > 0) {
    allProducts[clickedIndex].image = "images/" + prodImage.files[0].name;
  }
  localStorage.setItem("products", JSON.stringify(allProducts)) 
  displayProduct(allProducts);
  clearForm();  
  scrollToBottom();
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}
function scrollToBottom() {
  window.scrollTo({
    top: 600,
    behavior: 'smooth'
  });
}

for (i = 0; i < allInputs.length; i++){
  allInputs[i].addEventListener('input', function (e) {
    validate(e.target);
  })
}


function validate(el) {
  var regex = {
    prodName: /^.{4,20}$/,
    prodPrice: /^[1-9][0-9]{1,5}/,
    prodCat: /^(tv|mobile|laptop|camera)$/i,
    prodDes:/.{4,30}/,
  }
  if (regex[el.id].test(el.value) == true) {
    el.classList.add("is-valid")
    el.classList.remove("is-invalid")
    el.nextElementSibling.classList.add("d-none")
    return true;
  } else {
    el.classList.add("is-invalid")
    el.classList.remove("is-valid")
    el.nextElementSibling.classList.replace("d-none", "d-block")
    // el.nextElementSibling.classList.remove("d-none")
    return false;
  }
}