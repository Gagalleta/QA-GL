const axios = require('axios')
const NodeCache = require('node-cache')
const favorites = []
// Configuracion caché, expiración en 3600 segundos
const cache = new NodeCache({ stdTTL: 3600 })

// 1-. Obtener canciones de una banda desde la API de Itunes
async function getTracksByBand(req, res) {
  const bandName = req.query.name
  if (!bandName) {
    return res.status(400).json({ error: 'Debe ingresar el nombre de la banda' })
  }

  const cacheKey = `search_${bandName}`
  // Verificar si los datos están en caché
  if (cache.has(cacheKey)) {
    console.log("Obteniendo datos desde la caché...")
    return res.json(cache.get(cacheKey))
  }

  try {
    console.log("Llamando a la API de Itunes...")
    // Obtiene las canciones del artista buscado
    const tracks = await getByArtistName(bandName)
    // Obtiene solo los primeros 25
    const filteredTracks = tracks.slice(0, 25)

    const albums = []
    const songs = filteredTracks.map(track => {
      // Obtener los albumes sin repetir
      if (!albums.includes(track.collectionName)) {
        albums.push(track.collectionName)
      }

      return {
        cancion_id: track.trackId,
        nombre_album: track.collectionName,
        nombre_tema: track.trackName,
        preview_url: track.previewUrl,
        fecha_lanzamiento: track.releaseDate,
        precio: {
          valor: track.collectionPrice,
          moneda: track.currency
        }
      }
    })

    const result = {
      total_albumes: albums.length,
      total_canciones: songs.length,
      albumes: albums,
      canciones: songs
    }
    console.log(songs); // Verificar los datos transformados
    console.log(albums); // Verificar los álbumes

    // Guarda el result en caché
    cache.set(cacheKey, result)

    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la API de Itunes' })
  }
}

// 2-. Agregar una canción a favoritos
async function postFavorite(req, res) {
  try {
    const { nombre_banda, cancion_id, usuario, ranking } = req.body

    // campos obligatorios
    if (!nombre_banda || !cancion_id || !usuario || !ranking) {
      return res.status(400).json({
        error: 'Campos obligatorios: nombre_banda, cancion_id, usuario, ranking'
      })
    }

  
    // Obtener canciones por nombre de banda
    const tracks = await getByArtistName(nombre_banda)
    if (!tracks || !tracks.length) {
      return res.status(404).json({
        error: 'No se encontraron canciones para la banda'
      })
    }

    // Validar que la canción existe
    const validTrack = tracks.find(track => track.trackId === cancion_id)
    if (!validTrack) {
      return res.status(404).json({
        error: 'La canción con ese Id no existe.'
      })
    }

    // Calcular el ranking actual para este usuario y aumentar de 1 en 1
    const userFavorites = favorites.filter(fav => fav.usuario === usuario)
    const currentRanking = userFavorites.length + 1

    // Validar que solo sean ranking de 5 canciones
    if (currentRanking > 5) {
      return res.status(400).json({
        error: 'No puedes agregar más de 5 canciones como favoritas.'
      });
    }

    // guardar la canción como favorita
    const favorite = {
      nombre_banda,
      cancion_id,
      usuario,
      ranking: `${currentRanking}/5`,
      nombre_tema: validTrack.trackName
    }

    favorites.push(favorite)

    res.status(201).json({
      message: 'Canción agregada como favorita',
      favorito: favorite
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar a favoritos' })
  }
}

// Endpoint extra que lista mis favoritos.
async function getFavorites(req, res) {
  res.json({ favoritos: favorites })
}

// Funcion reutilizable que consulta la API por term
async function getByArtistName(bandName) {
  // Obtiene todo resultado
  const response = await axios.get(`https://itunes.apple.com/search?term=${bandName}`)
  const tracks = response.data.results
  // Filtra segun artistName y kind "song"
  return tracks.filter(track => track.artistName === bandName && track.kind === 'song')
}

module.exports = { getTracksByBand, postFavorite, getFavorites }
