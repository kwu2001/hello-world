//store name 
const store_name = "Kailan Wu"; 
let first_name = "Kailan";
let last_name = "Wu";
let header_name = "<span style='font-size: 80px; font-weight: bold;'>" + first_name + "</span> <span style='font-size: 80px; font-style: italic;'>" + last_name + "'s</span>";

top_title.innerHTML=(header_name);

//item rotate and rotate 
function changeClassName(element) {
    element.className = 'item rotate';
    spins_span.innerHTML = spins++; 
    if(spins<2*hits&&hits<spins){
        over_half=true;
    } else{
        //wins=false;
    }
    win_span.innerHTML = over_half;
    spins_span.innerHTML = spins;
    hit_spin_span.innerHTML=(hits/spins).toFixed(2);
}

function resetClassName(element) {
    element.className = 'item';
    hits_span.innerHTML = hits++;
    if(spins<2*hits&&hits<spins){
        over_half=true;
    } else{
        //wins=false;
    }
    win_span.innerHTML = over_half;
    hits_span.innerHTML = hits;
    hit_spin_span.innerHTML=(hits/spins).toFixed(2);
}

//hits and spins
let hits= 0;
let spins= 0;  
//let wins;
let over_half=false;
hits_span.innerHTML = hits; 
spins_span.innerHTML = spins;


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