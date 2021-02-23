import { Review } from "./Review.js"
import { getReviews, useReviews } from "./ReviewProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getCustomers, useCustomers } from "../customers/CustomerProvider.js"

let allReviews = []
let allProducts = []
let allCustomers = []
const contentTarget = document.querySelector(".userReviews")

const ReviewList = productID => {
    getReviews()
        .then(getCustomers)
        .then(getProducts)
        .then(() => {
            //saves all reviews to allReviews variable
            allReviews = useReviews()
            allProducts = useProducts()
            allCustomers = useCustomers()
            const matchingProduct = allProducts.find(product => product.id === productID)
            const reviewsForThisProduct = allReviews.filter(review => review.productId === productID)
            render(reviewsForThisProduct, matchingProduct)
        })
}

//takes an array of bakery products
const render = (arrayOfFilteredReviews, Product) => {
    //maps over each bakery product to find the category associated with that product
    let reviewHTML = arrayOfFilteredReviews.map(review => {
        const matchingCustomer = allCustomers.find(customer => customer.id === review.customerId)
        return Review(review, matchingCustomer)
    }).join("")
    if (reviewHTML === "") {
        reviewHTML = `<h4>Have you tried this product?</h4>
        <h4>Be the first to leave a review!<h4>
        `
        contentTarget.innerHTML = `
            <div id = "reviews__modal" class="modal--parent" >
                <div class="modal--content">
                    <h3>Reviews - ${Product.name}</h3>
                    <div>
                        ${reviewHTML}
                    </div>
                    <button id="modal--close">Close</button>
                </div>
            </div >
        `
    }
    else {
        contentTarget.innerHTML = `
            <div id = "reviews__modal" class="modal--parent" >
                <div class="modal--content">
                    <h3>Reviews - ${Product.name}</h3>
                    <div>
                        ${reviewHTML}
                    </div>
                    <button id="modal--close">Close</button>
                </div>
            </div >
        `
    }
}


const eventHub = document.querySelector("#container")

let currentlyRenderedProduct = 0

eventHub.addEventListener("showReviewsClicked", Event => {
    currentlyRenderedProduct = Event.detail.chosenProduct
    ReviewList(Event.detail.chosenProduct)
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
        closeModal()
    }
})

//clears modal HTML
const closeModal = () => {
    contentTarget.innerHTML = ""
}

eventHub.addEventListener("reviewStateChanged", evt => {
    if (contentTarget.innerHTML !== "") {
        ReviewList(currentlyRenderedProduct)
    }
})