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
    update_resturants_tabs(5);
}

function add_member() {
    localStorage.setItem(member_value_prefab, person_count + 1);
    person_count = Number(localStorage.getItem(member_value_prefab));
    update_member_display(5);
}

function remove_member() {
    localStorage.setItem(member_value_prefab, person_count - 1);
    person_count = Number(localStorage.getItem(member_value_prefab));
    update_member_display(5);
}

function update_member_display(ranking_value) {
    member_counter.innerText = person_count;
    slider_holder.innerHTML = "";

    for (var i = 0; i < person_count; i++) {
        const new_tag = document.createElement("label");
        new_tag.innerText = "Person " + (i + 1);
        slider_holder.appendChild(new_tag);
        const new_mem = document.createElement("input");
        new_mem.type = "range";
        new_mem.min = 0;
        new_mem.max = 100;
        new_mem.value = ranking_value;
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

    let total_rank = 0;

    for (let i = 0; i < slider_holder.childElementCount; i++) {
        if (slider_holder.children[i].classList.contains("member-rank") == true) {
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

    name.value = null;
    update_member_display(5);
    update_resturants_tabs();
}

function clear_resturants() {
    if (window.confirm("you are about to delete all your ranking history in Restrntr. Are you Sure?") == true) {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) != member_value_prefab) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
        window.alert("resturants cleared");
        update_resturants_tabs();
    }
}

function update_resturants_tabs() {
    const container = document.getElementById("resturant-tab-container");
    container.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) != member_value_prefab) {
            let res_name = localStorage.key(i);
            let res_val = localStorage.getItem(localStorage.key(i));
            if (res_val.includes(ranking_value_prefab)) {
                res_val = Number(
                    res_val
                        .split(
                            ranking_value_prefab.charAt(
                                ranking_value_prefab.length - 1
                            )
                        )
                        .pop()
                );
            }
            create_resturant_tab(res_name, res_val);
        }
    }
}

function create_resturant_tab(name, ranking) {
    const container = document.getElementById("resturant-tab-container");
    const new_box = document.createElement("div");
    new_box.className = "resturant-tab";
    const res_name = document.createElement("h1");
    res_name.className = "resturant-tab-name";
    res_name.innerText = name;
    const res_val = document.createElement("input");
    res_val.type = "range";
    res_val.min = 0;
    res_val.max = 100;
    res_val.value = ranking;
    res_val.disabled = true;
    res_val.className = "resturant-tab-value";
    res_val.innerText = ranking.toString();
    const edit_but = document.createElement("button");
    edit_but.className = "edit-resturant-tab";
    edit_but.innerHTML = "edit";
    edit_but.addEventListener("click", () => {
        enable_edit_resturant(name, ranking);
    });
    const delete_but = document.createElement("button");
    delete_but.className = "delete-resturant-tab";
    delete_but.innerHTML = "Delete";
    delete_but.addEventListener("click", () => {
        if (window.confirm("you are about to delete all ranking history of " + name + ". Are you sure you want to do that?") == true) {
            localStorage.removeItem(name);
            update_resturants_tabs();
        }
    });

    new_box.appendChild(res_name);
    new_box.appendChild(res_val);
    new_box.appendChild(edit_but);
    new_box.appendChild(delete_but);
    container.appendChild(new_box);
}

function enable_edit_resturant(resturant_name, rank_value) {
    const name = document.getElementById("resturant-name");
    name.value = resturant_name;
    update_member_display(rank_value);
}
