
let productRow = document.getElementById("productList");

async function getProducts() {
  document.getElementById('loader').classList.remove("d-none")
  let url = "https://crud.teamrabbil.com/api/v1/ReadProduct";
  let res = await axios.get(url);
  document.getElementById("loader").classList.add("d-none")
  if (res.status === 200) {
    let data = res.data["data"];
    data.forEach((item) => {
      productRow.innerHTML += `<tr>
        <td>${item["ProductName"]}</td>
          <td>${item["ProductCode"]}</td>
          <td>${item["UnitPrice"]}</td>
          <td>${item["Qty"]}</td>
          <td>${item["TotalPrice"]}</td>
          <td><button onclick="deleteItem('${item["_id"]}')">Delate</button></td>
          <td><button onclick = "updateProduct('${item["_id"]}')">Update</button></td>
      </tr>`;
    });
  } else {
    productRow.innerHTML = "Error";
  }
}
getProducts();


// Delete Item asynchronously
async function deleteItem(id) {
  let url = `https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`;
  let res = await axios.get(url);
  if (res.status === 200) {
    productRow.innerHTML = "";
    await getProducts();
  }
}

// Update Product by id
async function updateProduct(id){
  window.location = `update.html?id=${id}`
}


// Get Product Details
fileExestingData();
async function fileExestingData(){
  let urlParms = new URLSearchParams(window.location.search);
  let id = urlParms.get('id');
  let url = `https://crud.teamrabbil.com/api/v1/ReadProductByID/${id}`;
  let res = await axios.get(url);
  if(res.status ===200){
    let items = res.data['data'][0]
    console.log(items);
    document.getElementById("productName").value = items["ProductName"];
    document.getElementById("productCode").value = items["ProductCode"];
    document.getElementById('productImg').value=items['Img'];
    document.getElementById("unitPrice").value = items["UnitPrice"];
    document.getElementById("qty").value = items["Qty"];
    document.getElementById("totalPrice").value = items["TotalPrice"];
    document.getElementById("productId").value = items["_id"];
  }
}

// Update Products Info
async function updateData(){
  let productId = document.getElementById("productId").value;
  let productName = document.getElementById("productName").value;
  let productCode = document.getElementById("productCode").value;
  let productImg = document.getElementById("productImg").value;
  let unitPrice = document.getElementById("unitPrice").value;
  let qty = document.getElementById("qty").value;
  let totalPrice = document.getElementById("totalPrice").value;

  let url = `https://crud.teamrabbil.com/api/v1/UpdateProduct/${productId}`
  let res = await axios.post(url,
    {
      Img         : productImg,
      ProductCode : productCode,
      ProductName : productName,
      Qty         : qty,
      TotalPrice  : totalPrice,
      UnitPrice   : unitPrice
      }
    );
    if(res.status === 200){
      window.location = "index.html"
    }else{
      alert("error")
    }
}
// Create a new product
async function createProduct(){
  let productName = document.getElementById("productName").value;
  let productCode = document.getElementById("productCode").value;
  let productImg = document.getElementById("productImg").value;
  let unitPrice = document.getElementById("unitPrice").value;
  let qty = document.getElementById("qty").value;
  let totalPrice = document.getElementById("totalPrice").value;
  let url = "https://crud.teamrabbil.com/api/v1/CreateProduct";
  document.getElementById("loader").classList.remove('d-none');
  let res = await axios.post(url,
    {
      Img         : productImg,
      ProductCode : productCode,
      ProductName : productName,
      Qty         : qty,
      TotalPrice  : totalPrice,
      UnitPrice   : unitPrice
      }
    )
  document.getElementById("loader").classList.add("d-none");
  if(res.status === 200){
    window.location = "index.html"
  }else{
    alert("error")
  }
}












// for(let i=0; i<=data.length; i++){
//             productRow.innerHTML += `
//     <tr>
//         <td>${data[i]['ProductName']}</td>
//         <td>${data[i]['ProductCode']}</td>
//         <td>${data[i]['UnitPrice']}</td>
//         <td>${data[i]['Qty']}</td>
//         <td>${data[i]['TotalPrice']}</td>
//         <td> <button>Delate</button></td>
//         <td> <button>Update</button></td>
//     </tr>
//     `
// }

//     for(let item of data){
//         productRow.innerHTML += `<tr>
//             <td>${item['ProductName']}</td>
//             <td>${item['ProductCode']} and ${
//                 item["_id"]}</td>
//             <td>${item['UnitPrice']}</td>
//             <td>${item['Qty']}</td>
//             <td>${item['TotalPrice']}</td>
//             <td><button onclick="deleteItem('${item['_id']}')">Delate</button></td>
//             <td> <button>Update</button></td>
//         </tr>`
//     }

// }