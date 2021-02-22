const eventHub = document.querySelector("#container")

export const Product = (productObj, categoryObj, reviewArray) => {
    let totalStars = 0
    let averageRating = 0
    reviewArray.map(reviewObj => {
        totalStars += reviewObj.rating
    })
    if (reviewArray.length > 0) {
        averageRating = totalStars/reviewArray.length
    }
    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h4>${productObj.name}</h4>
              <p>$${productObj.price}</p>
          </header>
          <div>
              <button id="addProduct--${productObj.id}">Add to Cart</button>
              <p id="review--${productObj.id}">Rating: ${averageRating.toFixed(1)} out of 5</p>
              <a href="#">see all reviews</a>
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
