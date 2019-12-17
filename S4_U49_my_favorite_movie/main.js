// 資料
let movies = [{
  title: 'The Avengers',
  image: 'https://bit.ly/2NQOG6H',
  rating: 0
},
{
  title: 'Our Times',
  image: 'https://bit.ly/2OsGmv2',
  rating: 0
},
{
  title: 'Aquaman',
  image: 'https://bit.ly/2zmcLxo',
  rating: 0
}]

// 函式
function displayMovieList (data) {
  let htmlContent = `
    <table class="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    `

  for (let i = 0; i < data.length; i++) {
    htmlContent += `
        <tr>
          <td>
            <img src = ${data[i].image} width = "70" class="img-thumbnail" >
          </td>
          <td>${data[i].title}</td>
          <td>
            <span class="fa fa-thumbs-up"></span>
            <span class="fa fa-thumbs-down px-2"></span>
            <span>${data[i].rating}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-danger">X</button>
          </td>
        </tr>
      `
  }

  htmlContent += `
      </tbody>
    </table>
  `

  dataPanel.innerHTML = htmlContent
}

// 主程式
const dataPanel = document.querySelector('#data-panel')
displayMovieList(movies)

//event listener
dataPanel.addEventListener('click',function(){
  const target = event.target
  const rateElement = target.parentElement.lastElementChild

  // 正評
  if(target.classList.contains('fa-thumbs-up')){
    rateElement.innerHTML = parseInt(rateElement.innerHTML) + 1;
  }
  // 負評
  if(target.classList.contains('fa-thumbs-down')){
    rateElement.innerHTML = parseInt(rateElement.innerHTML) - 1;
  }

  // 刪除電影
  if(target.classList.contains('btn-danger') ){
    const parentElement = target.parentElement
    const row = parentElement.parentElement
    row.remove()
  }
})
