//product quantities
let product_quantities = [2,1,1,1,1];


// array of all products
// corresponds to product_quantities array
// product_quantities[i] is the quantity for products[i]
products = [
    { 'name': 'small gumball', 'price': 0.02 },
    { 'name': 'medium gumball', 'price': 0.05 },
    { 'name': 'large gumball', 'price': 0.07 },
    { 'name': 'small jawbreaker', 'price': 0.06 },
    { 'name': 'large jawbreaker', 'price': 0.10 }
   ];


//table
document.write("<table>");
//document.write("<tr><th>Products #</th><th>Quantity</th></tr>");
document.write("<tr><th>Product #</th><th>Name</th><th>Price</th><th>Quantity</th><th>Extended Cost</th></tr>");

//loop
for (let i=0; i < product_quantities.length; i++) {
    let quantity = product_quantities[i];
    let product = products[i];
    let extended_cost = quantity * product.price;
//creating a new row for each product
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${i + 1}</td>
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>${quantity}</td>
    <td>${extended_cost.toFixed(2)}</td>
    `;
    //append
    document.querySelector('table').appendChild(newRow);

    newRow.addEventListener('mouseover', function () {
        newRow.style.backgroundColor = 'yellow';
    });

    newRow.addEventListener('mouseout', function () {
        newRow.style.backgroundColor = '';
    });

    newRow.addEventListener('click', function() {
        document.querySelector('table').deleteRow(newRow.rowIndex);
    });
}


//button to add row
let addButton = document.createElement('button');
addButton.textContent = 'Add New Row';
addButton.addEventListener('click', addNewRow);
document.body.appendChild(addButton);


//newrow
function addNewRow () {
    let table = document.querySelector('table');
    let newRow = table.insertRow();
    newRow.innerHTML = `
    <td> blank </td>
    <td> blank </td>
    <td> blank </td>
    <td> blank </td>
    <td> blank </td>
    `;
    newRow.addEventListener('mouseover', function() {
        newRow.style.backgroundColor = 'yellow';
    });

    newRow.addEventListener('mouseout', function() {
        newRow.style.backgroundColor = '';
    });

    newRow.addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex);
    });
};

//function to delete the last row 
function deleteClickedRow() {
    let table = document.querySelector('table');
    let rowCount = table.rows.length; 
    
    if (rowCount > 1) {
        table.deleteRow(rowCount-1);
    };
}
