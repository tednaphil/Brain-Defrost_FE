describe('Brain Defrost User Stories', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Brain-Defrost_FE')
  })
  it('Displays homepage', () => {
    cy.get('h1').contains('Brain Defrost')
  })
  it('Allows user to generate a new game', () => {
  })
  it('Allows user to join a game', () => {
  })
})