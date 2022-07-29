//prefab of string used throughout this script to add, identify and remove from local storage values
const ranking_value_prefab = "resturant ranked:";
let person_count = 0;
const member_value_prefab = "members";
const member_counter = document.getElementById("member-amount");
const slider_holder = document.getElementById("rank-sliders");

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
        const new_mem = document.createElement("input");
        new_mem.type = "range";
        new_mem.min = 0;
        new_mem.max = 100;
        new_mem.value = 50;
        new_mem.className = "member-rank";
        new_mem.id = "resturant-rank";
        slider_holder.appendChild(new_mem);
        
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

    total_rank = Number(total_rank);
    let ranking_value = ranking_value_prefab + total_rank.toString();
    localStorage.setItem(name.value, ranking_value);
    console.log(
        "added res with name of " +
            name.value +
            " and a quality ranking of: " +
            ranking_value
    );

    name.value = null;
    update_member_display();
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
        if (localStorage.getItem(localStorage.key(i)).includes(ranking_value_prefab) == true) {
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
    new_box.name = "resturant-tab";
    
    const res_name = document.createElement("h1");
    res_name.className = "resturant-tab-name";
    res_name.innerText = name;

    const res_include = document.createElement("input");
    res_include.type = "checkbox";
    res_include.name = "resturant-tab-include";
    res_include.className = "resturant-tab-include";

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
    new_box.appendChild(res_include);
    container.appendChild(new_box);
}

function enable_edit_resturant(resturant_name) {
    const name = document.getElementById("resturant-name");
    name.value = resturant_name;
    update_member_display();
}

let person_counter = 1;
let resturant_counter = 1;
let person_iterations;
let resturant_iterations;
let resturant_names = [];
let selections = [];

function begin_resturant_review() {
    person_counter = person_count;
    person_iterations = 0;
    resturant_names = [];
    resturant_counter = 0;
    resturant_iterations = 0;

    const tabs = document.getElementsByClassName("resturant-tab");
    
    for (let i = 0; i < tabs.length; i++) {
        if(tabs[i].lastChild.checked == true) {
            for (let j = 0; j < tabs[i].childNodes[1].value; j++) {
            selections.push(tabs[i].firstChild.innerText);
            }
            resturant_names.push(tabs[i].firstChild.innerText);
            resturant_counter = resturant_counter + 1;   
        }        
    }

    window.alert("person count: " + person_counter + "  resturant count = " + resturant_counter.toString() + " resturant names = " + resturant_names);
    resturant_iterations = 0;

    for (let i = person_counter; i > 0; i--) {
        for (let j = 0; j < resturant_names.length; j++) {
            generateResturantReview(resturant_names[j], i);
        }
        generateResturantReviewIndicator(i);
    }
}

function generateResturantReviewIndicator(person) {
    const container = document.getElementById("rest-review-container");
    const new_box = document.createElement("div");
    new_box.className = "person-input-page";
    new_box.name = "person-input-page";
    
    const person_id = document.createElement("h1");
    person_id.className = "person-name";
    person_id.innerText = "Pass This Device to Person  " + person.toString();

    const submit_review = document.createElement("button");
    submit_review.className = "edit-resturant-tab";
    submit_review.innerHTML = "okay";
    submit_review.addEventListener("click", () => {
        dismiss_page();
    });
    
    new_box.appendChild(person_id);
    new_box.appendChild(submit_review);
    container.appendChild(new_box);
}

function generateResturantReview(name, person) {
    const container = document.getElementById("rest-review-container");
    const new_box = document.createElement("div");
    new_box.className = "person-input-page";
    new_box.name = "person-input-page";
    
    const person_id = document.createElement("h1");
    person_id.className = "person-name";
    person_id.innerText = "Person " + person.toString();

    const res_name = document.createElement("h1");
    res_name.className = "res-name";
    res_name.innerText = name;

    const res_val = document.createElement("input");
    res_val.type = "range";
    res_val.min = 0;
    res_val.max = 100;
    res_val.value = 50;
    res_val.className = "this-person-rating";

    const submit_review = document.createElement("button");
    submit_review.className = "sumit-my-resturant-review";
    submit_review.innerHTML = "submit";
    submit_review.addEventListener("click", () => {
        submit_my_review(name);
    });
    
    new_box.appendChild(person_id);
    new_box.appendChild(res_name);
    new_box.appendChild(res_val);
    new_box.appendChild(submit_review);
    container.appendChild(new_box);
}


function submit_my_review(res_name) {

    const container = document.getElementById("rest-review-container");
    const value_box = container.lastChild;

    let times = value_box.childNodes[2].value;

    for (var i = 0; i < times; i++) {
    selections.push(res_name);
    }

    for (var i = 0; i < selections.length; i++) {
    console.log(selections[i]);
    }

    console.log(selections.length);
    container.removeChild(container.lastChild);

    if(container.children.length <= 0) {
        create_resturant_randomizer();
    }
}

function dismiss_page() {
    const container = document.getElementById("rest-review-container");
    container.removeChild(container.lastChild);
}

function create_resturant_randomizer() {
    let pick = Math.random() * (selections.length - 1);
    pick = Math.round(pick);
    localStorage.setItem("final_selection_1", selections[pick]);

    let pick2 = Math.random() * (selections.length - 1);
    pick2 = Math.round(pick2);
    localStorage.setItem("final_selection_2", selections[pick2]);

    let pick3 = Math.random() * (selections.length - 1);
    pick3 = Math.round(pick3);
    localStorage.setItem("final_selection_3", selections[pick3]);
    
    let pick4 = Math.random() * (selections.length - 1);
    pick4 = Math.round(pick4);
    localStorage.setItem("final_selection_4", selections[pick4]);
}