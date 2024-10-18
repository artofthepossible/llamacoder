const { Builder, By, until } = require('selenium-webdriver');
const { GenericContainer } = require('testcontainers');
const assert = require('assert');

describe('LlamaCoderUITest', function() {
  this.timeout(60000); // Increase timeout for container startup

  let appContainer;
  let driver;
  let appUrl;

  before(async function() {
    try {
      // Start the LlamaCoder App container
      appContainer = await new GenericContainer('llamacoder-app:latest')
        .withExposedPorts(3000)
        .start();

      const appHost = appContainer.getHost();
      const appPort = appContainer.getMappedPort(3000);

      appUrl = `http://${appHost}:${appPort}`;
      console.log(`TC-1-LlamaCoder App running at ${appUrl}`);

      driver = await new Builder()
        .forBrowser('chrome')
        .build();
    } catch (error) {
      console.error('Error in before hook:', error);
      throw error;
    }
  });

  it('should validate the title text', async function() {
    try {
      // Check if the application is running by verifying the console log message
      if (!appUrl) {
        throw new Error('Application URL is not set. The application might not be running.');
      }

      let retries = 5;
      let isAppLoaded = false;

      while (retries > 0) {
        try {
          await driver.get(appUrl);
          await driver.wait(until.titleIs('Llama Coder – AI Code Generator'), 10000, 'App title did not load correctly');
          isAppLoaded = true;
          break; // Exit the loop if the title is loaded correctly
        } catch (error) {
          if (retries === 1) {
            throw error; // Throw the error if no retries are left
          }
          console.log(`Retrying... (${5 - retries + 1})`);
          retries--;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        }
      }

      if (!isAppLoaded) {
        throw new Error('App did not load correctly after multiple retries');
      }

      // Validate the title text
      const title = await driver.getTitle();
      assert.strictEqual(title, 'Llama Coder – AI Code Generator', "Title text 'Llama Coder – AI Code Generator' not found on the UI");
      console.log("Success: 'TC-1-Llama Coder – AI Code Generator' title text found on the UI");
    } catch (error) {
      console.error('Error in test case:', error);
      throw error;
    }
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
    if (appContainer) {
      await appContainer.stop();
    }
  });
});