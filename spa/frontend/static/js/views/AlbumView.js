export default class AlbumView {
  constructor(params) {
    this.id = params.id;
  }
  async getAlbumDetails() {
    const response = await fetch("http://localhost:8081/albums", {
      mode: 'cors' // or 'no-cors' if you want to avoid CORS checks, but this has its own implications
    });
    return response.json();
  }

  async getHtml() {
    const album = (await this.getAlbumDetails()).find(item => item.id === this.id);
    return `
          <h1>${album.title}</h1>
          <p>Date of Release: ${album.date}</p>
          <p>Track Count: ${album['track-count']}</p>
      `;
  }
}
