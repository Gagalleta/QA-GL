const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas de Validación - Información de Bandas Musicales', function () {
  this.timeout(10000); // Tiempo de espera general
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  // GL-FR-04: Validación de caracteres
  it('GL-FR-04: Debe mostrar un mensaje de error al ingresar caracteres especiales', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.clear();
    await searchInput.sendKeys('#@$');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    // Esperar y capturar el mensaje de error
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    assert.strictEqual(alertText, 'Ocurrió un error al buscar las canciones. Inténtalo de nuevo.', 'El mensaje de error no coincide.');
    console.log('Mensaje de error validado para caracteres especiales: ', alertText);
    await alert.accept();
  });

  // GL-FR-06: Validación de campo vacío
  it('GL-FR-06: Debe mostrar un mensaje de error al intentar buscar con el campo vacío', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.clear(); // Asegurarse de que el campo esté vacío
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    // Esperar y capturar el mensaje de error
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    assert.strictEqual(alertText, 'Por favor, ingresa el nombre de la banda.', 'El mensaje de error no coincide.');
    console.log('Mensaje de error validado para campo vacío: ', alertText);
    await alert.accept();
  });
});