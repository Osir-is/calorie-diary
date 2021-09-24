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
    
    //UI Controller
const UICrtl = (function () {
    const UISelectors = {
      itemList: "#item-list",
      listItems: "#item-list li",
      addBtn: ".add-btn",
      updateBtn: ".update-btn",
      deleteBtn: ".delete-btn",
      backBtn: ".back-btn",
      clearBtn: ".clear-btn",
      itemNameInput: "#item-name",
      itemCaloriesInput: "#item-calories",
      totalCalories: ".total-calories",
    };
   // public method
   return {
    populateItemList: function (items) {
      let html = "";
      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
              <strong>${item.name}</strong> - <em>${item.calories} calories</em>
              <a href=3"" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    clearEditState: function () {
      UICrtl.clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem(item) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}</strong> - <em>${item.calories} calories</em>
      <a href=3"" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i></a>`;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInputs: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    statusList: function (status) {
      document.querySelector(UISelectors.itemList).style.display = status;
    },
    updateTotCalories: function (totalCal) {
      document.querySelector(UISelectors.totalCalories).innerHTML = totalCal;
    },
    addItemToForm: function () {
      const currentItem = mealItemCntrl.getCurrentItem();
      document.querySelector(UISelectors.itemNameInput).value =
        currentItem.name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        currentItem.calories;
      UICrtl.showEditState();
    },
    updateListItem: function (item) {
      const listItems = document.querySelectorAll("#item-list li");
      const listItemsConvert = Array.from(listItems);
      listItemsConvert.forEach((li) => {
        const liID = li.getAttribute("id");
        if (liID === `item-${parseInt(item.id)}`) {
          li.innerHTML = `
            <strong>${item.name}</strong> - <em>${item.calories} calories</em>
            <a href=3"" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },
    removeLiItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    removeAllItems: function () {
      const items = document.getElementById("item-list");
      items.innerHTML = "";
    },
  };
})();

//App Controller
const App = (function (mealItemCntrl, StorageCtrl, UICrtl) {
    //load event listener
    const loadEventListeners = function () {
      const UISelectors = UICrtl.getSelectors();
  
      //add item event
      document
        .querySelector(UISelectors.addBtn)
        .addEventListener("click", itemAddSubmit);
  
      //Edit icon click event
      document
        .querySelector(UISelectors.itemList)
        .addEventListener("click", itemEditClick);
  
      // Update one item
      document
        .querySelector(UISelectors.updateBtn)
        .addEventListener("click", itemUpdateSubmit);
  
      // Return to list adding
      document
        .querySelector(UISelectors.backBtn)
        .addEventListener("click", function (e) {
          UICrtl.clearEditState();
          e.preventDefault();
        });
          //Delte one item
    document
    .querySelector(UISelectors.deleteBtn)
    .addEventListener("click", deleteItem);

  document
    .querySelector(UISelectors.clearBtn)
    .addEventListener("click", clearAllItem);

  document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      return false;
    }
  });
};

 //add item submit
 const itemAddSubmit = function (e) {
    //Get form input from UICtrl
    const input = UICrtl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = mealItemCntrl.addItem(input.name, input.calories);

      //add item to the UI
      UICrtl.addListItem(newItem);

      //Get total calorie
      const totalCal = mealItemCntrl.getTotCalories();

      //Update calorie.
      UICrtl.updateTotCalories(totalCal);

      // made list appeared
      UICrtl.statusList("block");

      //store in localStorage
      StorageCtrl.storeItem(newItem);

      //clear input fields
      UICrtl.clearInputs();
    }

    e.preventDefault();
  };