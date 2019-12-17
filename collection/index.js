(function () {
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []
    let searchResult =[]
  
    const dataPanel = document.getElementById('data-panel')
    const searchBtn = document.getElementById('submit-search')
    const searchInput = document.getElementById('search')
    const pagination = document.getElementById('pagination')
    const displayType = document.getElementById('display-type')

    const ITEM_PER_PAGE = 12
    let paginationData = []
    let displayMode = displayDataInCard
    let page = 1

    axios.get(INDEX_URL).then((response) => {
      data.push(...response.data.results)
      searchResult = data
      displayMode(data)
      getTotalPages(data)
      getPageData(1, data)

    }).catch((err) => console.log(err))
  
    // add show movie event listener
    dataPanel.addEventListener('click', (event) => {
        console.log(event.target)
      if (event.target.matches('.btn-show-movie')) {
        showMovie(event.target.dataset.id)
      }
      if(event.target.matches('.btn-add-favorite')){
        addFavoriteItem(event.target.dataset.id)
      }
    })
  
    // listen to search btn click event
    searchBtn.addEventListener('click', event => {
      event.preventDefault()
      const regex = new RegExp(searchInput.value, 'i')
      searchResult = data.filter(movie => movie.title.match(regex))
      page = 1
      getTotalPages(searchResult)
      getPageData(1, searchResult)
    })

    displayType.addEventListener('click', event=>{
      if(event.target.classList.contains('fa-th')){
        displayMode = displayDataInCard
      }
      if(event.target.classList.contains('fa-bars')){
        displayMode = displayDataInBar
      }
      if(searchInput.value){
        const regex = new RegExp(searchInput.value, 'i')
        searchResult = data.filter(movie => movie.title.match(regex))
      }
      console.log(searchResult.length)
      getTotalPages(searchResult)
      getPageData(page, searchResult)
    })

    pagination.addEventListener('click',(event)=>{
      if(event.target.tagName === 'A'){
        page = Number(event.target.dataset.page)
        getPageData(event.target.dataset.page, searchResult)
      }
    })
  
    function displayDataInCard (dataList) {
      let htmlContent = ''
      dataList.forEach(function (item, index) {
        htmlContent += `
          <div class="col-sm-3">
            <div class="card mb-2">
              <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
              <div class="card-body movie-item-body">
                <h6 class="card-title">${item.title}</h5>
              </div>
              <!-- "More" button -->
              <div class="card-footer">
                <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
                <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
              </div>
            </div>
          </div>
        `
      })
      dataPanel.innerHTML = htmlContent
    }

    function displayDataInBar (dataList){
      let htmlContent = ''
      dataList.forEach(function (item, index) {
        htmlContent += `
        <tr>
            <td class="col-6">${item.title}</td>
            <td class="col-6 text-right text-nowrap">
              <!-- "More" button -->
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <!-- "Favorite" button -->
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </td>
          </tr>
        `
      })
      dataPanel.innerHTML = `<table class="table"><tbody>${htmlContent}</tbody></table>`
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

    function addFavoriteItem (id){
        const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        const movie = data.find((ele)=>ele.id === Number(id))
    
        if(list.some((ele)=>ele.id === Number(id))){
            alert('this movie is already in your favorite list')
        }else{
            list.push(movie)
            alert('this movie was add to your favorite list')
            localStorage.setItem('favoriteMovies', JSON.stringify(list))
        }
    }

    function getTotalPages (data){
      let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
      let pageItemContent = ''
      for (let i = 1; i <= totalPages; i++) {
        pageItemContent += `
          <li class="page-item">
            <a class="page-link" href="javascript:;" data-page="${i}">${i}</a>
          </li>
        `
      }
      pagination.innerHTML = pageItemContent
    }

    function getPageData (pageNum, data) {
      paginationData = data || paginationData
      let offset = (pageNum - 1) * ITEM_PER_PAGE
      let pageData = data.slice(offset, offset + ITEM_PER_PAGE)
      displayMode(pageData)
    }
  })()