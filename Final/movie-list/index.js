
  const apiBaseUrl = `https://movie-list.alphacamp.io/api/v1/`
  const imgBaseUrl = `https://movie-list.alphacamp.io/posters/`
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
        view.navOnClickChange(element)
      })
    })

  },

  requestMovies: ()=>{
    const url = apiBaseUrl + 'index'
    const res = axios
  }
}

const navElement = document.querySelector('.nav')
const dataPanel = document.querySelector('#data-panel')
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

  },

  navOnClickChange: (element)=>{
    view.deactivateAllNav()
    view.setNavActive(element)
  },

  setNavActive:(element)=>{
    element.classList.add('active')
  },

  deactivateAllNav:()=>{
    const activeNav = document.querySelectorAll('.active')
    activeNav.forEach((nav)=>{
      nav.classList.remove('active')
    })
  }
}
controller.init()