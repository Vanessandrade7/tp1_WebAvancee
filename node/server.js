const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { getArtistId, getAlbumsByArtist } = require('./src/apiMusic');
const { PORT } = require('./config.js')
const { API_KEY } = require('./config.js')


const ARTIST_NAME = 'Guns N’ Roses';
const OUTPUT_FILE = 'guns-n-roses.json';

const app = express();

app.use(cors({ origin: '*' }));

app.get('/', function (req, res) {
  res.send('Salut')
})


app.get('/albums', (req, res) => {
  // Lecture et renvoi des données du fichier JSON
  const data = fs.readFileSync(OUTPUT_FILE, 'utf-8');
  res.json(JSON.parse(data));
});

const server = app.listen(PORT, function () {
  var host = server.address().address
  var port = server.address().port
  loadArtistJson();
  console.log("App listening at ", host, port)
});


const loadArtistJson = async () => {
  try {
    const artistId = await getArtistId(ARTIST_NAME);
    const albums = await getAlbumsByArtist(artistId);

    const seenTitles = new Set();
    const uniqueAlbums = albums.filter(album => {
      if (seenTitles.has(album.title)) {
        return false; // skip this album, as we've seen this title before
      }
      seenTitles.add(album.title);
      return true; // keep this album, as its title is unique so far
    });

    const formattedAlbums = uniqueAlbums.map(album => ({
      title: album.title,
      date: album.date,
      id: album.id,
      trackCount: album['track-count']
    }));


    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(formattedAlbums, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
