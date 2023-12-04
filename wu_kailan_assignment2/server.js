let crypto = require('crypto');

// A function to encrypt text
function encrypt(text) {
    encryptAlgo = crypto.createCipher('aes192', 'mySecretKey');
    let encryptedText = encryptAlgo.update(text, 'utf-8', 'hex');
    encryptedText += encryptAlgo.final('hex');
    return encryptedText;
}

// Importing the Express framework
let express = require('express');
// Creating a new instance of Express called app
let app = express();


// Importing the querystring package to parse POST requests
let querystring = require("querystring");
// Empty object to store user's inputs
let temp_info = {};
let user_status = [];
let user_data = {};

let fs = require('fs');
let filename = './user_data.json'
if (fs.existsSync(filename)) { // If the user data filename exists
    let data = fs.readFileSync(filename, 'utf-8');  
    let user_data = JSON.parse(data); 
    console.log(user_data);
    for (let i = 0; i < Object.keys(user_data).length; i++) { // For every user in the system
        if (user_data[Object.keys(user_data)[i]].status == "in") { // If the user is "in", push them to status array
            user_status.push(Object.keys(user_data)[i]);
        }
    }
    console.log(`Current users: ${user_status.length} - ${user_status}`); // Console log check
}

else { // If the file does not exist
    console.log(`filename + " does not exist`);
    user_status = {}; // Assume that user_data is 0
}


// Using middleware to parse the POST request body
app.use(express.urlencoded({ extended: true }));

// Middleware to monitor all requests and log them to the console
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

// Importing the products data from a JSON file and storing it in a variable called products
let products = require(__dirname + '/products.json');

// adapted from xin lin & professor port's office hour
// Route to send product data as a JavaScript when reqested as '/product_data.js'
app.get('/product_data.js', (request, response) => {
    response.type('.js');
    const products_str = `let products = ${JSON.stringify(products)};`;
    response.send(products_str);
});


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
        for (let i in products) {
            temp_info[`q${[i]}`] = Number(request.body[`quantity${i}`]);  // Store user's input into temp_info
        }

        // add temp_info to the request.query object
        Object.assign(request.query, temp_info)

        let params = new URLSearchParams(request.query); // Store temp_info in params

        // Check to see if user is logged or not through hidden input box that checks if hidden_email is in the request.body object.
        if (request.body['hidden_email']?.length > 0) {
            response.redirect('./invoice.html?' + params.toString() + '&valid'); // If user is logged in, redirect to invoice
        }
        else {
            response.redirect('./login.html?' + params.toString()); // If not, redirect to login page
        }
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

app.post('/process_login', function (request, response) {

    // Get the user's credentials
    email = request.body['email'].toLowerCase();
    password = request.body['password'];

    let encryptedPass = encrypt(password);

    // If both input boxes are empty
    if ((email.length == 0) && (password.length == 0)) {
        request.query.loginErr = 'Email and password fields cannot be empty.';
    }
    // If the email exists in the user_data file
    else if (email in user_data) {
        // Compare the inputted password with user's saved password
        if (user_data[email].password == encryptedPass) {

            // Temporarily store the user's name using their in log in credentials
            temp_info['email'] = email;
            temp_info['name'] = user_data[email].name;

            if (user_data[email].status == "out") { // If user's status is "out", change to "in" and push them to the status array
                // Update the user's status to loggedin
                user_data[email].status = "in";
                // Push the user's email to status
                user_status.push(email);
            }

            // Save the updated user_data to the user_data.json file
            fs.writeFileSync('user_data.json', JSON.stringify(user_data, null, 2));

            // Get the selected products from the query string
            let selectedProducts = {};
            for (let i in products) {
                let qtyKey = `q${i}`;
                if (request.query[qtyKey]) {
                    selectedProducts[qtyKey] = Number(request.query[qtyKey]);
                }
            }
            // Store the selected products in temp_info
            Object.assign(temp_info, selectedProducts);

            temp_info['users'] = user_status.length; // Count number of users are currently 'in'

            let params = new URLSearchParams(temp_info); // Format temp_info as URL parameters
            response.redirect('/invoice.html?' + params.toString() + `&valid`); // Redirect user to invoice 
            return;
        }
        // If the email was valid, but password was left blank
        else if (password.length == 0) {
            request.query.loginErr = 'Password field is empty.';
        }
        // If the password does not match with the user's data
        else {
            request.query.loginErr = 'Invalid password.';
        }
    }
    // If the email is not in the user_data file
    else {
        request.query.loginErr = 'Invalid email.'
    }

    // Return email input to make the input box sticky
    request.query.email = email;
    let params = new URLSearchParams(request.query);

    // Check to see if user is logged or not through hidden input box
    let loggedIn = request.body['hidden_email']?.length > 0;
    let redirectUrl = loggedIn ? '/invoice.html' : '/login.html';
    let queryParams = loggedIn ? (params.toString() + '&valid') : params.toString();

    response.redirect(`${redirectUrl}?${queryParams}`);
});

app.post('/process_register', function (request, response) {
    let regErrs = {}; // Assume no errorsat first

    // Get the request body input boxes 
    let name = request.body.name;
    let email = request.body.email.toLowerCase();
    let password = request.body.password;
    let con_password = request.body.con_password;

    // Name validation
    if (name.length == 0) {
        regErrs['name_length'] = 'Name is blank.'
    }
    else if ((name.length < 2) || (name.length > 30)) {
        regErrs['name_length'] = 'Name must be between 2 and 30 characters.'
    }
    if ((/^[a-zA-Z\s]+$/.test(name) == false) && (name.length != 0)) {
        // Make sure that the full name is made of letters and spaces
        regErrs['name_char'] = 'Names must only contain letter characters.';
    }

    // Email validation
    if (email.length == 0) {
        regErrs['email_length'] = 'Email is blank.';
    }
    // Email needs to be made up of any characters, numbers, and _ at the beginning
    // Email cannot have two consecutive special characters in a row
    // Email requires @
    // The domain name has to be 2 or 3 characters
    else if (/^\w+([.`!#$%^&*\-_+={}|'?/]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
        regErrs['email_char'] = 'Invalid email address.';
    }
    else if (user_data[email] != undefined) {
        regErrs['email_char'] = 'This email address is already registered to another user.';
    }

    if (password.length == 0) {
        regErrs['password_length'] = 'Password is blank.';
    }
    else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,_])[a-zA-Z0-9!@#$%^&*.,_]{8,}$/.test(password) == false) {
        regErrs['password_char'] = 'Password must be at least 8 characters long and include: <br> at least 1 lowercase letter, 1 uppercase letter, <br> 1 number, and 1 special character in (!@#$%^&*.,_)';
    }

    // Confirm password validation
    // Password confirmation to make sure that the re-entered password field is not empty
    if (con_password.length == 0) {
        regErrs['con_password_length'] = 'Confirmation is blank.';
    }
    // Password confirmation to make sure that the re-entered password matches with the first password input
    else if (con_password !== password) {
        regErrs['con_password_char'] = 'Passwords do not match.';
    }

    // If there are no input errors
    if (Object.keys(regErrs).length == 0) {
        // Create an object within the user_data object for the new user
        user_data[email] = {
            "name": name,
            "password": encrypt(password),
            "status": "out"
        };

        fs.writeFileSync(filename, JSON.stringify(user_data));

        // Update the user's status to loggedin
        if (user_data[email].status == "out") { // If user's status is "out", change to "in" and push them to the status array
            // Update the user's status to loggedin
            user_data[email].status = "in";
            // Push the user's email to status
            user_status.push(email);
        }
        console.log(`After registration, current users: ${user_status.length} - ${user_status}`); // Console log check for registered users

        // Add the user's information into the temp_info object so it can display on invoice
        temp_info['name'] = name;
        temp_info['email'] = email;
        temp_info['users'] = user_status.length;

        let params = new URLSearchParams(temp_info);
        response.redirect('/invoice.html?success&' + params.toString() + `&valid`);
    }
    // If there was an input error, make the user stay on the registration page and display error messages
    else {
        let params = new URLSearchParams(request.body);
        response.redirect('/register.html?' + params.toString() + '&' + querystring.stringify(regErrs));
    }

});


app.post('/process_logout', function (request, response) {
    let email = request.body.hidden_email.toLowerCase();
    user_status.splice(user_status.indexOf(email), 1);
    user_data[email].status = "out";

    // Update the product data to reflect the purchase
    // Update the product data to reflect the purchase
    for (let i in products) {
        let qty = Number(temp_info[`q${i}`]);
        if (!isNaN(qty)) {
            // Subtract the selected quantity from the inventory
            products[i].quantity_available -= qty;
            products[i].quantity_sold += qty;
        } else {
            console.error(`Error updating product ${i}: Invalid quantity ${request.body[`q${i}`]}`);
        }
    }
    // Write updated user data back to file
    fs.writeFileSync('user_data.json', JSON.stringify(user_data));
    console.log(`After logging out, current users: ${user_status.length} - ${user_status}`); // Console log check for status users after logging out

    // Remove the user's information from temp_info
    delete temp_info['email'];
    delete temp_info['name'];
    delete temp_info['users'];

    // If the user logs out, take them back to the index
    // I sent them back to products_display instead of login because if they are sent to login, there won't be any items selected yet
    response.redirect('/products_display.html?');
})

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