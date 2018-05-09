var priceFilterHTML = '';
var colorFilterHTML = '';
var contentHTML = '';
var isFilterLoaded = false;
var isContentLoaded = false;
var filteredContent = [];

// Global variable which are actually used
var products = [];
var totalProductCount = [];
var checkedValues = [];
// Global variable which are actually used
function loadFilterSection() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(' this after---------------- ', JSON.parse(this.response));
      isFilterLoaded = !isFilterLoaded;
      localStorage.setItem("filterData", this.response);
      var filterData = JSON.parse(this.response);
      if(isFilterLoaded){
        for(var i=0; i<filterData.filters.length; i++){
          if(filterData.filters[i].type == 'PRICE'){
            priceFilterHTML += '<div>'
            priceFilterHTML += '<label>"'+filterData.filters[i].type+'"</label>';
            priceFilterHTML += '<select id="minPrice" onChange="handlePriceFilter()">';

            for(var j=0; j<filterData.filters[i].values.length; j++){
                priceFilterHTML += '<option value="'+filterData.filters[i].values[j].key+'">'+filterData.filters[i].values[j].key+'</option>';
            }
            priceFilterHTML += '</select>';

            priceFilterHTML += ' to '
            priceFilterHTML += '<select id="maxPrice"  onChange="handlePriceFilter()">';
            for(var j=0; j<filterData.filters[i].values.length; j++){
              if(j !=0){
                priceFilterHTML += '<option value="'+filterData.filters[i].values[j].key+'">'+filterData.filters[i].values[j].key+'</option>';
              }
            }
            priceFilterHTML += '</select>'
            priceFilterHTML += '</div>'
          } else if(filterData.filters[i].type == 'COLOUR'){
            for(var j=0; j<filterData.filters[i].values.length; j++){
                colorFilterHTML += '<label><input type="checkbox" name="mushrooms" onChange="handleColorFilter()" value="'+filterData.filters[i].values[j].title+'" /> '+filterData.filters[i].values[j].title+'</label>';
            }
            document.getElementById('colorFilterArea').innerHTML = colorFilterHTML

          }

        }
        document.getElementById('priceFilterArea').innerHTML = priceFilterHTML;
      }
    }
  };

  if(localStorage.getItem("filterData")){
    console.dir('Filter Section Loading from localStorage...');
    loadFilterAreaLocal(localStorage.getItem("filterData"))
  } else {
    // do api call if data is not stored
    xhttp.open("GET", "http://demo1853299.mockable.io/filters", true);
    xhttp.send();
  }
}



function loadContent() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('apiError').innerHTML = ''
      isContentLoaded = !isContentLoaded;
      localStorage.setItem("filteredContent", this.response);
      filteredContent = JSON.parse(this.response);
      document.getElementById('heading').innerHTML = filteredContent.products.length;
      console.log(' filteredContent---------------- ', filteredContent);
      if(isContentLoaded){
        products = filteredContent.products;
        totalProductCount = products;
        for(var i=0; i<filteredContent.products.length; i++){
            contentHTML += '  <div class="column nature">\
                <div class="content">\
                  <img src="'+filteredContent.products[i].image+'" alt="Mountains" style="width:100%">\
                  <h4>'+filteredContent.products[i].title+'</h4>\
                  <p>'+filteredContent.products[i].rating+'*</p>\
                  <p>Rs. '+filteredContent.products[i].price.final_price+'</p>\
                </div>\
              </div>'
        }
        document.getElementById('row').innerHTML = contentHTML;
        filterSelection("all")
      }
    }
  };

  if(localStorage.getItem("filteredContent")){
    console.dir('Product Content Loading from localStorage...');
    loadFromLocal(localStorage.getItem("filteredContent"))
  } else {
    // do api call if data is not stored
    xhttp.open("GET", "http://demo1853299.mockable.io/products", true);
    xhttp.send();
  }
}

function loadFromLocal(data){
  filteredContent = JSON.parse(data);
  document.getElementById('heading').innerHTML = filteredContent.products.length;
    products = filteredContent.products;
    totalProductCount = products;
    for(var i=0; i<filteredContent.products.length; i++){
        contentHTML += '  <div class="column nature">\
            <div class="content">\
              <img src="'+filteredContent.products[i].image+'" alt="Mountains" style="width:100%">\
              <h4>'+filteredContent.products[i].title+'</h4>\
              <p>'+filteredContent.products[i].rating+'*</p>\
              <p>Rs. '+filteredContent.products[i].price.final_price+'</p>\
            </div>\
          </div>'
    }
    document.getElementById('row').innerHTML = contentHTML;
    filterSelection("all")
}

function loadFilterAreaLocal(data){
  var filterData = JSON.parse(data);
    for(var i=0; i<filterData.filters.length; i++){
      if(filterData.filters[i].type == 'PRICE'){
        priceFilterHTML += '<div>'
        priceFilterHTML += '<label>"'+filterData.filters[i].type+'"</label>';
        priceFilterHTML += '<select id="minPrice" onChange="handlePriceFilter()">';

        for(var j=0; j<filterData.filters[i].values.length; j++){
            priceFilterHTML += '<option value="'+filterData.filters[i].values[j].key+'">'+filterData.filters[i].values[j].key+'</option>';
        }
        priceFilterHTML += '</select>';

        priceFilterHTML += ' to '
        priceFilterHTML += '<select id="maxPrice"  onChange="handlePriceFilter()">';
        for(var j=0; j<filterData.filters[i].values.length; j++){
          if(j !=0){
            priceFilterHTML += '<option value="'+filterData.filters[i].values[j].key+'">'+filterData.filters[i].values[j].key+'</option>';
          }
        }
        priceFilterHTML += '</select>'
        priceFilterHTML += '</div>'
      } else if(filterData.filters[i].type == 'COLOUR'){
        for(var j=0; j<filterData.filters[i].values.length; j++){
            colorFilterHTML += '<label><input type="checkbox" name="mushrooms" onChange="handleColorFilter()" value="'+filterData.filters[i].values[j].title+'" /> '+filterData.filters[i].values[j].title+'</label>';
        }
        document.getElementById('colorFilterArea').innerHTML = colorFilterHTML

      }

    }
    document.getElementById('priceFilterArea').innerHTML = priceFilterHTML;
}


function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    // removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}
//
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function handleColorFilter(){
  console.log('color type');
  checkedValues = $('input:checkbox:checked').map(function() {
      return this.value;
  }).get();
  console.log('checkedValues',checkedValues);
  filterUserColorSelection(checkedValues)
}

function filterUserColorSelection(arr){
  var filteredData = [];
  if(arr.length){
    products.filter(function(itm) {
      if(arr.indexOf(itm.colour.title) >= 0){
        filteredData.push(itm)
      }
    });
    renderContent(filteredData);
  } else {
    products = totalProductCount;
    // handlePriceFilter();
  }
  renderContent(filteredData);
}

function handlePriceFilter(){
  var filteredData = [];
  var minPrice = $( "#minPrice option:selected" ).text();
  var maxPrice = $( "#maxPrice option:selected" ).text();
  var arr = products;
  if(products.length == 0){
    arr = totalProductCount;
  }
  if(minPrice && maxPrice){
    arr.filter(function(itm) {
      if(itm.price.final_price <= maxPrice && itm.price.final_price >= minPrice){
        filteredData.push(itm)
      }
    });
  } else if(maxPrice){
    arr.filter(function(itm) {
      if(itm.price.final_price <= maxPrice){
        filteredData.push(itm)
      }
    });
  } else if(minPrice){
    arr.filter(function(itm) {
      if(itm.price.final_price >= minPrice){
        filteredData.push(itm)
      }
    });
  } else {
    console.log('do nothign');
  }
  renderContent(filteredData);
}



function renderContent(arr){
  // var arr = products;
  console.log('actual filtered products ',products);
  products = arr;
  console.log('arr:- ', arr);
  contentHTML = "";
  document.getElementById('heading').innerHTML = arr.length
  for(var i=0; i<arr.length; i++){
      contentHTML += '  <div class="column nature">\
          <div class="content">\
            <img src="'+arr[i].image+'" alt="Mountains" style="width:100%">\
            <h4>'+arr[i].title+'</h4>\
            <p>'+arr[i].rating+'*</p>\
            <p>Rs. '+arr[i].price.final_price+'</p>\
          </div>\
        </div>'
  }
  document.getElementById('row').innerHTML = contentHTML;
  filterSelection("all")
}

function handleSearch(){
  var filteredData = [];
  console.log(document.getElementById('searchTerm').value);
  var searchVal = document.getElementById('searchTerm').value;
  var str = searchVal;
    str = new RegExp(str, 'i');
  if(searchVal){
    products.filter(function(itm) {
      if (itm.brand.match(str)) {
          filteredData.push(itm);
      }
    });
  } else {
    filteredData = products;
  }
  renderContent(filteredData);
}

function handleApiCall(){
  loadFilterSection();
  loadContent();
}
