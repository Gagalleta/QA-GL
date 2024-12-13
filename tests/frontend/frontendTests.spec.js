const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas de Búsqueda - Información de Bandas Musicales', function () {
  this.timeout(15000); // Incrementa el tiempo de espera
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  // GL-FR-01: Búsqueda válida
  it('GL-FR-01: Debe mostrar canciones al buscar una banda válida', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('Radiohead');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);
    const rows = await driver.findElements(By.css('table tbody tr'));
    assert.ok(rows.length > 0, 'La tabla debe contener filas con canciones y álbumes relacionados.');
  });

  // GL-FR-02: Búsqueda inexistente
  it('GL-FR-02: No debe mostrar canciones al buscar una banda inexistente', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.clear();
    await searchInput.sendKeys('BandaInexistente');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    const rows = await driver.findElements(By.css('table tbody tr'));
    assert.strictEqual(rows.length, 0, 'La tabla debe estar vacía.');
  });

  // GL-FR-03: Campo vacío muestra mensaje de error
  it('GL-FR-03: Campo vacío muestra mensaje de error', async function () {
    await driver.get('http://localhost:8080'); // Cargar la página
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.clear(); // Asegurar que el campo está vacío
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click(); // Presionar "Buscar"
  
    // Manejar la alerta del navegador
    try {
      await driver.wait(until.alertIsPresent(), 5000); // Esperar a que la alerta esté presente
      const alert = await driver.switchTo().alert(); // Cambiar al contexto de la alerta
      const alertText = await alert.getText(); // Obtener el texto de la alerta
      assert.strictEqual(
        alertText,
        'Por favor, ingresa el nombre de la banda.',
        'El mensaje de error no coincide.'
      );
      await alert.accept(); // Aceptar la alerta
    } catch (error) {
      throw new Error('No se encontró la alerta o el mensaje no coincide: ' + error.message);
    }
  });

  // GL-FR-04: Validación de caracteres muestra mensaje de error
  it('GL-FR-04: Validación de caracteres muestra mensaje de error', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('#@$'); // Ingresar caracteres especiales
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click(); // Presionar "Buscar"
  
    // Manejar la alerta del navegador
    try {
      await driver.wait(until.alertIsPresent(), 5000); // Esperar a que la alerta esté presente
      const alert = await driver.switchTo().alert(); // Cambiar al contexto de la alerta
      const alertText = await alert.getText(); // Obtener el texto de la alerta
      assert.strictEqual(
        alertText,
        'Ocurrió un error al buscar las canciones. Inténtalo de nuevo.',
        'El mensaje de error no coincide.'
      );
      await alert.accept(); // Aceptar la alerta
    } catch (error) {
      throw new Error('No se encontró la alerta o el mensaje no coincide: ' + error.message);
    }
  });

  // GL-FR-05: Persistencia visual muestra resultados correctos tras búsquedas consecutivas
  it('GL-FR-05: Persistencia visual muestra resultados correctos tras búsquedas consecutivas', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    const searchButton = await driver.findElement(By.css('button'));
  
    // Primera búsqueda
    await searchInput.clear();
    await searchInput.sendKeys('Radiohead');
    await searchButton.click();
    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);
    const firstRowText = await driver.findElement(By.css('table tbody tr:first-child')).getText();
  
    // Segunda búsqueda
    await searchInput.clear();
    await searchInput.sendKeys('Coldplay');
    await searchButton.click();
    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);
    const secondRowText = await driver.findElement(By.css('table tbody tr:first-child')).getText();
  
    // Validar que los resultados cambian
    try {
      assert.notStrictEqual(
        firstRowText,
        secondRowText,
        'Los resultados deben cambiar entre búsquedas.'
      );
    } catch (error) {
      throw new Error(
        `Los resultados no cambiaron entre búsquedas. Primera fila: ${firstRowText}, Segunda fila: ${secondRowText}`
      );
    }
  });

  // GL-FR-07: Nombres con tildes
  it('GL-FR-07: Debe manejar nombres con tildes correctamente', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('Babasónicos');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);
    const rows = await driver.findElements(By.css('table tbody tr'));
    assert.ok(rows.length > 0, 'La tabla debe mostrar resultados para nombres con tildes.');
  });

  // GL-FR-08: Bandas con dos nombres
  it('GL-FR-08: Debe manejar bandas con dos nombres', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('The Beatles');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);
    const rows = await driver.findElements(By.css('table tbody tr'));
    assert.ok(rows.length > 0, 'La tabla debe mostrar resultados para bandas con dos nombres.');
  });
});