const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas Frontend - Información de Bandas Musicales', function () {
  let driver;

  before(async function () {
    // Inicializa el navegador antes de ejecutar las pruebas
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    // Cierra el navegador después de ejecutar las pruebas
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

  // GL-FR-03: Campo vacío
  it('GL-FR-03: Debe mostrar un mensaje de error al buscar sin ingresar texto', async function () {
    await driver.get('http://localhost:8080');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    assert.strictEqual(alertText, 'Por favor, ingresa el nombre de la banda.', 'El mensaje de error no coincide.');
    await alert.accept();
  });

  // GL-FR-04: Visualización de resultados
  it('GL-FR-04: Cada fila debe mostrar los datos correctamente formateados', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('Radiohead');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    const rows = await driver.findElements(By.css('table tbody tr'));
    for (const row of rows) {
      const cells = await row.findElements(By.css('td'));
      assert.strictEqual(cells.length, 5, 'Cada fila debe tener 6 columnas.');
    }
  });

  // GL-FR-05: Previsualización de canciones
  it('GL-FR-05: Debe reproducir la previsualización de una canción', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('Radiohead');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    const audioElement = await driver.findElement(By.css('table tbody tr audio'));
    const audioSrc = await audioElement.getAttribute('src');
    assert.ok(audioSrc.includes('http'), 'El enlace del audio debe ser válido.');
  });

  // GL-FR-06: Persistencia de datos/visual
  it('GL-FR-06: Debe actualizar la tabla al realizar búsquedas consecutivas', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('Radiohead');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);

    await searchInput.clear();
    await searchInput.sendKeys('Coldplay');
    await searchButton.click();

    const rows = await driver.findElements(By.css('table tbody tr'));
    assert.ok(rows.length > 0, 'La tabla debe actualizarse con los resultados de Coldplay.');
  });

  // GL-FR-07: Manejo de errores de API
  it('GL-FR-07: Debe mostrar un mensaje de error si la API no responde', async function () {
    await driver.get('http://localhost:8080');
    // Aquí puedes simular la caída de la API desconectando el backend.
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('Radiohead');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    const errorMessage = await driver.findElement(By.css('.error-message')).getText();
    assert.strictEqual(errorMessage, 'El servicio no está disponible.', 'El mensaje de error no coincide.');
  });

  // GL-FR-10: Validación de caracteres
  it('GL-FR-10: Debe mostrar un mensaje de error al ingresar caracteres especiales', async function () {
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.sendKeys('#@$');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();

    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    assert.strictEqual(alertText, 'Por favor, ingresa un nombre válido.', 'El mensaje de error no coincide.');
    await alert.accept();
  });
});