const eventHub = document.querySelector("#container")

export const Review = (productObj, categoryObj, reviewArray) => {
    //setting up variables
    let totalStars = 0
    let averageRating = 0
    let rating = ""
    //totals all the review ratings
    reviewArray.map(reviewObj => {
        totalStars += reviewObj.rating
    })
    //shows the average review
    if (reviewArray.length > 0) {
        averageRating = totalStars/reviewArray.length
        rating = `Rating: ${averageRating.toFixed(1)} out of 5`
    }
    //shows that there are not reviews if there are none
    else {
        rating = "No Reviews Yet"
    }
    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h4>${productObj.name}</h4>
              <p>$${productObj.price}</p>
          </header>
          <div>
              <button id="addProduct--${productObj.id}">Add to Cart</button>
              <p id="rating--${productObj.id}">${rating}</p>
              <a href="#" id="reviews--${productObj.id}">see all reviews (${reviewArray.length})</a>
              <p>${productObj.description} [${categoryObj.name}]</p>
          </div>
      </section>
  `
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                addedProduct: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("reviews--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("showReviewsClicked", {
            detail: {
                chosenProduct: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})
