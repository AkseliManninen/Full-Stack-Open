describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'käyttäjä1',
      username: 'käyttäjänimi',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('käyttäjänimi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('käyttäjä1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vääräkäyttäjänimi')
      cy.get('#password').type('vääräsalainen')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('käyttäjänimi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blogin otsikko')
      cy.get('#author').type('Blogin kirjoittaja')
      cy.get('#url').type('blog.fi')
      cy.get('#create-button').click()
      cy.contains('Blogin otsikko')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blogin otsikko')
      cy.get('#author').type('Blogin kirjoittaja')
      cy.get('#url').type('blog.fi')
      cy.get('#create-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('2')
      cy.get('#author').type('2')
      cy.get('#url').type('2')
      cy.get('#create-button').click()
      cy.contains('Blogin kirjoittaja')
        .contains('view').click
      cy.contains('Blogin otsikko')
        .contains('like').click
    })
  })
})