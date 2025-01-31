import Home from '@/app/page'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'

describe('Home', () => {
  const setup = () => render(<Home />)

  it("Le titre de la page d'accueil est correct", () => {
    setup()
    const title = screen.getAllByText(/Next Testing/)
    expect(title[0]).toBeInTheDocument()
  })

  it("L'auteur de la page d'accueil est correct", () => {
    setup()
    const author = screen.queryByText(/Mike Codeur/)
    expect(author).toBeInTheDocument()
  })

  it('Vérifie la présence du lien Instructions', () => {
    setup()
    const instructionsLink = screen.getByRole('link', {name: /instructions/i})
    expect(instructionsLink).toBeInTheDocument()
    expect(instructionsLink).toHaveAttribute('href', '/instructions')
  })

  it('Vérifie la présence du lien de connexion', () => {
    setup()
    const loginLink = screen.getByRole('link', {name: /se connecter/i})
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/sign-in')
  })
})

//Juste pour l'exercice
export const justForCompile = 'justForCompile'
