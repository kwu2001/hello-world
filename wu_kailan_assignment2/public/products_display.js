// Get query string data
const params = new URLSearchParams(window.location.search);

// Execute function when window loads
window.onload = () => {
    // Define variable for amount sold from query string
    const sold = JSON.parse(params.get("amountSold"));

    // Check if there are any errors in query string
    if (params.has("errorsJSONstring")) {
        // Parse error object from query string
        const errorsObject = JSON.parse(params.get("errorsJSONstring"));

        // REQUIRED If no quantity selected error, update purchase button text
        if (typeof errorsObject["noQuantities"] != "undefined") {
            document.getElementById("purchase_button").value = errorsObject.noQuantities;
            alert(`There are no items selected. Please select an Item`)
        } else {
            // Alert user of invalid quantities
            alert("Invalid quantities! Please enter a non-negative integer");

// Iterate through products and update quantity textboxes and error messages
for (let i in products) {
    // Get quantity textbox and value from query string
    const qtyTextbox = qtyForm[`quantity${i}`];
    const qtyValue = params.get(`quantity${i}`);

    // If invalid quantity error, update textbox and error message
    if (errorsObject[`quantity${i}_error`]) {
        const errorMessage = errorsObject[`quantity${i}_error`];
        qtyTextbox.style.border = "2px solid red";
        qtyTextbox.style.borderRadius = "10px";
        qtyTextbox.value = qtyValue;
        document.getElementById(`quantity${i}_errors_span`).innerHTML = errorMessage;
        document.getElementById("purchase_button").value = "Invalid quantity!";
    }

    //If quantity unavailable error, update textbox, error message, and purchase button text
                    // IR 3: change textbox to red if requested quantity is more than whats available, and also text.
                    if (errorsObject[`quantity${i}_available_error`]) {
                        const errorMessage = errorsObject[`quantity${i}_available_error`];
                        qtyTextbox.style.border = "2px solid red";
                        qtyTextbox.style.borderRadius = "10px";
                        qtyTextbox.value = products[i].quantity_available;
                        document.getElementById(`quantity${i}_errors_span`).innerHTML = errorMessage;
                        document.getElementById("purchase_button").value = "Quantity unavailable!";
                    }
                }
            }
        }
    };

 // Function to dynamically generate product sections
 function generateProductSections() {
    var productContainer = document.getElementById('productContainer');

    // array gotten from product_data.js
    // tracks quantity sold
    for (i = 0; i < products.length; i++) {
        var productSection = document.createElement('section');
        productSection.className = 'py-5';

        productSection.innerHTML = `
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${products[i].image}" alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">Number Sold: ${products[i].quantity_sold}</div>
                        <div class="small mb-1">Number Available: ${products[i].quantity_available}</div>
                        <h1 class="display-5 fw-bolder">${products[i].item}</h1>
                        <div class="fs-5 mb-5">
                            <span>$${products[i].price}</span>
                        </div>
                        <div class="d-flex">
                            <label id="quantity${[i]}_label">Quantity Desired:</label>
                            <input type="text" name="quantity${[i]}" placeholder="0">
                            <span class="errors-span" id="quantity${i}_errors_span" style="color:red"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        productContainer.appendChild(productSection);
    }
}

// Call the function to generate product sections
generateProductSections();

