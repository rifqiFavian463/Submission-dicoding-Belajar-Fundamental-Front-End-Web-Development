async function main() {
  const applySlider = (sliderElement, next, prev) => {
    $(sliderElement).slick({
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
      prevArrow: $(prev),
      nextArrow: $(next),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  const getPopularComic = async () => {
    try {
      const popularComics = await fetch("https://komiku-api.fly.dev/api/comic/popular/page/1");
      const popularComicsJSON = await popularComics.json();
      renderComics(".popular-comic", popularComicsJSON.data.slice(0, 10));
      applySlider(".popular-comic", ".next-popular", ".prev-popular");
    } catch (err) {
      fallbackResult(err);
    }
  };

  const getRecommendComic = async () => {
    try {
      const recommendComics = await fetch("https://komiku-api.fly.dev/api/comic/recommended/page/1");
      const recommendComicsJSON = await recommendComics.json();
      renderComics(".recommend-comic", recommendComicsJSON.data.slice(0, 10));
      applySlider(".recommend-comic", ".next-recommend", ".prev-recommend");
    } catch (err) {
      fallbackResult(err);
    }
  };
  const getAllComic = async () => {
    try {
      const allComics = await fetch("https://komiku-api.fly.dev/api/comic/list");
      const allComicsJSON = await allComics.json();
      renderComics(".container-list", allComicsJSON.data.slice(0, 25));
    } catch (err) {
      fallbackResult(err);
    }
  };

  const getComicInfo = async (endpoint) => {
    try {
      const comicInfo = await fetch(`https://komiku-api.fly.dev/api/comic/info/${endpoint}`);
      const comicInfoJSON = await comicInfo.json();
      return comicInfoJSON.data;
    } catch (err) {
      fallbackResult(err);
    }
  };

  $("body").on("click", async function (e) {
    if (e.target && e.target.classList.contains("more-info")) {
      const comicInfo = await getComicInfo(e.target.dataset.endpoint);
      renderComicInfo(comicInfo, e.target.dataset.desc);
    }
  });

  const getComicQuery = async (title) => {
    try {
      const resultComicQuery = await fetch(`https://komiku-api.fly.dev/api/comic/search/${title}`);
      const resultComicQueryJSON = await resultComicQuery.json();
      return resultComicQueryJSON.data;
    } catch (err) {
      fallbackResult(err);
    }
  };

  $(".search-button").on("click", async () => {
    {
      const titleQuery = $(".input-search").val();
      if (titleQuery == "") return getAllComic();
      const comicQuery = await getComicQuery(titleQuery);
      if (comicQuery == null) return fallbackResult("Judul komik yang kamu cari tidak ditemukan...");
      renderComics(".container-list", comicQuery);
    }
  });
  const fallbackResult = (err) => {
    $(".container-list").html(err);
  };

  const renderComics = (parentClass, comics) => {
    let htmlResult = "";
    comics.forEach((comic) => {
      htmlResult += `
      <div class="card-comic">
        <img src="${comic.image}" alt="" />
        <div class="card-description d-flex flex-column p-3">
          <span class="type">${comic.type ? comic.type : "Manga"}</span>
          <span class="title mt-2">${comic.title}</span>
        </div>
        <button type="button" class="btn more-info" data-bs-toggle="modal" data-bs-target="#exampleModal" data-endpoint="${comic.endpoint}" data-desc="${
        comic.desc
      }">More info <i class="fa-solid fa-arrow-right"></i></button>
      </div>
        `;
    });
    $(parentClass).html(htmlResult);
  };

  const renderComicInfo = (infoComic, comicDesc) => {
    $(".modal-dialog").html(`
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Komik Info</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container d-flex flex-column justify-content-center align-items-center">
          <img src="${infoComic.thumbnail}" alt="manga-thumbnail" />
          <span class="title mt-3">${infoComic.title}</span>
          <div class="row mt-3 main-info">
            <div class="col">
              <span>Type : ${infoComic.type}</span>
              <span>Author : ${infoComic.author}</span>
            </div>
            <div class="col">
              <span>Status : ${infoComic.status}</span>
              <span>Rating : ${infoComic.rating}</span>
            </div>
          </div>
          <div class="grid row mt-3 genre column-gap-2 row-gap-2 justify-content-center">
          </div>
          <p class="mt-3 desc">${comicDesc == undefined ? comicDesc : "Deskripsi tidak ditemukan"}</p>
          <div class="grid row mt-3 chapter-list row-gap-2 justify-content-center">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-word-close" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    `);
    infoComic.genre.map((g) => {
      document.querySelector(".genre").innerHTML += `<span class="g-col">${g}</span>`;
    });
    infoComic.chapter_list.map((chapter) => {
      document.querySelector(".chapter-list").innerHTML += `<span class="g-col">${chapter.name}</span>`;
    });
  };

  await getPopularComic();
  await getRecommendComic();
  await getAllComic();
}
export default main;
