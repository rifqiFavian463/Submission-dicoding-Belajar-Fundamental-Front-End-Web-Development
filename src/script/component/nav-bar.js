import "./navbar-nav.js";

class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    $(this).html(`
    <style>
      .navbar {
        background-color:#f8e367;
      }
      .navbar .navbar-brand {
        color:#1B2021;
        font-size:24px;
        font-weight : 600;
      }
      .navbar .navbar-brand span {
        color:#F58634;
      }
    </style>

    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#">Mangaku<span>.<span></a>
            <i class="bi-alarm"></i>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <navbar-nav></navbar-nav>
            </div>
        </div>
    </nav>
    `);
  }
}
customElements.define("nav-bar", NavBar);
