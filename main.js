//prefab of string used throughout this script to add, identify and remove from local storage values
const ranking_value_prefab = "resturant ranked:";
let person_count = 0;
const member_value_prefab = "members";
const member_counter = document.getElementById("member-amount");
const slider_holder = document.getElementById("rank-sliders");

//Python code used to randomly select resturant
//use this as ref for picking algo
/*
for i in range(len(list)):
    for j in range (0, list[i].quality):
        res_list.append(list[i].name)

print(res_list[randrange(0, len(res_list))])
*/

window.onload = function () {
    check_members();
};

function check_members() {
    if (localStorage.getItem(member_value_prefab) == null) {
        localStorage.setItem(member_value_prefab, 1);
    }
    const loaded_count = Number(localStorage.getItem(member_value_prefab));
    person_count = Number(loaded_count);
    update_member_display();
}

function add_member() {
    localStorage.setItem(member_value_prefab, person_count + 1);
    person_count = Number(localStorage.getItem(member_value_prefab));
    update_member_display();
}

function remove_member() {
    localStorage.setItem(member_value_prefab, person_count - 1);
    person_count = Number(localStorage.getItem(member_value_prefab));
    update_member_display();
}

function update_member_display() {
    member_counter.innerText = person_count;

    slider_holder.innerHTML = '';

    for (var i = 0; i < person_count; i++) {
        const new_tag = document.createElement("label");
        new_tag.innerText = "Person " + (i + 1);
        slider_holder.appendChild(new_tag);

        const new_mem = document.createElement("input");
        new_mem.type = "range";
        new_mem.min = 0;
        new_mem.max = 10;
        new_mem.value = 5;
        new_mem.className = "member-rank";
        new_mem.id = "resturant-rank";
        slider_holder.appendChild(new_mem);
    }

    slider_holder.child;

    if (person_count == 1) {
        document.getElementById("remove-member").disabled = true;
        document.getElementById("add-member").disabled = false;
    } else if (person_count == 10) {
        document.getElementById("remove-member").disabled = false;
        document.getElementById("add-member").disabled = true;
    } else {
        document.getElementById("remove-member").disabled = false;
        document.getElementById("add-member").disabled = false;
    }
}

function add_resturant() {
    const name = document.getElementById("resturant-name");
    const quality = document.getElementById("resturant-rank");

    if (name.value == "") {
        window.alert(
            "No Resturant Name was specified. Please select a Resturant Name"
        );
        name.value = null;
        return;
    }

    if (localStorage.getItem(name.value) != null) {
        window.alert(
            "You have already added this Resturant Before. Please select a new Resturant Name"
        );
        name.value = null;
        return;
    }

    let total_rank = 0;

    for (let i = 0; i < slider_holder.childElementCount; i++) {
        if (slider_holder.children[i].classList.contains('member-rank') == true) {
            total_rank = total_rank + Number(slider_holder.children[i].value);
        }
    }

    total_rank = Number(total_rank) / Number(person_count);

    let ranking_value = ranking_value_prefab + total_rank.toString();
    localStorage.setItem(name.value, ranking_value);
    console.log(
        "added res with name of " +
            name.value +
            " and a quality ranking of: " +
            ranking_value
    );
}

function clear_resturants() {
    for (let i = 0; i < localStorage.length; i++) {
        
        if(localStorage.key(i) != member_value_prefab){
        localStorage.removeItem(localStorage.key(i));
        }
    }
    window.alert("resturants cleared");
}

//pulls all the items from local storage that contain the ranking value prefab and adds them to a list
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

    window.alert(list[pick]);
}
