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

const render = (arrayOfBakeryProducts) => {
  contentTarget.innerHTML = arrayOfBakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)
    return Product(product, productCategory)
  }).join("")
}

eventHub.addEventListener("categorySelected", Event => {
  if (Event.detail.selectedCategory !== 0) {
    const allBakeryProducts = useProducts()
    const filteredProducts = allBakeryProducts.filter(product => product.categoryId === Event.detail.selectedCategory)
    render(filteredProducts)
  }
})