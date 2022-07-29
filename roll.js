
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
    

    answer_text.innerText = localStorage.getItem("final_selection_1");



    myth1.innerText = localStorage.getItem("final_selection_2");



    myth2.innerText = localStorage.getItem("final_selection_3");


    myth3.innerText = localStorage.getItem("final_selection_4");
    
    person_amount = Number(localStorage.getItem("members"));

    for (var i = 0; i < person_amount; i++) {
    add_little_man();
    }

}


function add_little_man()
{
    const container = document.getElementById("funny-man-holder");
    const new_man = document.createElement("img");
    new_man.id = "funny-little-man";
    new_man.src = "Funny Little Man.png";

    container.appendChild(new_man);
}

