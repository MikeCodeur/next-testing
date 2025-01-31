import Home from '@/app/page'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'

describe('Home', () => {
  // 🐶 Utilise `render()` pour rendre le composant `Home`
  //const setup = () => render(<Home />)

  it("Le titre de la page d'accueil est correct", () => {
    // 🐶 Appelle `setup()`
    //setup()
    const title = screen.getAllByText(/Next Testing/)
    expect(title[0]).toBeInTheDocument()
  })

  it("L'auteur de la page d'accueil est correct", () => {
    // 🐶 Appelle `setup()`
    const author = '' // 🐶 Récupère le texte `Mike Codeur` avec `queryByText`
    expect(author).toBeInTheDocument()
  })

  it('Vérifie la présence du lien Instructions', () => {
    // 🐶 Appelle `setup()`
    const instructionsLink = '' // 🐶 Utilise `getByRole` de type `link` avec comme name : `instruction`
    expect(instructionsLink).toBeInTheDocument()
    // 🐶 Utilise `toHaveAttribute` avec comme attribut `href` et comme valeur `/instructions`
    //
  })

  it('Vérifie la présence du lien de connexion', () => {
    // 🐶 Appelle `setup()`
    const loginLink = '' // 🐶 Utilise `getByRole` de type `link` avec comme name : `se connecter`
    // 🐶 Utilise `toBeInTheDocument`

    // 🐶 Utilise `toHaveAttribute` avec comme attribut `href` et comme valeur `/sign-in`
  })
})

//Juste pour l'exercice
export const justForCompile = 'justForCompile'
