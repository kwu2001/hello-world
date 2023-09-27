/*
Invoice product sales data
*/

// Product Data

// Product 1
let item1 = 'Gillette Sensor 3 Razor';
let quantity1 = 2;
let price1 = 1.23;

// Product 2
let item2 = 'Barbasol Shaving Cream';
let quantity2 = 1;
let price2 = 2.64;

// Product 3
let item3 = 'Nautica Cologne';
let quantity3 = 1;
let price3 = 6.17;

// Product 4
let item4 = 'Rubbing Alcohol';
let quantity4 = 3;
let price4 = 0.98;

// Product 5
let item5 = 'Colgate Classic Toothbrush';
let quantity5 = 12;
let price5 = 1.89;

// Compute extended prices
let extended_price1 = quantity1 * price1;
let extended_price2 = quantity2 * price2;
let extended_price3 = quantity3 * price3;
let extended_price4 = quantity4 * price4;
let extended_price5 = quantity5 * price5;

//Overall Subtotal 
let subtotal = extended_price1 + extended_price2 + extended_price3 + extended_price4 + extended_price5;

//Tax Rate
let tax_rate = 0.0575;
let tax = tax_rate * subtotal;

//Grand Total 
grand_total = tax + subtotal

