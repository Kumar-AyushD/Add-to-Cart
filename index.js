import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-database-104c8-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB = ref(database, "shoppingLiist")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(shoppingListinDB, inputValue)

    clearInputfieldEl()
})

onValue(shoppingListinDB, function (snapshot) {
    if (snapshot.exists()) {
        let ItemsArray = Object.entries(snapshot.val())

        clearShoppinglistEl()
        for (let i = 0; i < ItemsArray.length; i++) {
            let currentItem = ItemsArray[i]
            let currentItemId = ItemsArray[0]
            let currentItemValue = ItemsArray[1]

            appendItemToShoppingListEl(currentItem)
        }
    }else{
        shoppingListEl.innerHTML = "No items here....yet"
    }

})
function clearShoppinglistEl() {
    shoppingListEl.innerHTML = ""
}
function clearInputfieldEl() {
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(item) {
    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingLiist/${itemId}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}