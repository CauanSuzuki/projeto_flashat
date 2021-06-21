describe("testanto tela de login", () => {
    it("entrar no login ", () => {
        cy.visit("/login")
    })
    it("digitar no formulario", () => {
        cy.get('[data-teste=inputLogin]').type("123")
        cy.get("[data-teste=inputSenha]").type("senha do cara")
        cy.contains('get in').click()
        cy.url().should('include','/')
    })
});
