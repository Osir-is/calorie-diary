//calorie intake storage 
const storageItem = (function () {
    // public methods
    return {
      storeItem: function (MealItem) {
        let mealTimes;
        //check if any mealTimes in local storage
        if (localStorage.getItem("mealTimes") === null) {
          mealTimes = [];
          //push new mealTimes
          mealTimes.push(MealItem);
          //set local storage
          localStorage.setItem("mealTimes", JSON.stringify(mealTimes));
        } else {
          mealTimes = JSON.parse(localStorage.getItem("mealTimes"));
          mealTimes.push(MealItem);
          localStorage.setItem("mealTimes", JSON.stringify(mealTimes));
        }
      },getItemFromStorage: function () {
        let mealTimes;
        if (localStorage.getItem("mealTimes") === null) {
          mealTimes = [];
        } else {
          mealTimes = JSON.parse(localStorage.getItem("mealTimes"));
        }
        return mealTimes;
      },
      updatemealTimestorage: function (updatedItem) {
        let mealTimes = JSON.parse(localStorage.getItem("mealTimes"));
        mealTimes.forEach((MealItem, index) => {
          if (updatedItem.id === MealItem.id) {
            mealTimes.splice(index, 1, updatedItem);
          }
        });
        localStorage.setItem("mealTimes", JSON.stringify(mealTimes));
      },
      deletemealTimestorage: function (itemToDeleteID) {
        let mealTimes = JSON.parse(localStorage.getItem("mealTimes"));
        mealTimes.forEach((MealItem, index) => {
          if (itemToDeleteID === MealItem.id) {
            mealTimes.splice(index, 1);
          }
        });
        localStorage.setItem("mealTimes", JSON.stringify(mealTimes));
      },
      removeAllmealTimes: function () {
        localStorage.removeItem("mealTimes");
      },
    };
  })();

  //Iten Controller for calorie tracker
const mealItemCntrl = (function () {
  //item Constructor
  const Item = function (name, calories) {
    this.id = id.next().value;
    this.calories = calories;
    this.name = name;
  };

  function* genID() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }
  const id = genID();

// Data Structure / State
const data = {
    items: StorageCtrl.getItemFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };
    //public methods
    return {
        getItems: function () {
          return data.items;
        },
        logData: function () {
          return data;
        },
        addItem: function (name, calories) {
          const newItem = new Item(name, parseInt(calories));
          data.items.push(newItem);
          return newItem;
        },
        getTotCalories: function () {
          let cal = 0;
          data.items.forEach((item) => {
            cal += item.calories;
          });
          data.totalCalories = cal;
          return data.totalCalories;
        },
        getItemByID: function (id) {
          let found = null;
          data.items.forEach((item) => {
            if (item.id === id) {
              found = item;
            }
          });
          return found;
        },
        updateItemByID: function (id, name, calories) {
          let updatedItem = null;
          data.items.forEach((item) => {
            if (item.id === id) {
              item.name = name;
              item.calories = parseInt(calories);
              updatedItem = item;
            }
          });
          return updatedItem;
        },
        setCurrentItem: function (item) {
          data.currentItem = item;
        },
        getCurrentItem: function () {
          return data.currentItem;
        },
        itemToBeDeleted: function (id) {
          //Get ids;
          const ids = data.items.map((item) => {
            return item.id;
          });
          const index = ids.indexOf(id);
    
          //Remove itme
          data.items.splice(index, 1);
        },
        clearAllItems: function () {
          data.items = [];
        },
      };
    })();
    
