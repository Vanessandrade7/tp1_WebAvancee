const axios = require('axios'); // Using require for importing

const MUSICBRAINZ_API_URL = 'https://musicbrainz.org/ws/2';

async function getArtistId(artistName) {
  try {
    const response = await axios.get(`${MUSICBRAINZ_API_URL}/artist`, {
      params: {
        query: artistName,
        fmt: 'json'
      }
    });

    if (response.data && response.data.artists && response.data.artists.length > 0) {
      return response.data.artists[0].id;
    } else {
      throw new Error('Artist not found');
    }

  } catch (error) {
    console.error(`Error fetching artist ID for ${artistName}:`, error);
    throw error;  // or return some default/fallback value if you prefer
  }
}

async function getAlbumsByArtist(artistId) {
  try {
    const response = await axios.get(`${MUSICBRAINZ_API_URL}/release`, {
      params: {
        artist: artistId,
        fmt: 'json'
      }
    });

    if (response.data && response.data.releases) {
      return response.data.releases;
    } else {
      throw new Error('No albums found for the given artist');
    }

  } catch (error) {
    console.error(`Error fetching albums for artist ID ${artistId}:`, error);
    throw error;  // or return an empty array if you prefer: return [];
  }
}

// Exporting using module.exports
module.exports = {
  getArtistId,
  getAlbumsByArtist
};
