declare namespace Cypress {
  interface Chainable {
    dragAndDrop(sourceSelector: string, targetSelector: string): Chainable<void>;
  }
}
