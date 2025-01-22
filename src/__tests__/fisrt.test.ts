import {describe, it, expect} from 'vitest'

describe('Environment Test', () => {
  it('should run tests in js environment', () => {
    expect(1).toBe(1)
  })
  it('should run tests in jsdom environment', () => {
    // Crée un élément DOM fictif
    const element = document.createElement('div')
    element.id = 'test'
    element.textContent = 'Hello, World!'
    document.body.append(element)

    // Vérifie que l'élément est ajouté au DOM
    const foundElement = document.querySelector('#test')
    expect(foundElement).toBeInTheDocument()
    expect(foundElement?.textContent).toBe('Hello, World!')
  })
})
