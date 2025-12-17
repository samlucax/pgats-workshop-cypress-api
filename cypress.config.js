const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      apiUrl: `https://fakestoreapi.com`
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
