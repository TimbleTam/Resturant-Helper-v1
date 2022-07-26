//prefab of string used throughout this script to add, identify and remove from local storage values
const ranking_value_prefab = 'resturant ranked:';


//Python code used to randomly select resturant
//use this as ref for picking algo
/*
for i in range(len(list)):
    for j in range (0, list[i].quality):
        res_list.append(list[i].name)

print(res_list[randrange(0, len(res_list))])
*/


function add_resturant(name: string, quality: number) {
    
    let ranking_value = ranking_value_prefab + quality.toString();



    localStorage.setItem(name, quality.toString());
}

class resturant_item {
    res_name: string;

    ranking: number;

    constructor(name: string, quality: number) {
        this.res_name = name;
        this.ranking = quality;
    }

}


class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }
}


//pulls all the items from local storage that contain the ranking value prefab and adds them to a list
function pick_resturant(){


    let list = new List<resturant_item>();


    for (let i = 0; i < localStorage.length; i++) {
        let evaluated: string = localStorage[i];
        
        if (evaluated.includes(ranking_value_prefab))
        {
             = evaluated.split(ranking_value_prefab.charAt(ranking_value_prefab.length)).pop;
        }

        list.add()

    }
    

}
