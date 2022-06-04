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
        totalCalories:0
    }

    return {
        retrieveData: function() {
            return data;
        },
        getData: function() {
            return data.items; 
        }
    }
})();


/* 
 *  UserInterfaceController is an implementation of 
 *   Module Pattern in JavaScript for the 
 *   fatSecret app. 
 */
const UserInterfaceController = (function(){        
    return {
        populateItemList: function(foodItems) {
            let htmlElements = '';
            foodItems.forEach(function(foodItem) {
                htmlElements += `<li class="collection-item" id="item-${foodItem.id}">
                <strong>${foodItem.name} </strong> <em>${foodItem.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a></li>`;
            });
            document.querySelector('#item-list').innerHTML = htmlElements;
        }
    }

})();


/* 
 *  ApplicationController is an implementation of 
 *   Module Pattern in JavaScript for the 
 *   fatSecret app. It controls the other two 
 *   controllers. 
 */

const ApplicationController = (function(ItemController, UserInterfaceController){

    return {
        init: function() {
            
            console.log("Launching Application ...");
            
            

            const foodItems = ItemController.getData();   
            
            console.log(foodItems);

            // fill the list with items 
            UserInterfaceController.populateItemList(foodItems);

        }
    }
})(ItemController, UserInterfaceController);  

ApplicationController.init();
