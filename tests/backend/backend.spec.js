const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/app.js');
const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas de Backend', function () {
  it('Debe devolver error 400 si falta un parámetro obligatorio en POST /favoritos', async function () {
    const res = await chai.request(server).post('/favoritos').send({
      nombre_banda: 'Radiohead',
      cancion_id: 123,
    });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error').that.equals('Campos obligatorios: nombre_banda, cancion_id, usuario, ranking');
  });

  it('Debe devolver error 404 si la canción no existe en POST /favoritos', async function () {
    const res = await chai.request(server).post('/favoritos').send({
      nombre_banda: 'Radiohead',
      cancion_id: 999999, // ID inválido
      usuario: 'Juan',
      ranking: '5/5',
    });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error').that.equals('La canción con ese Id no existe.');
  });

  it('Debe devolver error 400 al intentar agregar más de 5 canciones como favoritas', async function () {
    // IDs válidos basados en tus datos de muestra
    const validIds = [
      1097862231,
      1111577949,
      1111577770,
      1111577965,
      1111578103,
    ];

    // Agregar 5 canciones
    for (let i = 0; i < validIds.length; i++) {
      await chai.request(server).post('/favoritos').send({
        nombre_banda: 'Radiohead',
        cancion_id: validIds[i],
        usuario: 'Juan',
        ranking: `${i + 1}/5`,
      });
    }

    // Intentar agregar una sexta canción con otro ID válido
    const res = await chai.request(server).post('/favoritos').send({
      nombre_banda: 'Radiohead',
      cancion_id: 1111578064, // Otro ID válido
      usuario: 'Juan',
      ranking: '6/5',
    });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error').that.equals('No puedes agregar más de 5 canciones como favoritas.');
  });

  it('Debe devolver la lista de favoritos correctamente en GET /misfavoritos', async function () {
    const res = await chai.request(server).get('/misfavoritos');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('favoritos').that.is.an('array');
  });

  it('Debe manejar correctamente la caché en GET /search_tracks', async function () {
    // Primera búsqueda
    const firstRes = await chai.request(server).get('/search_tracks?name=Radiohead');
    expect(firstRes).to.have.status(200);
    expect(firstRes.body).to.have.property('total_albumes');

    // Segunda búsqueda (desde caché)
    const secondRes = await chai.request(server).get('/search_tracks?name=Radiohead');
    expect(secondRes).to.have.status(200);
    expect(secondRes.body).to.have.property('total_albumes');
  });
});