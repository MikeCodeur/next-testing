import Home from '@/app/page'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'

describe('Home', () => {
  // 🐶 utilise render() pour rendre le composant Home
  //const setup = () => render(<Home />)

  it("Le titre de la page d'accueil est correct", () => {
    // 🐶 appelle setup()
    //setup()
    const title = screen.getAllByText(/Next Testing/)
    expect(title[0]).toBeInTheDocument()
  })

  it("L'auteur de la page d'accueil est correct", () => {
    // 🐶 appelle setup()
    const author = '' // 🐶 recupere le texte Mike Codeur avec 'queryByText'
    expect(author).toBeInTheDocument()
  })

  it('Vérifie la présence du lien Instructions', () => {
    // 🐶 appelle setup()
    const instructionsLink = '' // 🐶 utilise 'getByRole' de type 'link' avec comme name : instruction
    expect(instructionsLink).toBeInTheDocument()
    // 🐶 utilise 'toHaveAttribute' avec comme attribut 'href' et comme valeur '/instructions'
    //
  })

  it('Vérifie la présence du lien de connexion', () => {
    // 🐶 appelle setup()
    const loginLink = '' // 🐶 utilise 'getByRole' de type 'link' avec comme name : 'se connecter'
    // 🐶 utilise 'toBeInTheDocument'

    // 🐶 utilise 'toHaveAttribute' avec comme attribut 'href' et comme valeur '/sign-in'
  })
})

//juste pour l'exercice
export const justForCompile = 'justForCompile'
