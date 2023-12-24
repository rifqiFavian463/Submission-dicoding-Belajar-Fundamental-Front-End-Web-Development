class NavbarNav extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    $(this).html(`
        <style>
            .nav-link {
                font-weight : 600;
            }
            .nav-link:hover {
                color: #F58634;
            }
        </style>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="#popular">Popular</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#recommended">Recommended</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#all">All</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#about">About</a>
            </li>
        </ul>
        `);
  }
}
customElements.define("navbar-nav", NavbarNav);
