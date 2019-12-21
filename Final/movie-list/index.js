
const apiBaseUrl = `https://movie-list.alphacamp.io/api/v1/`
const imgBaseUrl = `https://movie-list.alphacamp.io/posters/`
const navElement = document.querySelector('.nav')
const dataPanel = document.querySelector('#data-panel')

const model = {
  categories : [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "History",
      "Horror",
      "Music",
      "Mystery",
      "Romance",
      "Science Fiction",
      "TV Movie",
      "Thriller",
      "War",
      "Western"
  ],
  movies:[],
}



const controller = {
  init : ()=>{
    view.showCategories(model.categories)
    const categoryElements = document.querySelectorAll('.nav-link')
    categoryElements.forEach((element)=>{
      element.addEventListener('click', (event) => {
        controller.navOnClickChange(element)
      })
    })
    controller.requestAndSetMovies()
  },

  requestAndSetMovies: ()=>{
    const url = apiBaseUrl + 'movies'
    axios.get(url)
      .then((res)=>{
        console.log(res.data.results[0])
        model.movies = res.data.results
      })
      .catch((err)=>{
        console.log(err)
      }).then(()=>{
        view.showMovies(model.movies)
      })
  },

  navOnClickChange: (element)=>{
    controller.deactivateAllNav()
    controller.setNavActive(element)
    const tag = element.innerHTML
    const movies = controller.filterMovie(tag)
    console.log(movies)
    view.showMovies(movies)
  },

  setNavActive:(element)=>{
    element.classList.add('active')
  },

  deactivateAllNav:()=>{
    const activeNav = document.querySelectorAll('.active')
    activeNav.forEach((nav)=>{
      nav.classList.remove('active')
    })
  },
  filterMovie : (tag)=>{
    return model.movies.filter((movie) => {
      return util.convertIdx2TagName(movie.genres).some((ele)=>ele===tag)
    })
  }

}


const view = {
  showCategories : (categories) => {
    const innerHtml = categories.reduce((html,category, idx)=>{
      html = html + view.displayCategory(category,idx)
      return html
    },'')
    navElement.innerHTML = innerHtml;
  },

  showMovies : (movies)=>{
    const innerHtml = movies.reduce((html, movie)=>{
      html = html + view.displayMovieCard(movie)
      return html
    },'')
    dataPanel.innerHTML = innerHtml;
  },

  displayCategory:(category,idx)=>{
    return `
    <li class="nav-item border">
      <a class="nav-link text-body font-weight-bold" data-index=${idx} href="#">${category}</a>
    </li>
    `
  },

  displayMovieCard:(movie)=>{
    const tags = util.convertIdx2TagName(movie.genres)
    return `
    <div class="col-sm-3">
      <div class="card mb-2" data-index="${movie.id}">
          <img class="card-img-top " src="${imgBaseUrl+movie.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
              <h6 class="card-title">${movie.title}</h6>
          </div>
            <!-- tag list -->
          <div class="card-footer d-flex flex-row flex-wrap">
                ${tags.reduce((html, tag)=>{
                  return html + `<div class="tag">${tag}</div>`
                },'')}
          </div>
      </div>
    </div>
    `
  },
}

const util={
  convertIdx2TagName : (idxs)=>{
    if(!Array.isArray(idxs)) return []
    return idxs.map((idx)=>model.categories[idx-1])
  }
}

controller.init()
