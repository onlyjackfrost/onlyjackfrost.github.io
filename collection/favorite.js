(function () {
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const dataPanel = document.getElementById('data-panel')
    const data = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  
    displayDataList(data)
  
    dataPanel.addEventListener('click', (event) => {
      if (event.target.matches('.btn-show-movie')) {
        showMovie(event.target.dataset.id)
      }
      if(event.target.matches('.btn-remove-favorite')){
        removeFavoriteItem(event.target.dataset.id)
      }
    })

    function displayDataList (data) {
      let htmlContent = ''
      data.forEach(function (item, index) {
        htmlContent += `
          <div class="col-sm-3">
            <div class="card mb-2">
              <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
              <div class="card-body movie-item-body">
                <h5 class="card-title">${item.title}</h5>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
                <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
              </div>
            </div>
          </div>
        `
      })
      dataPanel.innerHTML = htmlContent
    }

    function showMovie (movieId) {
        // get elements
        const modalTitle = document.getElementById('show-movie-title')
        const modalImage = document.getElementById('show-movie-image')
        const modalDate = document.getElementById('show-movie-date')
        const modalDescription = document.getElementById('show-movie-description')
    
        // set request url
        const url = INDEX_URL + movieId
        console.log(url)
    
        // send request to show api
        axios.get(url).then(response => {
          const data = response.data.results
    
          // insert data into modal ui
          modalTitle.textContent = data.title
          modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
          modalDate.textContent = `release at : ${data.release_date}`
          modalDescription.textContent = `${data.description}`
        })
      }

      function removeFavoriteItem (id){
        const idx =  data.findIndex((ele)=> ele.id === Number(id))
        if(idx !== -1){
            data.splice(idx, 1)
            alert('movies has remove from favorite list')
        } else {
            alert('movies not found')
        }
        localStorage.setItem('favoriteMovies', JSON.stringify(data))
        displayDataList(data)
      }
})()