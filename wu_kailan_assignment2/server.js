// Importing the products data from a JSON file and storing it in a variable called products
let products = require(__dirname + '/products.json');
// Importing the Express framework
let express = require('express');
// Creating a new instance of Express called app
let app = express();

// Importing the querystring package to parse POST requests
let querystring = require("querystring");


//assignment 2 add here 
let user_data;


const fs = require('fs');
const filename = __dirname + '/user_data.json';
if (fs.existsSync(filename)) {
   let data=fs.readFileSync(filename, 'utf-8');
   user_data = JSON.parse(data);
   console.log(user_data);
} else {
   console.log(`${filename} does not exist.`);
   user_data = {};
}


// Using middleware to parse the POST request body
app.use(express.urlencoded({ extended: true }));

// Middleware to monitor all requests and log them to the console
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// adapted from xin lin & professor port's office hour
// Route to send product data as a JavaScript when reqested as '/product_data.js'
app.get('/product_data.js', (request, response) => {
   response.type('.js');
   const products_str = `let products = ${JSON.stringify(products)};`;
   response.send(products_str);
});


// process purchase request (validate quantities, check quantity available) - adapted from Prof Port& Monica Mau Office hour example
app.post("/process_purchase", function (request, response, next) {
   // output the data in the request body (quantities) to the console
   console.log(request.body);

   // Create an empty errors object
   let errors = {};
   // Set a boolean flag for whether any quantity was entered
   let hasQty = false;
   // Set a boolean flag for whether any input was entered
   let hasInput = false;

   // Loop through all products
   for (let i in products) {
      // Get the quantity of the current product from the request body and set to qty
      let qty = request.body[`quantity${i}`];
      // If the quantity is greater than zero, set the hasQty and hasInput flags to true
      if (qty > 0) {
         hasQty = true;
         hasInput = true;
      }
      // If no quantity was entered, set it to zero
      if (qty == "") {
         qty = 0;
      }
      // If the quantity is not a non-negative integer, add an error message to the errors object
      if (findNonNegInt(qty) == false) {
         errors[`quantity${i}_error`] = findNonNegInt(qty, true).join("<br>");
         hasInput = true;
      }
      // If the quantity requested is greater than the quantity available, add an error message to the errors object
      if (qty > products[i].quantity_available) {
         errors[`quantity${i}_available_error`] = `We don't have ${qty} available!`;
         hasInput = true;
      }
   }

   // If no items were selected, add an error message to the errors object
   if (hasQty == false && hasInput == false) {
      errors[`noQuantities`] = `Please choose some items to purchase!`;
   }

   // Log the contents of the errors object to the console
   console.log(errors);

   // If there are no errors, update the product data to reflect the purchase, and redirect to the invoice page with the quantities in the query string
   if (Object.keys(errors).length === 0) {
      for (i in products) {
         products[i].quantity_available -= request.body[`quantity${i}`];
         // IR 1 - Tracking the total quantity of each item sold
         products[i].quantity_sold += Number(request.body[`quantity${i}`]);
      }
      response.redirect("./invoice.html?" + querystring.stringify(request.body));
   }
   // If there are errors, redirect back to the order page and display the errors in the query string
   else {
      request.body["errorsJSONstring"] = JSON.stringify(errors);
      // back to the order page and putting errors in the querystring
      response.redirect(
         "./products_display.html?" + querystring.stringify(request.body)
      );
   }
});

// function to find if a number is a non negative integer, and if not, output errors
function findNonNegInt(q, returnErrors = false) {
   //the function returns non-negative integers in the object.
   errors = []; // assume no errors at first
   if (Number(q) != q) errors.push("Not a number!"); // Check if string is a number value
   if (q < 0) errors.push("Negative value!"); // Check if it is non-negative
   if (parseInt(q) != q) errors.push("Not an integer!"); // Check that it is an integer

   return returnErrors ? errors : errors.length == 0;
}

// route all other GET requests to files in public
app.use(express.static(__dirname + "/public"));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));