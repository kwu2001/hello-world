function isNonNegInt(q, returnErrors = false) {
    let errors = []; // Assume no errors at first

    if (Number(q) !== q) {
        errors.push('Not a number!'); // Check if the string is a number value
    }

    if (q < 0) {
        errors.push('Negative value!'); // Check if it is non-negative
    }

    if (parseInt(q) !== q) {
        errors.push('Not an integer!'); // Check that it is an integer
    }

    return returnErrors ? errors : errors.length === 0;
}

/*f
unction checkIt(item, index) {
    console.log(`part ${index} is ${(isNonNegInt(item) ? 'a' : 'not a')} quantity`);
}
*/

let attributes = "Kailan; 22; MIS";
let pieces = attributes.split(";");
pieces.forEach((item, index) => {
    console.log(`part ${index} is ${(isNonNegInt(item) ? 'a' : 'not a')} quantity`);
});
