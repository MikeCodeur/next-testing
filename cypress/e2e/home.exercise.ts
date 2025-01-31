describe('Home page', () => {
  it("Le titre meta title de la page d'accueil est correct", () => {
    cy.visit('/')
    cy.title().should('include', 'Module - Mike Codeur Course')
  })
  it("Le titre de la page d'accueil est correct", () => {
    // 🐶 Accède à la home page avec `cy.visit`
    // 🤖 cy.visit('/')
    // 🐶 Vérifie que le titre de la page est correct avec `cy.get`
    // 🤖 cy.get('p').contains('Next Testing')
  })
  it("L'auteur de la page d'accueil est correct", () => {
    // 🐶 Vérifie que l'auteur de la page est correct avec `cy.get`
    // by Mike Codeur
  })

  it("L'accueil possèdes 4 cartes avec des liens", () => {
    // 🐶 Vérifie que l'accueil possède 4 cartes avec des liens avec `cy.get`
    //cy.get('div').eq(3).find('a').should('have.length', 4)
  })
  it('Connection Dashboard', () => {
    // 🐶 1. Visite la page d'accueil de l'application
    cy.visit('/')

    // 🐶 2. Attends que la page soit chargée et clique sur le lien `Se Connecter`
    cy.get('h2').contains('Se Connecter').parent('a').click()
    // Alternative : Recherche directement un lien avec l'attribut `href` correspondant
    // cy.get('a[href="/sign-in"]').click();

    // 🐶 3. Vérifie qu'on est bien redirigé vers la page de connexion
    //cy.url().should('include', '/sign-in')

    // 🐶 Vérifie que le titre `Se connecter` est visible sur la page
    //cy.get('h1')...

    // 🐶 4. Remplis le formulaire de connexion avec l'email et le mot de passe
    //cy.findByPlaceholderText... .type()
    //cy.findByPlaceholderText... .type()

    // 🐶 5. Clique sur le bouton `Login` pour soumettre le formulaire
    //cy.findByRole('button', {name: 'Login'}).click()

    // 🐶 6. Vérifie que l'URL actuelle contient `/sign-in` après la soumission (test du comportement)
    //

    // 🐶 7. Vérifie que l'utilisateur est redirigé vers la page `/logout`
    //cy.location('pathname').should('eq', '/logout')
    // 🐶 Vérifie que le titre `Déconnexion` est visible
    // cy.findByRole('heading', {level: 1, name: 'Déconnexion'}).should(
    //   'be.visible'
    // )

    // 🐶 8. Recherche tous les liens sur la page et vérifie s'il y en a un contenant `Dashboard`
    cy.findAllByRole('link').each((link) => {
      if (link.find('span:contains("Dashboard")').length > 0) {
        // Si un lien avec `Dashboard` est trouvé, clique dessus
        cy.wrap(link).click()
      }
    })

    // 🐶 9. Vérifie que l'utilisateur est bien redirigé vers `/dashboard`
    cy.url().should('contain', '/dashboard')
  })
})
// Just for compilation
export const justForCompil = ''
