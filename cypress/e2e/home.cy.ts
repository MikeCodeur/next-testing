describe('Home page', () => {
  it("Le titre de la page d'accueil est correct", () => {
    cy.visit('/')
    cy.get('p').contains('Next Testing')
  })
  it("L'auteur de la page d'accueil est correct", () => {
    cy.visit('/')
    cy.get('code').first().contains('by Mike Codeur')
  })

  it("L'accueil possèdes 4 cartes avec des liens", () => {
    cy.visit('/')
    cy.get('div').eq(3).find('a').should('have.length', 4)
  })
})
