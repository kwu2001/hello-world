//store name 
const store_name = "Kailan Wu"; 
let first_name = "Kailan";
let last_name = "Wu";
let header_name = "<span style='font-size: 80px; font-weight: bold;'>" + first_name + "</span> <span style='font-size: 80px; font-style: italic;'>" + last_name + "'s</span>";

top_title.innerHTML=(header_name);

//item rotate 
function changeClassName(element) {
    if(element.className =='item'){
        element.className = 'item rotate';
        spins=spins+1;
    } 

    if(spins<2*hits&&hits<spins){
        //wins=true;
        over_half=true;
    } else{
        //wins=false;
    }
    win_span.innerHTML = over_half;
    spins_span.innerHTML = spins;
    hit_spin_span.innerHTML=(hits/spins).toFixed(2);
    // -- Winning progress depends on hits/spins
    let hits_spins_ratio = hits/spins;
    let progress;
    
    if (hits_spins_ratio >= 0.5 && hits<spins) {
            progress = 'You win!';
    } else if (hits_spins_ratio >= 0.25) {
        progress = 'Almost there!';
    } else if (hits_spins_ratio > 0) {
        progress = 'On your way!';
    } else {
        progress = 'Get going!';
    }
    win_span.innerHTML = progress;
}    
//item
function resetClassName(element) {
    if(element.className=='item rotate'){
        element.className = 'item';
        hits=hits+1;
    } else {
        changeClassName(element);
    }

    if(spins<2*hits&&hits<spins){
        //wins=true;
        over_half=true;
    } else{
        //wins=false;
    }
    win_span.innerHTML = over_half;
    hits_span.innerHTML = hits;
    hit_spin_span.innerHTML=(hits/spins).toFixed(2);
    // -- Winning progress depends on hits/spins
    let hits_spins_ratio = hits/spins;
    let progress;
    /*if ( hits_spins_ratio > 0 ) {
        progress = 'On your way!';
        if ( hits_spins_ratio >= 0.25 ) {
            progress = 'Almost there!';
            if ( hits_spins_ratio >= 0.5 ) {
                if( hits < spins) { 
                    progress = 'You win!';
                }
            }
        }
    }
    else {
        progress = 'Get going!' ;
    }*/
    if (hits_spins_ratio >= 0.5 && hits<spins) {
            progress = 'You win!';
    } else if (hits_spins_ratio >= 0.25) {
        progress = 'Almost there!';
    } else if (hits_spins_ratio > 0) {
        progress = 'On your way!';
    } else {
        progress = 'Get going!';
    }
    win_span.innerHTML = progress;
}

//hits and spins
let hits= 0;
let spins= 0;  
//let wins;
let over_half=false;
hits_span.innerHTML = hits; 
spins_span.innerHTML = spins;

//item, price, image
let name1 = "HTC";
let price1 = 40.00;
let image1 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/HTC.jpg";

let name2 = "Apple";
let price2 = 75.00;
let image2 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/iphone-3gs.jpg";

let name3 = "Nokia";
let price3 = 35.00;
let image3 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/Nokia.jpg";

let name4 = "Samsung";
let price4 = 45.00;
let image4 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/Samsung.jpg";

let name5 = "Blackberry";
let price5 = 10.00;
let image5 = "http://dport96.github.io/ITM352/morea/080.flow-control-II/Blackberry.jpg";

//loop
for (let i=1; eval("typeof name"+i) != 'undefined'; i++) {
    document.querySelector('.main').innerHTML += `
    <section class="item" 
    onmouseover="changeClassName(this);" onclick="resetClassName(this);">
    <h2>${eval("name"+i)}</h2>
    <p>$${eval("price"+i)}</p>
    <img src="${eval("image"+i)}" />
    </section> `;
}

//footer
let line = 1;
let line2 = 2;
let line3 = 3;
let now = new Date();
let currentYear = now.getFullYear();
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();
let hours = (currentHours + 11) % 12 + 1;
let minutes = currentMinutes.toString().padStart(2, '0');
let ampm = hours < 12 ? 'PM' : 'AM';
let initials = `${first_name[0]}.${last_name[0]}.`;


bottom_title.innerHTML=(`
<table border="1" style="margin-left: auto; margin-right: auto; text-align: center;">
        <tbody>
            <tr>
                <th colspan="2"><h1>Your One Stop For Used Phones - ${initials}'s</h1></th>
            </tr>
            <tr>
                <td>${line}.</td>
                <td>Copyright @ ${first_name} ${last_name}</td>
            </tr>
            <tr>
                <td>${line2}.</td>
                <td>${currentYear}</td>
            </tr>
            <tr>
                <td>${line3}.</td>
                <td>${hours}:${minutes} ${ampm}</td>
            </tr>
        </tbody>
    </table>`);


  