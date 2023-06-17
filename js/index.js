
let productRow = document.getElementById("productList");

async function getProducts() {
  let url = "https://crud.teamrabbil.com/api/v1/ReadProduct";

  let res = await axios.get(url);

  if (res.status === 200) {
    let data = res.data["data"];
    data.forEach((item) => {
      productRow.innerHTML += `<tr>
        <td>${item["ProductName"]}</td>
          <td>${item["ProductCode"]}</td>
          <td>${item["_id"]}</td>
          <td>${item["UnitPrice"]}</td>
          <td>${item["Qty"]}</td>
          <td>${item["TotalPrice"]}</td>
          <td><button onclick="deleteItem('${item["_id"]}')">Delate</button></td>
          <td><button>Update</button></td>
      </tr>`;
    });
  } else {
    productRow.innerHTML = "Error";
  }
}
getProducts();
// Delrte Item asynchronously

async function deleteItem(id) {
  let url = `https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`;
  let res = await axios.get(url);
  if (res.status === 200) {
    productRow.innerHTML = "";
    await getProducts();
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