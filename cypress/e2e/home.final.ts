describe('Home page', () => {
  it("Le titre meta title de la page d'accueil est correct", () => {
    cy.visit('/')
    cy.title().should('include', 'Module - Mike Codeur Course')
  })
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

  it('Connection Dashboard', () => {
    cy.visit('/')
    // Attendre que la page soit chargée
    cy.get('h2').contains('Se Connecter').parent('a').click()
    // Alternative: cy.get('a[href="/sign-in"]').click()

    // Vérifier qu'on est sur la page de connexion
    cy.url().should('include', '/sign-in')
    cy.get('h1').contains('Se connecter').should('be.visible')
    cy.findByPlaceholderText('Email').type('admin@gmail.com')
    cy.findByPlaceholderText('Password').type('Azerty123')
    cy.findByRole('button', {name: 'Login'}).click()
    cy.url().should('contain', '/sign-in')
    cy.location('pathname').should('eq', '/logout')
    cy.findByRole('heading', {level: 1, name: 'Déconnexion'}).should(
      'be.visible'
    )
    cy.findAllByRole('link').each((link) => {
      if (link.find('span:contains("Dashboard")').length > 0) {
        cy.wrap(link).click()
      }
    })
    cy.url().should('contain', '/dashboard')
  })
})
// just for compilation
export const justForCompil = ''
