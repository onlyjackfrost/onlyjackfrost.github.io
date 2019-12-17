const experiences = ['菜鳥後端工程師', '南部碩士畢業生']
const h6 = document.querySelector('h6')
experiences.forEach((ele)=>{
  const li = document.createElement('li')
  li.innerHTML = ele;
  h6.append(li)
})

const img = document.querySelector('.rounded')
const name = document.querySelector('.my-name')
const info = document.querySelector('.info')
name.textContent  = 'Andy Yen'
info.textContent = '我是工作剛滿一年的Node.js後端工程師，目標是成為能設計出好產品的全端工程師'

img.setAttribute('src','https://assets-lighthouse.s3.amazonaws.com/uploads/user/photo/2500/medium_38757671_2402263096456822_6010703368069054464_o.jpg')
