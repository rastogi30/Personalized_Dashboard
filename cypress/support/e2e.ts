// Add custom commands and global configurations
import './commands';

// Hide fetch/XHR requests in Cypress logs for cleaner output
Cypress.on('window:before:load', (win) => {
  cy.spy(win.console, 'error');
  cy.spy(win.console, 'warn');
});