const playerBoards = document.querySelector('tbody').children
for (let i = 0;i<playerBoards.length;i++){
    const score = playerBoards[i].children[1].innerHTML
    console.log(score)
    if(score > 20){
        const thumb = document.createElement('i')
        thumb.className='fa fa-thumbs-up'
        const name = playerBoards[i].children[0]
        name.prepend(thumb)
    }
    
}