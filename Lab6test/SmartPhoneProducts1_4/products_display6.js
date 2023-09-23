const store_name = "Kailan Wu";

document.write(store_name + "'s Used Smart Phone Store");

        function changeClassName(element) {
            element.className = 'item rotate';

        }

        function resetClassName(element) {
            element.className = 'item';

        }

let hits= 0;
let spins= 0;
let wins;

if(spins<2*hits) {
    wins=true;
}
else {
    wins=false;
}
win_span.innerHTML=wins;

hits_span.innerHTML = hits;
spins_span.innerHTML = spins;

