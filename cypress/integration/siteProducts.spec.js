/// <reference types="Cypress"/>

import { productPage } from "../pageObjects/productPage"

beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/women/tops-women/hoodies-and-sweatshirts-women.html")
})

describe("Page", () => {

    it("Should have visible items", () => {
        productPage.getInventorylist().should("be.visible").its("length").and("be.gt", 1)

    })

    it("Should have visible image", () =>{
        cy.get('.product-image-photo').should("be.visible").should("have.attr", "src").and("contains", "media/catalog/product")
    })

    it("Should have visible prices and header", () => {
        cy.get(".product.details.product-item-details").first().as("inventoryItem") //create alias 
        cy.get("@inventoryItem").find(".product.name.product-item-name").should("be.visible").invoke("text").then(textValue => cy.log(textValue)) //prints the title of the first item on the list.
        cy.get("@inventoryItem").find(".price-wrapper").should("be.visible").invoke("text").then(textValue => cy.log(textValue))
    })

    it("Should have all the popular sizes visible", () => {
        cy.get(".swatch-attribute.size").as("itemSize")
        cy.get("@itemSize").eq(0).should("be.visible").invoke("text").then(textValue => cy.log(textValue))
    })

    it("Should display hidden menu of an item", () =>{
        cy.get(".products.list.items.product-items")
        cy.get(".item.product.product-item").eq(1).trigger("mouseover").
        cy.wait(1000)
        //cy.get(".action.tocart.primary").first().click()
    })

    it('Can add a product to the cart from the product page', () => {
        //productPage.getInventorylist().eq(5).trigger("mouseover")

        
      
        
    })

})