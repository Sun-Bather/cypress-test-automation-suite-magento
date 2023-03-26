export let productPage = {
    
    getInventorylist:() => {
        return cy.get(".products.list.items.product-items li")
    }

    
}