import { authHelper } from "../auth/authHelper.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".form__review")

let allProducts = []

const ReviewForm = () => {
    getProducts()
    .then(() => {
        allProducts = useProducts()
        render()
    })
}


const render = () => {
    //if the user is not logged in, render login HTML
    if (authHelper.isUserLoggedIn()) {
        contentTarget.innerHTML = `
        <h3>Leave A Review</h3>
        <form>
            <select class="dropdown" id="productSelect">
                <option value="0">Select A Product..</option>
                ${allProducts.map(productObj => `<option value="${productObj.id}">${productObj.name}</option>`).join("")}
            </select>
            <select class="dropdown" id="productRatingSelect">
                <option value="0">Select A Rating..</option>
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
            </select>
            <fieldset>
                <label for="review-text">Email: </label>
                <input type="text" id="review-text" name="review-text">
            </fieldset>
            <button id="submitReview">Submit</button>
            <button id="cancelReview">Cancel</button>
        </form>
    `
    }
}

//listens for click on customer login button, stores user info, 
//or sends to register form, or back to login form
eventHub.addEventListener("click", e => {
    //if id matches customer login button
    if (e.target.id === "submitReview") {
        e.preventDefault()
    }
})

//listens for "showLoginform" and renders login form
eventHub.addEventListener("showNewReviewForm", event => {
    ReviewForm()
})

eventHub.addEventListener("userLoggedOut", event => {
    //renders the login form again so that you can log in after logging out
    contentTarget.innerHTML = ""
})
