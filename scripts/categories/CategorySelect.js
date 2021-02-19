import { getCategories, useCategories } from "./CategoryProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".filter__category")

let categories = []

//gets categories from API to create select menu -------------------------------------------
export const CategorySelect = () => {
  getCategories()
  .then(() => {
    categories = useCategories()
    render()
  })
}

//renders category select menu to DOM-------------------------------------------------------
const render = () => {
  //iterates through categories and puts each in an <option>
  contentTarget.innerHTML = `
      <select class="dropdown" id="categorySelect">
          <option value="0">All baked goods...</option>
          ${categories.map(category => `<option value="${category.id}">${category.name}</option>`).join("")}
      </select>
  `
}

//listens for "categorySelct", grabs value, and dispatches event-------------------------------
eventHub.addEventListener("change", changeEvent => {
  //checks if "categorySelect" button was changed
  if (changeEvent.target.id === "categorySelect") {
    //grabs value of target
    const categoryCustomEvent = new CustomEvent("categorySelected", {
      detail: {
        selectedCategory: changeEvent.target.value
      }
    })
    //dispatches value of detail to eventHub 
    eventHub.dispatchEvent(categoryCustomEvent)
  }
})
