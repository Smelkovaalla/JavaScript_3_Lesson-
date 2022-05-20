class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    };
    setAvailable (dAvailable) {
        this.available = dAvailable;
    };
};

class GoodsList {
    #goods = [];
    constructor(goods, filterWord, sortPrice, sortDir) { 
        this.#goods = goods;        
        this.filterWord = filterWord;
        this.sortDir = sortDir === undefined ? false: sortDir;
        this.sortPrice = sortPrice === undefined ? false: sortPrice;
    };
    get list() {
        let result = [];
        let regexp = new RegExp(`${this.filterWord}`);
        for (let i = 0; i < this.#goods.length; i++) {
            let marker =  regexp.test(this.#goods[i].name);
            if (marker === true) {
                result.push(this.#goods[i]);
            };

        }
        if(!this.sortPrice) {
            return result;
        }
        if(this.sortDir) {
            return result.sort((elem_1, elem_2) => elem_1.price - elem_2.price);
        }
        return result.sort((elem_1, elem_2) => elem_2.price - elem_1.price);
    };
    add(good) {
        this.goods.push(good);
    }
};

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    };
};

class Basket {
    constructor(goods) {
        this.goods = [goods];
    };
};


function main() {
    let goods = [
        new Good(00001, 'Рубашка', 'Нарядная, мужская', [50,52,54], 5000, true),
        new Good(00002, 'Рубашка', 'Повседневная, мужская', [50,52,54], 3000, true),
        new Good(00003, 'Платье', 'Нарядное, женское', [44,46,48], 9300, true),
        new Good(00004, 'Платье', 'Повседневная, женское', [44,46,48], 5000, true),
        new Good(00005, 'Брюки', 'Нарядные, мужские', [50,52,54], 2500, true),
    ];


    let goodsList = new GoodsList(goods, 'Платье', true, true);


    console.log("goodsList.list", goodsList.list);

    let basketGood = [
        new BasketGood(goods[0], 1),
        new BasketGood(goods[3], 2),
        new BasketGood(goods[4], 1),
    ];
    // console.log(basketGood);  

};


main(); 

// node 3.1_index