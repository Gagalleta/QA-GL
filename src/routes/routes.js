const express = require('express');
const router = express.Router();
const { getHome } = require('../controllers/home');
const { getTracksByBand, postFavorite, getFavorites } = require('../controllers/tracks')

router.get('/', getHome);
/**
 * @swagger
 * /search_tracks:
 *   get:
 *     summary: Buscar álbumes y canciones
 *     tags: [Tracks]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Nombre de banda
 *         schema:
 *           type: string
 *           example: Morat
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_albumes:
 *                   type: integer
 *                   description: Número total de álbumes encontrados
 *                   example: 5
 *                 total_canciones:
 *                   type: integer
 *                   description: Número total de canciones encontradas
 *                   example: 22
 *                 albumes:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de álbumes encontrados
 *                   example: [
 *                     "Cuando Nadie Ve - Single",
 *                     "Balas Perdidas",
 *                     "Sobre El Amor Y Sus Efectos Secundarios",
 *                     "Punto y Aparte - Single",
 *                     "No Termino - Single"
 *                   ]
 *                 canciones:
 *                   type: array
 *                   description: Lista de canciones encontradas
 *                   items:
 *                     type: object
 *                     properties:
 *                       cancion_id:
 *                         type: integer
 *                         description: ID de la canción
 *                         example: 1389954192
 *                       nombre_album:
 *                         type: string
 *                         description: Nombre del álbum al que pertenece la canción
 *                         example: "Cuando Nadie Ve - Single"
 *                       nombre_tema:
 *                         type: string
 *                         description: Título de la canción
 *                         example: "Cuando Nadie Ve"
 *                       preview_url:
 *                         type: string
 *                         description: URL para escuchar una vista previa de la canción
 *                         example: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/57/55/10/575510d5-665c-661c-7031-2eacfe92d435/mzaf_6550560231604047601.plus.aac.p.m4a"
 *                       fecha_lanzamiento:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de lanzamiento de la canción
 *                         example: "2018-01-01T12:00:00Z"
 *                       precio:
 *                         type: object
 *                         properties:
 *                           valor:
 *                             type: number
 *                             description: Precio de la canción
 *                             example: 1.29
 *                           moneda:
 *                             type: string
 *                             description: Moneda del precio
 *                             example: "USD"
 *       400:
 *         description: Parámetro de búsqueda faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/search_tracks', getTracksByBand);
/**
 * @swagger
 * /favoritos:
 *   post:
 *     summary: Agregar una canción a favoritos
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_banda:
 *                 type: string
 *                 description: Nombre de la banda
 *                 example: "Morat"
 *               cancion_id:
 *                 type: integer
 *                 description: ID de la canción
 *                 example: 1440840380
 *               usuario:
 *                 type: string
 *                 description: Usuario que agrega la canción
 *                 example: "ANA"
 *               ranking:
 *                 type: string
 *                 description: Ranking de la canción
 *                 example: "5/5"
*     responses:
 *       201:
 *         description: Canción marcada como favorita
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Canción marcada como favorita
 *                 favorito:
 *                   type: object
 *                   properties:
 *                     nombre_banda:
 *                       type: string
 *                       description: Nombre de la banda
 *                       example: Morat
 *                     cancion_id:
 *                       type: integer
 *                       description: ID de la canción
 *                       example: 1440840380
 *                     usuario:
 *                       type: string
 *                       description: Usuario que agrega la canción
 *                       example: Ana
 *                     ranking:
 *                       type: string
 *                       description: Ranking de la canción
 *                       example: "5/5"
 *                     nombre_tema:
 *                       type: string
 *                       description: Título de la canción
 *                       example: Cuánto Me Duele
 *       400:
 *         description: Datos faltantes o inválidos
 *       404:
 *         description: Canción no encontrada
 */
router.post('/favoritos', postFavorite);
/**
 * @swagger
 * /misfavoritos:
 *   get:
 *     summary: Obtener la lista de canciones favoritas
 *     tags: [Favoritos]
 *     responses:
 *       200:
 *         description: Lista de canciones favoritas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favoritos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_banda:
 *                         type: string
 *                         description: Nombre de la banda
 *                         example: Morat
 *                       cancion_id:
 *                         type: integer
 *                         description: ID de la canción
 *                         example: 1440840380
 *                       usuario:
 *                         type: string
 *                         description: Usuario que agregó la canción
 *                         example: ANA
 *                       ranking:
 *                         type: string
 *                         description: Ranking de la canción
 *                         example: "5/5"
 *                       nombre_tema:
 *                         type: string
 *                         description: Nombre del tema
 *                         example: Cuánto Me Duele
 *       500:
 *         description: Error interno del servidor
 */
router.get('/misfavoritos', getFavorites)

module.exports = router;
