
var xhr = new XMLHttpRequest();
var page=1;
tvShows(page);

function nextPage() {
    page=page+1;
    tvShows(page);
}
function prPage() {
    page=page-1;
    tvShows(page);
}

    function tvShows (page){
        xhr.open ("GET", "https://api.themoviedb.org/3/discover/tv?api_key=48ce8804dfe7bdc32768e867459a2c2a&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&page="+page , true);
        xhr.send();
    }

xhr.onload = function () {
    let response = JSON.parse(xhr.response);
    console.log(response);
    let baseURL="https://image.tmdb.org/t/p/w154/";
    function resultElement(results){
        return `
                 <div class="item_poster">
                     <div class="tvShows">
                       <div class="tvShows_poster"><img class="imgTv" src="${baseURL.concat(results.poster_path)}"></div>
                       <div class="tvShows_wrapper">
                       <div class="tvShows_title"> <a>${results.original_name}</a></div>
                       <p class="overview">${results.overview}</p>
                       </div>
                     </div>
                 </div>
                 `
    }

    document.getElementById("output").innerHTML = `   
                <h2 class="title">Popular TV shows</h2>
                <div class="item_poster_wrapper">${response.results.map(resultElement).join('')}</div>
                <div class="pagination">
                <button id="previous" onclick="prPage()">Previous</button>
                <a class="pagination_number">${response.page}</a>
                <button id="next" onclick="nextPage()">Next</button>
                </div>
                `
    const titles = document.querySelectorAll('.overview');
    function sliceTitle() {
        titles.forEach(function (item) {
            if (item.textContent.length < 70) {
                return;
            } else {
                const str = item.textContent.slice(0, 200) + '...';
                item.textContent = str;
            }
        });
    }
    sliceTitle();
    }
