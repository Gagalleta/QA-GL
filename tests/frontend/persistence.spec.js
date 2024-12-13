const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas de Persistencia Visual - Información de Bandas Musicales', function () {
  this.timeout(15000); // Aumentamos el tiempo de espera general
  let driver;

  before(async function () {
    // Inicia el navegador
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Cierra el navegador después de las pruebas
    await driver.quit();
  });

  it('GL-FR-05: Debe actualizar la tabla al realizar búsquedas consecutivas', async function () {
    await driver.get('http://localhost:8080');
  
    // Realizar la primera búsqueda: Radiohead
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    const searchButton = await driver.findElement(By.css('button'));
    await searchInput.clear();
    await searchInput.sendKeys('Radiohead');
    await searchButton.click();
  
    // Esperar los resultados de la primera búsqueda
    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);
    const firstTableText = await driver.findElement(By.css('table tbody')).getText();

    // Validar que hay resultados para la primera búsqueda
    assert.ok(firstTableText.length > 0, 'La tabla debe contener resultados para la primera búsqueda.');
    console.log('Resultados de la primera búsqueda (Radiohead):\n', firstTableText);
  
    // Realizar la segunda búsqueda: Coldplay
    await searchInput.clear();
    await searchInput.sendKeys('Coldplay');
    await searchButton.click();

    // Esperar hasta que la tabla cambie tras la segunda búsqueda
    await driver.wait(async () => {
      const currentTableText = await driver.findElement(By.css('table tbody')).getText();
      return currentTableText !== firstTableText;
    }, 5000, 'La tabla no se actualizó tras la segunda búsqueda.');
  
    // Capturar los resultados de la segunda búsqueda
    const secondTableText = await driver.findElement(By.css('table tbody')).getText();

    // Validar que hay resultados para la segunda búsqueda
    assert.ok(secondTableText.length > 0, 'La tabla debe contener resultados para la segunda búsqueda.');
    console.log('Resultados de la segunda búsqueda (Coldplay):\n', secondTableText);
  
    // Comparar los textos de las tablas para validar el cambio
    assert.notStrictEqual(
      firstTableText,
      secondTableText,
      'Los resultados de las búsquedas deben ser diferentes.'
    );
  });
});