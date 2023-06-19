
let productRow = document.getElementById("productList");

// Read All Product from restAPI
async function getProduct(){
  let url = "https://crud.teamrabbil.com/api/v1/ReadProduct";
  let res = await axios.get(url);
  if(res.status === 200){
    let datas = res.data["data"];
    datas.forEach(items => {
      productRow.innerHTML += `<tr>
        <td>${items["ProductName"]}</td>
        <td>${items["ProductCode"]}</td>
        <td>${items["UnitPrice"]}</td>
        <td>${items["Qty"]}</td>
        <td>${items["TotalPrice"]}</td>
        <td><button onclick="deleteProduct('${items["_id"]}')">Delete</button></td>
        <td><button>Update</button></td>
      </tr>`
    });
  }
}
getProduct();

// Create Product n restAPI
async function createProduct(){
  let ProductName = document.getElementById("productName").value;
  let productCode = document.getElementById("productCode").value;
  let productImg = document.getElementById("productImg").value;
  let unitPrice = document.getElementById("unitPrice").value;
  let qty = document.getElementById("qty").value;
  let totalPrice = document.getElementById("totalPrice").value;

  let url = "https://crud.teamrabbil.com/api/v1/CreateProduct";
  let res = await axios.post(url,
    {
      Img           : productImg,
      ProductCode   : productCode,
      ProductName   : ProductName,
      Qty           : qty,
      TotalPrice    : totalPrice,
      UnitPrice     : unitPrice,
      }
    );
  if (res.status === 200) {
    window.location = "index.html"
  } else {
    
  }
}

// delete product From RestAPI
async function deleteProduct(id){
  let url = `https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`;
  let res = await axios.get(url)
  if (res.status === 200) {
    productRow.innerHTML = "";
    await getProduct();
  } else {
    alert("Error")
  }
}

