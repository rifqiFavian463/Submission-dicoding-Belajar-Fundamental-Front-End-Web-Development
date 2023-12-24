class CommentBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    $(this).html(`
        <style>
          .balloon {
            font-size : 12px;
            background-color:white;
            width : max-content;
            position : absolute;
            border-radius: 15px;
          }
          .balloon-1 {
            padding : 10px 15px;
            padding-bottom: 0;
            right:-30px;
            bottom:100px;
          }
          .balloon-2{
            left:-40px;
            top: 120px;
            padding : 10px 20px;
          }
          .balloon span {
            font-weight : 600;
            font-size : 14px;
          }
          @media only screen and (max-width: 767px) {
            .balloon {
              font-size : 8px;
            }
            .balloon-1 {
              bottom : 50px;
            }
          }  
        </style>
        
        <div class="balloon balloon-1">
          <span>Daily Update!</span>
          <p>Selalu update infomu </br>tentang dunia manga!<p/>
        </div>
        <div class="balloon balloon-2">Check Info Manga!</div>
    `);
  }
}
customElements.define("comment-bar", CommentBar);
