// window.localStorage.setItem("hello", 4);
// console.log(window.localStorage.getItem("hello"));
// window.localStorage.removeItem("hello");
const API_KEY = "1c107ac0fc3773c6b752c2fb2bb7c62f";
let activeLanguage = window.localStorage.getItem("lang") || "en-US";
const languageSelect = document.getElementById("language");
languageSelect.value = activeLanguage;
const movieContainer = document.querySelector(".movies");
const pagination = document.querySelector("#pagination");
let activePage = 1;
let totalPageCount = 0;
languageSelect.addEventListener("change", (e) => {
  activeLanguage = e.target.value;
  window.localStorage.setItem("lang", activeLanguage);
  getMovies();
});
const makePagination = () => {
  pagination.innerHTML = "";
  let start = activePage - 4 > 0 ? activePage - 4 : 1;
  let end = activePage + 4;
  const firsPage = document.createElement("li")
  firsPage.innerHTML = "&larr;"
  firsPage.addEventListener("click", () => {
      activePage = 1
      makePagination()
      showCountries()
  })
  pagination.append(firsPage)

  for (let i = start; i <= end && i <= totalPageCount; i++) {
    let page = document.createElement("li");
    page.textContent = i;
    if (i === activePage) {
      page.classList.add("active");
    }
    page.addEventListener("click", () => {
      activePage = i;
      getMovies();
    });
    pagination.append(page);
  }

  const lastPage = document.createElement("li");
  lastPage.innerHTML = "&rarr;";
  lastPage.addEventListener("click", () => {
    activePage = totalPageCount;
    showCountries();
    makePagination();
  });
  pagination.append(lastPage);
};
const getMovies = () => {
  movieContainer.innerHTML = "";
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${activeLanguage}&page=${activePage}`
  )
    .then((a) => a.json())
    .then((data) => {
      totalPageCount = data.total_pages;
      data.results.map((movie) => {
        const div = document.createElement("div");
        div.classList.add("movie");
        const title = document.createElement("h4");
        title.textContent = movie.title;
        const poster = document.createElement("img");
        poster.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        );
        div.append(poster, title);
        movieContainer.append(div);
      });
      makePagination();
    });
};
getMovies();


fetch( `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
.then((res)=>res.json())
.then((movies)=>{
    movies.results.map((k)=>{
        const datalist = document.getElementById("a2");
        const options = document.createElement("option");
        const poster = document.createElement("img");
        poster.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/original/${k.poster_path}`
        );
        options.textContent = k.title;
        // options.addEventListener("click", ()=>{
        //   if(k.title === movies.results.poster_path){
        //     const movies = document.querySelector(".movies"); //selectionu secmek ucun
        //     const search = document.getElementById("search");   
        //     let data = [];
        //     const showData = () => {
        //       products.innerHTML = "";
        //       let filteredMovies = data.filter((a) =>
        //         a.title.toLowerCase().startsWith(search.value.toLowerCase())
        //       );
        //       if (!filteredMovies.length) {
        //         let notFound = document.createElement("h1");
        //         notFound.classList.add("not__found");
        //         notFound.textContent = `${search.value} axtarışında heç nə tapılmadı..`;
        //         products.append(notFound);
        //         return;
        //       }
        //         const getMovies = () => {
        //           movieContainer.innerHTML = "";
        //           fetch(
        //             `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${activeLanguage}&page=${activePage}`
        //           )
        //             .then((a) => a.json())
        //             .then((data) => {
        //               totalPageCount = data.total_pages;
        //               data.results.map((movie) => {
        //                 const div = document.createElement("div");
        //                 div.classList.add("movie");
        //                 const title = document.createElement("h4");
        //                 title.textContent = movie.title;
        //                 const poster = document.createElement("img");
        //                 poster.setAttribute(
        //                   "src",
        //                   `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        //                 );
        //                 div.append(poster, title);
        //                 movieContainer.append(div);
        //               });
        //               makePagination();
        //             });
        //         };
        //         getMovies();
        //         };
        //         search.addEventListener("input", showData);

        //         fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        //           .then((res) => res.json())
        //           .then((responseData) => {
        //             data = responseData;
        //             showData();
        //             search.disabled = false;
        //           });

        //       }
        //     })
        options.append(poster);
        datalist.append(options);
        // console.log(k.title)
    });
});


