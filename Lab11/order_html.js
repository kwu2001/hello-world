function updateQuantityMessage(textbox) {
    let quantityMessage=document.getElementById('qty_textbook_message');
    let validationMessage = validateQuantity(Number(textbook.value));

    if (validationMessage !=="") {
        quantityMessage.innerHTML = validationMessage;
    } else {
            quantityMessage.innerHTML = textbook.value;
        }
}