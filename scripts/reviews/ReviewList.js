import { Review } from "./Review.js"
import { getReviews, useReviews } from "./ReviewProvider.js"

let allReviews = []
const contentTarget = document.querySelector(".userReviews")

const ReviewList = productID => {
    getReviews()
        .then(() => {
            //saves all reviews to allReviews variable
            allReviews = useReviews()
            const reviewsForThisProduct = allReviews.filter(review => review.productId === productID)
            render(reviewsForThisProduct)
        })
}

//takes an array of bakery products
const render = arrayOfFilteredReviews => {
    //maps over each bakery product to find the category associated with that product
    const reviewHTML = arrayOfFilteredReviews.map(review => {
        return Review(review)
    }).join("")
    contentTarget.innerHTML = `
        <div id = "reviews__modal" class="modal--parent" >
            <div class="modal--content">
                <h3>Reviews For This Product</h3>
                <div>
                    ${reviewHTML}
                </div>
                <button id="modal--close">Close</button>
            </div>
        </div >
`
}


const eventHub = document.querySelector("#container")

eventHub.addEventListener("showReviewsClicked", Event => {
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
