/// <reference types="cypress" />
import '@testing-library/cypress/add-commands' // ajout des extensions de testing library
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// variable env pour les tests de cypress
const {email, password} = Cypress.env()

// -- This is a parent command --

// ROUTES
Cypress.Commands.add('visitSignIn', () => {
  cy.visit('/')
  // Attendre que la page soit chargée
  cy.get('h2').contains('Se Connecter').parent('a').click()
  // Alternative: cy.get('a[href="/sign-in"]').click()

  // Vérifier qu'on est sur la page de connexion
  cy.url().should('include', '/sign-in')
  cy.get('h1').contains('Se connecter').should('be.visible')
})

Cypress.Commands.add('visitShopAdmin', () => {
  cy.visitSignIn()
  cy.login()
  cy.url().should('contain', '/sign-in')
  cy.location('pathname').should('eq', '/logout')
  cy.findByRole('heading', {level: 1, name: 'Déconnexion'}).should('be.visible')
  cy.findAllByRole('link').each((link) => {
    if (link.find('span:contains("Dashboard")').length > 0) {
      cy.wrap(link).click()
    }
  })
  cy.url().should('contain', '/dashboard')
  cy.findByText('Dashboard').should('be.visible')
  cy.findAllByRole('link').each((link) => {
    if (link.find('span:contains("Shop Admin")').length > 0) {
      cy.wrap(link).click()
    }
  })
  cy.findByRole('heading', {
    level: 1,
    name: 'Administration de la boutique',
  }).should('be.visible')
})
// AUTHENTIFICATION
Cypress.Commands.add('fillAuthForm', (email: string, password: string) => {
  cy.findByPlaceholderText('Email').type(email)
  cy.findByPlaceholderText('Password').type(password)
})

Cypress.Commands.add('login', () => {
  cy.fillAuthForm(email, password)
  cy.findByRole('button', {name: 'Login'}).click()
})

// just for compilation
export const justForCompil = ''
