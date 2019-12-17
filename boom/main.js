const view = {
    /**
     * displayFields()
     * 顯示踩地雷的遊戲版圖在畫面上，
     * 輸入的 rows 是指版圖的行列數。
     */
    displayFields(fields) {
      let rows = []
      const totalRow = fields.length / model.colLen
      const board = document.querySelector('.board')
      for(let row = 0; row <= totalRow; row++){
        rows = [...rows, fields.slice(row*model.colLen, (row+1)*model.colLen)]
      }
      let innerHtml = ''
      rows.forEach((row, y)=>{
        innerHtml += `<div class="row">`
        row.forEach((ele, x)=>{
            innerHtml +=`<div class="cell back" data-index="${y*model.colLen + x}"> </div>`
        })
        innerHtml += `</div>`
      })
      board.innerHTML = innerHtml
    },
  
    /**
     * showFieldContent()
     * 更改單一格子的內容，像是顯示數字、地雷，或是海洋。
     */
    showFieldContent(field) {
      const index = Number(field.dataset.index)
      if(model.isMine(index)){
        field.innerHTML = `<i class="fas fa-bomb"></i>`
      }else{
        const number = controller.getFieldData(index)
        if(number)field.innerHTML = `${number}`
      }
      field.classList.remove('back')
    },

    /**
     * renderTime()
     * 顯示經過的遊戲時間在畫面上。
     */
    renderTime(time) {},
  
    /**
     * showBoard()
     * 遊戲結束時，或是 debug 時將遊戲的全部格子內容顯示出來。
     */
    showBoard() {
      document.querySelectorAll('.cell').forEach((field)=>{
        if(field.classList.contains('back')){
          console.log('show')
          this.showFieldContent(field)
        }
      })
    }
  }
  
  const controller = {
    gameState:{
      waiting:'waiting',
      finished:'finished'
    },
    /**
     * createGame()
     * 根據參數決定遊戲版圖的行列數，以及地雷的數量，
     * 一定要做的事情有：
     *   1. 顯示遊戲畫面
     *   2. 遊戲計時
     *   3. 埋地雷
     *   4. 綁定事件監聽器到格子上
     */
    createGame(numberOfRows, numberOfMines) {
        //初始化
        this.setMinesAndFields(numberOfRows, numberOfMines)
        model.rowLen = numberOfRows
        // 畫格子
        view.displayFields(model.fields)
        // 綁定事件
        document.querySelectorAll('.cell').forEach((field)=>{
          field.addEventListener('click',event=>{
            this.dig(field)
          })
          field.addEventListener('contextmenu',event=>{
            event.preventDefault();
            this.addFlag(field)
          })
        })
        model.timerId = model.setTimmer()
        // console.log('************ fields *************')

        // for(let i = 0; i<= numberOfRows; i++){
        //   console.log(model.fields.slice(i*model.colLen, (i+1)*model.colLen))
        // }
        // console.log('************ mines *************')
        // console.log(model.mines)
        // console.log('==============================')
        // view.showBoard()
    },
    
    /**
     * setMinesAndFields()
     * 設定格子的內容，以及產生地雷的編號。
     */
    setMinesAndFields(numberOfRows, numberOfMines) {
      model.mines = Array.from(Array(numberOfMines).keys())
      model.fields = utility.getRandomNumberArray(numberOfRows * model.colLen)
    },
  
    /**
     * getFieldData()
     * 取得單一格子的內容，決定這個格子是海洋還是號碼，
     * 如果是號碼的話，要算出這個號碼是幾號。
     * （計算周圍地雷的數量）
     */
    getFieldData(index) {
      let number = 0
      const aroundFieldIdx = model.getAroundField(index)
      aroundFieldIdx.forEach((index)=>{
        if(index > 0 && index < model.fields.length && model.isMine(index)) number += 1
      })
      return number
    },
  
    /**
     * dig()
     * 使用者挖格子時要執行的函式，
     * 會根據挖下的格子內容不同，執行不同的動作，
     * 如果是號碼或海洋 => 顯示格子
     * 如果是地雷      => 遊戲結束
     */
    dig(field) {
      const index = Number(field.dataset.index)
      if(!field.classList.contains('back') || field.classList.contains('flag'))
        return
      
      if(model.isMine(index)){
        view.showBoard()
        this.gameState = 'finished'
        clearInterval(model.timerId);
        alert('boom!')
        return
      }
      view.showFieldContent(field)
      this.checkGameFinished()
    },
    /**
     * addFlag()
     * 新增或移除旗子
     */
    addFlag(field){
      const index = field.dataset.index
      // 踩過的不能立旗
      if(!field.classList.contains('back')) return
      if(field.classList.contains('flag')){
        // 拿掉立過的旗
        field.innerHTML = ''
        field.classList.remove('flag')
        model.flagedFields.splice(model.flagedFields.indexOf(model.fields[index]),1)
      }else{
        // 立旗
        field.innerHTML = '<i class="fas fa-flag"></i>'
        field.classList.add('flag')
        model.flagedFields.push(model.fields[index])
      }
      this.checkGameFinished()
    },
    /**
     * checkGameFinished()
     * 每個動作結束時檢查是否贏得比賽
     * 是=>展開地圖 停止計時
     */
    checkGameFinished(){
      if(!this.flagAllMines()) return 
      if(!this.isDigAll())return 
      clearInterval(model.timerId);
      alert('you won!')
      view.showBoard();
    },

    isDigAll(){    
      return document.querySelectorAll('.back').length === model.mines.length ? true : false
    },

    flagAllMines(){
      model.flagedFields.sort((a, b) => a - b)
      if(model.flagedFields.length !== model.mines.length) return false
      model.flagedFields.forEach((ele,idx)=>{
        if(ele !== model.mines[idx]) return false
      }) 
      return true
    },
    // spreadOcean(field) {}
  }
  
  const model = {
    timerId:0,

    flagedFields:[],
    /**
     * mines
     * 存放地雷的編號（第幾個格子）
     */
    colLen:9,
    rowLen:0,
    mines: [],
    /**
     * fields
     * 存放格子內容，這裡同學可以自行設計格子的資料型態，
     */
    fields: [],
  
    /**
     * isMine()
     * 輸入一個格子編號，並檢查這個編號是否是地雷
     */
    isMine(index) {
      return this.mines.includes(this.fields[index])
    },
    /**
     * setTimmer()
     * 讓timer開始計時
     */
    setTimmer(){
      return setInterval(()=>{
        const timer = document.querySelector('.timer p')
        timer.innerHTML = `${Number(timer.innerHTML) + 1}`
      },1000)
    },
    getAroundField(index){
      const x = index % model.colLen 
      const y = Math.floor(index / model.colLen)
      const aroundCordinate = [
        {x: x-1, y: y-1},
        {x, y: y-1},
        {x: x+1, y: y-1},
        {x: x-1, y},
        {x: x+1, y},
        {x: x-1, y: y+1},
        {x: x, y: y+1},
        {x: x+1, y: y+1},
      ]
      return utility.turnCordinateToIndex(aroundCordinate)
    }
  }
  
  const utility = {
    /**
     * getRandomNumberArray()
     * 取得一個隨機排列的、範圍從 0 到 count參數 的數字陣列。
     * 例如：
     *   getRandomNumberArray(4)
     *     - [3, 0, 1, 2]
     */
    getRandomNumberArray(count) {
      const number = [...Array(count).keys()]
      for (let index = number.length - 1; index > 0; index--) {
        let randomIndex = Math.floor(Math.random() * (index + 1))
        ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
      }
      return number
    },

    turnCordinateToIndex(cordinates){
      let indexs = []
      cordinates.forEach(({x,y})=>{
        if(x >= 0 && x < model.colLen){
          if(y >= 0 && y < model.rowLen){
            indexs.push(y*model.colLen + x)
          }
        }
      })
      return indexs
    }
  }
  
  controller.createGame(3, 3)