
const ranking_value_prefab = "resturant ranked:";
let person_count = 0;
const member_value_prefab = "members";
const member_counter = document.getElementById("member-amount");
const slider_holder = document.getElementById("rank-sliders");


const answer_text = document.getElementById("real-res");
const myth1 = document.getElementById("myth1");
const myth2 = document.getElementById("myth2");
const myth3 = document.getElementById("myth3");





window.onload = function () {
    pick_resturant();
};

function pick_resturant() {
    const list = [];

    for (let i = 0; i < localStorage.length; i++) {
        
        if(localStorage.key(i) != member_value_prefab){
        let evaluated = localStorage.getItem(localStorage.key(i));
        

        if (evaluated.includes(ranking_value_prefab)) {
            const val = Number(
                evaluated
                    .split(
                        ranking_value_prefab.charAt(ranking_value_prefab.length)
                    )
                    .pop()
            );
            const nam = localStorage.key(i);
            let interations = 0;
            interations = val.valueOf();
            for (let j = 0; j < interations; j++) {
                list.push(nam);
            }
        }
    }
    }

    let pick = Math.random() * (list.length - 1);

    pick = Math.round(pick);

    answer_text.innerText = list[pick];

    let pick2 = Math.random() * (list.length - 1);

    pick2 = Math.round(pick2);

    myth1.innerText = list[pick2];

    let pick3 = Math.random() * (list.length - 1);

    pick3 = Math.round(pick3);

    myth2.innerText = list[pick3];

    let pick4 = Math.random() * (list.length - 1);

    pick4 = Math.round(pick4);

    myth3.innerText = list[pick4];
    
}

