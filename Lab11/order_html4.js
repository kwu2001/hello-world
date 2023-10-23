function updateQuantityMessage(textbox) {
    let quantityMessage=document.getElementById('qty_textbook_message');
    let validationMessage = validateQuantity(Number(textbook.value));

    if (validationMessage !=="") {
        quantityMessage.innerHTML = validationMessage;
    } else {
            quantityMessage.innerHTML = textbook.value;
        }
}




//case here
switch (true) {

}





function displayPurchaes() {
    let quantity = Number(document.getElementById('qty_textbox').value);
    let validationMessage = validateQuantity(quantity);

    if (validationMessage == "") {
        let message = `Thank you for ordering ${quantity} things!`;
        document.body.innerHTML = message;
    } else {
        alert(validationMessage + " Please enter a positive interger for quantity.")
        document.getElementById('qty_textbox').value="";
    }
}