const navElement = document.querySelector('.nav')

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
}


const controller = {
  showCategories : (categories) => {
    const innerHtml = categories.reduce((html,category)=>{
      html = html + view.displayCategory(category)
      return html
    },'')
    navElement.innerHTML = innerHtml;
  }
}

const view = {
  displayCategory:(category)=>{
    return `
    <li class="nav-item border">
      <a class="nav-link text-body font-weight-bold" href="#">${category}</a>
    </li>
    `
  },

}
controller.showCategories(model.categories)