/*
Invoice product sales data
*/
import { itemData, quantity } from "./products_data.js";
let subtotal = 0;
let tax_rate = 0.0575;
let taxAmount = 0;
let total = 0;
let shippingCharge = 0;

generateItemRows();
if (subtotal <= 50) {
    shippingCharge = 2;
} else if (subtotal <= 100) {
    shippingCharge = 5; 
} else {
    shippingCharge = subtotal * 0.05;
}

taxAmount = subtotal*tax_rate;
total = subtotal + taxAmount + shippingCharge;

//Subtotal
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
//Tax
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
//Shipping
document.getElementById('shipping_cell').innerHTML = '$' + shippingCharge.toFixed(2);
//Grand Total
document.getElementById('grandtotal_cell').innerHTML = '$' + total.toFixed(2);

function validateQuantity(quantity) {
    if (isNaN(quantity)) {
        return "Not a Number";
    } else if (quantity < 0 && !Number.isInteger(quantity)) {
        return "Negative inventory and not an Integer"
    } else if (quantity < 0) {
        return "Negative inventory";
    } else if (!Number.isInteger(quantity)) {
        return "Not an Integer";
    } else {
        return ""; 
    }
}

function generateItemRows() {
    let table = document.getElementById('invoiceTable')
    table.innerHTML = '';
    let hasErrors = false;

    for (let i = 0; i < itemData.length; i++) {
        let item = itemData[i];
        let itemQuantity = quantity[item.quantityIndex];
        let validationMessage = validateQuantity(itemQuantity);

    if (validationMessage !== "") {
        hasErrors = true;
        let row = table.insertRow();
        row.insertCell(0).innerHTML = item.brand;
        row.insertCell(1).innerHTML = validationMessage;
    } else if (itemQuantity > 0) {
        let extendedPrice = item.price * itemQuantity;
        subtotal += extendedPrice; 

        let row = table.insertRow(); 
        row.insertCell(0).innerHTML = item.brand;
        row.insertCell(1).innerHTML = itemQuantity
        row.insertCell(2).innerHTML = '$' + item.price.toFixed(2);
        row.insertCell(3).innerHTML = '$' + extendedPrice.toFixed(2);
        
        
    }
    }
    if (!hasErrors) {
        document.getElementById('total_cell').innerHTML = '$' + total.toFixed(2);
    }
}