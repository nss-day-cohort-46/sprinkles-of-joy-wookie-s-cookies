import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

let bakeryProducts = []
let bakeryCategories = []

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(() => {
      bakeryProducts = useProducts()
      bakeryCategories = useCategories()
      render(bakeryProducts)
    })
}

//takes an array of bakery products
const render = (arrayOfBakeryProducts) => {
  //maps over each bakery product to find the category associated with that product
  contentTarget.innerHTML = arrayOfBakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)
    //returns HTML of each product with info about it and the category it is associated with
    return Product(product, productCategory)
  }).join("")
}


//Listens for a selection on the category dropdown
eventHub.addEventListener("categorySelected", Event => {
  //Runs when certain category is selected. Filters all of the bakery products down to the ones that have the corresponding categoryId to the selection.
  if (Event.detail.selectedCategory !== 0) {
    const allBakeryProducts = useProducts()
    const filteredProducts = allBakeryProducts.filter(product => product.categoryId === Event.detail.selectedCategory)
    //sends the filted products to get rendered to ProductList.
    render(filteredProducts)
  }
})