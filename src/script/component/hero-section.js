import css from "bootstrap/dist/css/bootstrap.min.css";
import icon from "@fortawesome/fontawesome-free/css/all.css";
import "./comment-bar.js";

class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      ${css}
      ${icon}
      .hero-container {
        margin-top : 6em;
        margin-bottom : 6em;
      }
      .claim-line {
        font-weight : 600;
        text-transform : uppercase;
        background-color : rgb(34 ,211 ,238);
        font-size : 12px;
        border-radius : 20px;
        padding : 10px 30px;
        width:max-content;
      }
      .tagline {
        font-size : 40px;
        font-weight: 900;
        margin-top : 20px
      }
      .description {
        font-size : 16px;
        margin-top : 20px;
      }
      .thumb-container{
        width : 400px;
        height : 400px;
        border-radius : 50%;
        position : relative;
        background-color : #F58634;
        animation-name : circle;
        animation-duration: 2s;
      }
      .thumb-container img {
        height : 500px;
        top:-30px;
        left : 40px;
        object-fit : cover;
        position : absolute;
        animation-name : thumb;
        animation-duration : 3s;
      }

      @keyframes thumb {
        from {
          top : -300px;
          transform : scale(1);
        }to {
          top : -30px;
          transform : scale(1);
        }
      }

      @keyframes circle {
        from {
          transform : scale(0);
        }to {
          transform : scale(1)
        }
      }
      @media only screen and (max-width: 767px) {
        .hero-container {
          margin-top : 3em;
          margin-bottom: 1em;
        }

        .copywriting-container {
          padding: 30px;
        }
        .thumb-container {
          width:300px;
          height:300px;
          margin-bottom : 6em;
        }
        .thumb-container img {
          height:400px;
        }
      }
    </style>

    <div class="container hero-container">
        <div class="row d-flex flex-column-reverse flex-md-row">
            <div class="col-md copywriting-container">
            
                <span class="claim-line">No.1 Manga Info di Indonesia</span>
                <div class="tagline">Terdepan dalam Dunia Manga Terkini.</div>
                <p class="description">"Mangaku, sebagai platform utama untuk komik online, menampilkan berbagai judul terbaru, artikel ulasan mendalam, serta pembaruan berkala untuk menyenangkan penggemar setia komik dari berbagai belahan dunia secara lengkap dan mendetail."</p>
            </div>
            <div class="col-md d-flex justify-content-center justify-content-md-end align-items-center">
                <div class="thumb-container p-3">
                  <img src="images/thumb.png" alt="hero-thumbnail" />
                  <comment-bar></comment-bar>
                </div>
            </div>
        </div>
    </div>   
    `;
  }
}
customElements.define("hero-section", HeroSection);
