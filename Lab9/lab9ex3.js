
let attributes = "Kailan, 22; 22.5; -21.5";
let pieces = attributes.split(";");

for (let i = 0; i < pieces.length; i++) {
    console.log("Part " + i + ": " + pieces[i]);
    console.log("Data type: " + typeof pieces[i]);
}

let invertedString = pieces.join(",");
console.log(invertedString);