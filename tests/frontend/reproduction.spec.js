const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const axios = require('axios'); // Descargas!

describe('Pruebas de Reproducción - Información de Bandas Musicales', function () {
  this.timeout(20000); // Tiempo de espera general a 20 segundos
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  beforeEach(async function () {
    // Realiza la búsqueda inicial antes de cada prueba
    await driver.get('http://localhost:8080');
    const searchInput = await driver.findElement(By.css('input[type="text"]'));
    await searchInput.clear();
    await searchInput.sendKeys('The Beatles');
    const searchButton = await driver.findElement(By.css('button'));
    await searchButton.click();
    await driver.wait(until.elementLocated(By.css('table tbody tr')), 5000);
  });

  // elemento <audio> de la primera canción
  async function obtenerElementoAudioPrimeraCancion() {
    return await driver.findElement(By.css('table tbody tr:first-child audio'));
  }

  // GL-FR-09: Reproducir canción
  it('GL-FR-09: Debe reproducir la previsualización de una canción', async function () {
    const audioElement = await obtenerElementoAudioPrimeraCancion();

    // Forzar reproducción
    await driver.executeScript("arguments[0].play();", audioElement);

    // Validar que la canción no está en pausa
    const isPaused = await driver.executeScript("return arguments[0].paused;", audioElement);
    assert.strictEqual(isPaused, false, 'La canción debe estar reproduciéndose.');

    // Esperar3 segundos para confirmar que el tiempo de reproducción avanza
    const startTime = await driver.executeScript("return arguments[0].currentTime;", audioElement);
    await driver.sleep(3000); // Pausa de 3 segundos
    const endTime = await driver.executeScript("return arguments[0].currentTime;", audioElement);

    assert.ok(endTime > startTime, 'El tiempo de reproducción debe avanzar.');
    console.log(`Tiempo inicial: ${startTime}, Tiempo final: ${endTime}`);
  });

  // GL-FR-10: Descargar canción
  it('GL-FR-10: Debe comenzar a descargar una canción', async function () {
    const audioElement = await obtenerElementoAudioPrimeraCancion();
    const src = await audioElement.getAttribute('src'); // Obtener el enlace del audio
    assert.ok(src.includes('.m4a'), 'El enlace de descarga debe ser válido y apuntar a un archivo de audio.');

    // Verificar que el archivo es accesible para descarga
    const response = await axios.head(src);
    assert.strictEqual(response.status, 200, 'El archivo de audio debe ser accesible para descarga.');
  });

    // GL-FR-11 a GL-FR-13: Cambiar velocidad, silenciar y detener reproducción
    it('GL-FR-11, GL-FR-12, GL-FR-13: Debe cambiar velocidad, silenciar y detener la reproducción de la canción', async function () {
    const audioElement = await obtenerElementoAudioPrimeraCancion();

    // Reproducir la canción inicialmente a velocidad normal
    await driver.executeScript("arguments[0].play();", audioElement);

    // Reproducir a velocidad normal durante 2 segundos
    await driver.sleep(2000);
    console.log('Reproducción a velocidad normal completada.');

    // Cambiar la velocidad de reproducción a 2x
    await driver.executeScript("arguments[0].playbackRate = 2;", audioElement);
    const playbackRate = await driver.executeScript("return arguments[0].playbackRate;", audioElement);
    assert.strictEqual(playbackRate, 2, 'La velocidad de reproducción debe ser 2x.');
    console.log('Velocidad de reproducción ajustada correctamente a 2x.');

    // Reproducir a velocidad 2x durante 2 segundos
    await driver.sleep(2000);
    console.log('Reproducción a velocidad 2x completada.');

    // Silenciar el audio
    await driver.executeScript("arguments[0].muted = true;", audioElement);
    const isMuted = await driver.executeScript("return arguments[0].muted;", audioElement);
    assert.strictEqual(isMuted, true, 'El audio debe estar silenciado.');
    console.log('Audio silenciado correctamente.');

    // Detener la reproducción
    await driver.executeScript("arguments[0].pause();", audioElement);
    const isPaused = await driver.executeScript("return arguments[0].paused;", audioElement);
    assert.strictEqual(isPaused, true, 'La canción debe estar detenida.');
    console.log('Reproducción detenida correctamente.');
    });
});