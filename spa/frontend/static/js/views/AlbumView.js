export default class AlbumView {
  constructor(params) {
    this.id = params.id;
  }

  async getAlbumDetails() {
    // Fetches album details from the MusicBrainz API.
    // In a real-world scenario, you might want to add error handling here.
    const response = await axios.get(`https://musicbrainz.org/ws/2/release/${this.id}`, {
      params: {
        fmt: 'json'
      }
    });
    return response.data;
  }

  async getHtml() {
    const album = await this.getAlbumDetails();
    return `
          <h1>${album.title}</h1>
          <p>Date of Release: ${album.date}</p>
          <p>Track Count: ${album['track-count']}</p>
      `;
  }
}
