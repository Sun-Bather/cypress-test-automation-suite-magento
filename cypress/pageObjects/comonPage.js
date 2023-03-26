export let commonPage = {

    getSignIntBtn:() => {
        //cy.contains("Sign In")
       return cy.get(".authorization-link a:visible")
       
   },

   getCreateAcc:() => {
       return cy.get('.header.links').find('li').eq(2)
   },
};