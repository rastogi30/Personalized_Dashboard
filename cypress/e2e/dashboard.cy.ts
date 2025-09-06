/// <reference types="cypress" />
describe('Content Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should load the dashboard', () => {
    cy.contains('Your Personalized Feed').should('be.visible');
    cy.get('[data-testid="content-card"]').should('have.length.greaterThan', 0);
  });

  it('should navigate between sections', () => {
    // Navigate to Trending
    cy.contains('Trending').click();
    cy.contains('Trending Content').should('be.visible');

    // Navigate to Favorites
    cy.contains('Favorites').click();
    cy.contains('Your Favorites').should('be.visible');

    // Navigate to Settings
    cy.contains('Settings').click();
    cy.contains('Customize your content preferences').should('be.visible');
  });

  it('should toggle dark mode', () => {
    // Toggle dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('html').should('have.class', 'dark');

    // Toggle back to light mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });

  it('should search for content', () => {
    const searchTerm = 'technology';
    cy.get('input[placeholder*="Search"]').type(searchTerm);
    cy.wait(1000); // Wait for debounce
  cy.contains(`Search Results for "${searchTerm}"`).should('be.visible');
  });

  it('should add and remove favorites', () => {
    // Add to favorites
    cy.get('[data-testid="favorite-button"]').first().click();

    // Navigate to favorites
    cy.contains('Favorites').click();
    cy.get('[data-testid="content-card"]').should('have.length.greaterThan', 0);

    // Remove from favorites
    cy.get('[data-testid="favorite-button"]').first().click();
  });

  it('should update category preferences', () => {
    // Navigate to settings
    cy.contains('Settings').click();

    // Toggle a category
    cy.contains('Science').click();

    // Verify the category is selected
    cy.contains('Science').should('have.class', 'bg-blue-50');
  });
});

// Add custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      dragAndDrop(sourceSelector: string, targetSelector: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('dragAndDrop', (sourceSelector: string, targetSelector: string) => {
  cy.get(sourceSelector).trigger('mousedown', { button: 0 });
  cy.get(targetSelector).trigger('mousemove').trigger('mouseup');
});
