Cypress.Commands.add('dragAndDrop', (sourceSelector: string, targetSelector: string) => {
  cy.get(sourceSelector).trigger('mousedown', { which: 1, force: true });
  cy.get(targetSelector)
    .trigger('mousemove', { force: true })
    .trigger('mouseup', { force: true });
});
