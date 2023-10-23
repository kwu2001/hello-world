let params = (new URL(document.location)).searchParams;
let quantity = params.get("qty_textbook");

let message = `Thank you for order ${quantity} things!`
document.body.innerHTML = message