// BUDGET CONTROLLER
let budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItem: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
    }

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            // Create new ID 
            if (data.allItem[type].length > 0) {
                ID = data.allItem[type][data.allItem[type].length - 1].id + 1;
            }
            else ID = 0;

            // Create new item base on type 'inc' or 'exp' 
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }
            else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it to the data structure
            data.allItem[type].push(newItem);

            // Return the new element
            return newItem;
        },

        testing: function () {
            console.log(data);
        }
    }

})();

// UI CONTROLLER
let UIController = (function () {

    let DOMstrings = {
        inputType: '.add__type',
        inputDes: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //either inc or exp
                description: document.querySelector(DOMstrings.inputDes).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        addListItem: function (obj, type) {
            let html, newHTML, element;

            // Create a HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder with data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            // Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        clearFields: function () {
            let fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDes + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(current =>  current.value = '');
            fieldsArr[0].focus();
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();

// GLOBAL APP CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {

    let setupEventListener = function () {
        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    let ctrlAddItem = function () {
        let input, newItem;

        //1.get field input data
        input = UICtrl.getInput();

        //2. add the item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //3. add the new item to ui 
        UICtrl.addListItem(newItem, input.type);

        //4. clear the field
        UICtrl.clearFields();
        //5. calculate the budget 

        //6. display the budget on the ui 


    }

    return {
        init: function () {
            console.log('init started');
            setupEventListener();
        }
    }

})(budgetController, UIController);

controller.init();


