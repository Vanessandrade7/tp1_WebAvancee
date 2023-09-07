import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

  constructor(params) {
    super(params)
    this.setTitle('Dashboard')
  }

  async getHtml() {
    return `
    <div class="container mt-5">
          <h1 class="display-4">Guns N' Roses Albums</h1>
          <p class="lead">Explore the discography of one of the most iconic rock bands of all time. From "Appetite for Destruction" to "Chinese Democracy", delve into the musical journey of Guns N' Roses.</p>
          <p>
              <a href="/albums" class="btn btn-primary" role="button">View Albums</a>
          </p>
      </div>
        `
  }

}