export const ProductList = () => {
    getProducts()
        .then(getCategories)
        //imports the reviews
        .then(getReviews)
        .then(() => {
            bakeryProducts = useProducts()
            bakeryCategories = useCategories()
            //saves all reviews to allReviews variable
            allReviews = useReviews()
            render(bakeryProducts)
        })
}

//takes an array of bakery products
const render = (arrayOfBakeryProducts) => {
    //maps over each bakery product to find the category associated with that product
    contentTarget.innerHTML = arrayOfBakeryProducts.map(product => {
        const productCategory = bakeryCategories.find(category => category.id === product.categoryId)
        //finds all reviews that match this product
        const arrayOfMatchingReviews = allReviews.filter(review => review.productId === product.id)
        //returns HTML of each product with info about it and the category it is associated with
        return Product(product, productCategory, arrayOfMatchingReviews)
    }).join("")
}
