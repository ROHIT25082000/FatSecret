// Below are the IIFE 
// IIFE (Immediately Invoked Function Expression) 

/*
 * @author Rohit Vishwakarma
 * email : rv021561@gmail.com
 * /

/* 
 *  ItemController is an implementation of 
 *   Module Pattern in JavaScript for the 
 *   fatSecret app. 
 */
const ItemController = (function(){
    const Item = function(id, name, calories) {
        this.id = id; 
        this.name = name; 
        this.calories = calories; 
    } 
    // State ..  
    const data = {
        items:[
            { id : 0, name: 'Dinner', calories: 1200 },
            { id : 1, name: 'Lunch', calories: 1000 }, 
            { id : 2, name: 'Breakfast', calories: 1000}
        ],
        currentName:null,
        totalCalories: 3200
    }   

    return {
        retrieveData: function() {
            return data;
        },
        getData: function() {
            return data.items; 
        },
        getCalories: function() {
            return data.totalCalories;
        },
        // The controller will here add the item into the data. 
        addFoodItem: function(name, calories) {
            let id; 
            let curr_length = data.items.length; 
            if(curr_length > 0) {
                id = data.items[curr_length - 1].id + 1; // could have done just used the length but that wouldn't work.
                // items were to be deleted . 
            }else {
                id = 0; 
            }
            newItem = new Item(id, name, parseInt(calories)); 
            data.currentName = newItem.name;
            data.totalCalories += newItem.calories;  
            data.items.push(newItem); 
            // Now the item is added.
            return newItem;
        },
        clearFoodItem: function() {
            data.items.length = 0;
            data.totalCalories = 0;
        }

    }
})();


/* 
 *  UserInterfaceController is an implementation of 
 *   Module Pattern in JavaScript for the 
 *   fatSecret app. 
 */
const UserInterfaceController = (function(){        
    
    const UISelector = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        clearBtn: '.clear-btn',
        totalCalories: '.total-calories'
    }

    
    return {
        populateItemList: function(foodItems, totalCalories) {
            let htmlElements = '';
            foodItems.forEach(function(foodItem) {
                htmlElements += `<li class="collection-item" id="item-${foodItem.id}">
                <strong>${foodItem.name} </strong> <em>${foodItem.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a></li>`;
            });
            document.querySelector(UISelector.itemList).innerHTML = htmlElements;
            document.querySelector(UISelector.totalCalories).innerHTML = totalCalories;
        },
        getSelectors: function() {
            return UISelector;
        },
        getItemInput : function() {
            return {
                name: document.querySelector(UISelector.itemNameInput).value,  
                calories: document.querySelector(UISelector.itemCaloriesInput).value
            }
        }, 
    }

})();


/* 
 *  ApplicationController is an implementation of 
 *   Module Pattern in JavaScript for the 
 *   fatSecret app. It controls the other two 
 *   controllers. 
 */

const ApplicationController = (function(ItemController, UserInterfaceController){

    const loadEventListener = function() {
        const UISelectorList = UserInterfaceController.getSelectors();
        document.querySelector(UISelectorList.addBtn).addEventListener('click', addFoodItem); 
        document.querySelector(UISelectorList.clearBtn).addEventListener('click', clearFoodItem); 
    }

    function clearFoodItem(e) { 
        ItemController.clearFoodItem();
        UserInterfaceController.populateItemList(ItemController.getData(), ItemController.getCalories());
        e.preventDefault(); 
    }

    function addFoodItem(e) {
        // Get Info from the form ..  
        const inputFields = UserInterfaceController.getItemInput();
        if(inputFields.name != '' && inputFields.calories != '') {
            const addedItem = ItemController.addFoodItem(inputFields.name, inputFields.calories);
            UserInterfaceController.populateItemList(ItemController.getData(), ItemController.getCalories());
        }
        e.preventDefault();
    }

    
    
    return {
        init: function() {
            console.log("Launching Application ...");
            const foodItems = ItemController.getData();   
            const calories = ItemController.getCalories();
            console.log(foodItems);
            // fill the list with items 
            UserInterfaceController.populateItemList(foodItems, calories);
            loadEventListener();
        }
    }
})(ItemController, UserInterfaceController);  

ApplicationController.init();

