const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { getArtistId, getAlbumsByArtist } = require('./src/apiMusic');

const ARTIST_NAME = 'Guns N’ Roses';
const OUTPUT_FILE = 'guns-n-roses.json';

const app = express();

app.use(cors({origin: '*'}));

app.get('/', function (req, res) {
  res.send('Salut')
})


app.get('/albums', (req, res) => {
  // Lecture et renvoi des données du fichier JSON
  const data = fs.readFileSync(OUTPUT_FILE, 'utf-8');
  res.json(JSON.parse(data));
});

const server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  loadArtistJson();
  console.log("App listening at ", host, port)
});


const loadArtistJson = async () => {
  try {
    const artistId = await getArtistId(ARTIST_NAME);
    const albums = await getAlbumsByArtist(artistId);
    const output = {
      artist: ARTIST_NAME,
      albums: albums.map(album => ({
        title: album.title,
        date: album.date,
        trackCount: album['track-count']
      }))
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
