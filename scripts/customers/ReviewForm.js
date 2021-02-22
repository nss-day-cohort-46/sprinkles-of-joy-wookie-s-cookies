import { authHelper } from "../auth/authHelper.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { saveReview } from '../reviews/ReviewProvider.js'

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
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
            </select>
            <fieldset>
                <label for="review-text">Feedback: </label>
                <input type="text" id="review-text" name="review-text">
            </fieldset>
            <button id="submitReview">Submit</button>
            <button id="cancelReview">Cancel</button>
        </form>
    `
    }
}

eventHub.addEventListener("click", e => {
    //if id matches customer login button
    if (e.target.id === "submitReview") {
        e.preventDefault()
        const customerId = parseInt(authHelper.getCurrentUserId())
        const productId = parseInt(document.getElementById("productSelect").value)
        const reviewText = document.getElementById("review-text").value
        const rating = parseInt(document.getElementById("productRatingSelect").value)
        const newRatingObj = {
            customerId: customerId,
            productId: productId,
            reviewText: reviewText,
            rating: rating
        }
        saveReview(newRatingObj)
        .then(() => {
            const customEvent = new CustomEvent("newReviewAdded")
            eventHub.dispatchEvent(customEvent)
            document.getElementById("productSelect").value = 0
            document.getElementById("review-text").value = ""
            document.getElementById("productRatingSelect").value = 0
        })
    }
    else if (e.target.id === "cancelReview") {
        e.preventDefault()
        contentTarget.innerHTML = ""
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
