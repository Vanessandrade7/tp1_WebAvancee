export default class Album {
  async getAlbums() {
    const response = await fetch("http://localhost:8081/albums", {
      mode: 'cors' // or 'no-cors' if you want to avoid CORS checks, but this has its own implications
    });
    return response.json()
  }

  async getHtml() {
    const albums = (await this.getAlbums()).albums;
    return `
          <h1>Liste des albums</h1>
          <ul>
              ${albums.map(album => `<li><a href="/album-view/${album.id}" data-link>${album.title}</a></li>`).join("")}
          </ul>
      `;
  }
}
