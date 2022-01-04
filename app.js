
let TOTALROW = 10
let TOTALCOL = 10 //(default grid size)


$(() => {
  indexLevel = $("#level")[0].selectedIndex
  console.log('indexLevel', indexLevel)
  if (indexLevel === 1) {
    TOTALROW = 15
    TOTALCOL = 15
  }
  if (indexLevel === 2) {
    TOTALROW = 20
    TOTALCOL = 20
  }
  if (indexLevel === 0) {
    TOTALROW = 10
    TOTALCOL = 10
  }
  //
}
)

// $(":root")[0].style.setProperty('--totalRow', TOTALROW)
// $(":root")[0].style.setProperty('--totalCol', TOTALCOL)
let second = 0
let minute = 0
let cron // declare cron at global so both start and stop timer functions can use

/////////////////////// M of the MVC
const createCellData = (row, col) => {
  return {
    row: row,
    col: col,
    isMine: 0,
    isOpened: 0,
    isFlagged: 0,
    neighborMineCount: 0
  }
}

const createGridData = () => {
  console.log('createGridData')
  let gridData = []
  for (let i = 0; i < TOTALROW; i++) {
    let row = []
    for (let j = 0; j < TOTALCOL; j++) {
      let cell = createCellData(i, j)
      row.push(cell)
    }
    gridData.push(row)
  }
  return gridData
}

// const app = {
//   totalMines: Math.floor(TOTALCOL * TOTALROW * 0.16),
//   grid: createGridData(TOTALCOL, TOTALROW)
// }

const createMine = (grid, mineToPlace) => {
  console.log('place mines')
  while (mineToPlace > 0) {
    let randRowIndex = Math.floor(Math.random() * TOTALROW)
    let randColIndex = Math.floor(Math.random() * TOTALCOL)
    if (grid[randRowIndex][randColIndex].isMine === 0) {
      grid[randRowIndex][randColIndex].isMine = 1
      mineToPlace -= 1
    }
  }
}

const getNeighborMineCount = (grid, row, col) => {
  console.log('getNeighborMineCount')
  let neighborMineCount = 0
  const dr = [-1, -1, -1, 0, 0, +1, +1, +1]
  const dc = [-1, 0, +1, -1, +1, -1, 0, +1]
  for (let i = 0; i < dr.length; i++) {
    let neighborRow = row + dr[i]
    let neighborCol = col + dc[i]
    if ((neighborRow >= 0) && (neighborRow < TOTALROW) && (neighborCol >= 0) && (neighborCol < TOTALCOL)) {
      if (grid[neighborRow][neighborCol].isMine === 1) {
        neighborMineCount += 1
      }
    }
  }
  return neighborMineCount
}

const updateNeighborMineCount = (grid) => {
  console.log('updateNeighborMineCount')
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      grid[row][col].neighborMineCount = getNeighborMineCount(grid, row, col)
    }
  }
}


//////////////////////////////////////////// V of MVC
const createEmptyGrid = (totalRow, totalCol) => {
  for (let i = 0; i < totalRow * totalCol; i++) {
    row = Math.floor(i / totalCol) //from 0 to totalRow -1
    col = i % totalCol //from 0 to totalCol -1
    cellID = row.toString() + '-' + col.toString()
    let $div = $("<div>").attr('id', cellID)
    $('#grid').append($div)
  }
}

const renderBomb = (row, col) => {
  const cellid = (row.toString() + '-' + col.toString())
  $bomb = $("<img>").attr('src', 'bomb.png').css('width', '36px').css('height', '36px')
  $('#' + cellid).empty()
  $('#' + cellid).append($bomb)
}

const renderGameOver = (grid, bombRow, bombCol) => {
  console.log('render gameover')
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      let cellid = row.toString() + '-' + col.toString()
      if (grid[row][col].isMine === 1) {
        renderBomb(row, col)
      } else if (grid[row][col].isOpened === 1) {
        $('#' + cellid).text(grid[row][col].neighborMineCount)
      }
    }
  }
  let bombid = bombRow.toString() + '-' + bombCol.toString()
  $exploded = $("<img>").attr('src', 'exploded.png').css('width', '36px').css('height', '36px')
  $('#' + bombid).empty().append($exploded)
}

const renderCellNum = (grid, row, col) => {
  const $cell = $('#' + (row.toString() + '-' + col.toString()))
  $cell.text(grid[row][col].neighborMineCount)
}

const renderFlag = (row, col) => {
  console.log('renderFlag')
  const $cell = $('#' + (row.toString() + '-' + col.toString()))
  const $image = $("<img>").attr('src', 'flag.png').css('width', '35px').css('height', '35px')
  $cell.append($image)
}

const formatOpenedClosedCell = (grid, row, col) => {
  const cellid = row.toString() + '-' + col.toString()
  if (grid[row][col].isOpened === 1) {
    $("#" + cellid).css('background-color', '#EE7600')
  } else {
    $("#" + cellid).css('background-color', 'rgb(78, 78, 204)')
  }

}

const updateMineToGo = (app) => {
  let mineFlagged = 0
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      if (app.grid[row][col].isFlagged === 1) {
        mineFlagged += 1
      }
    }
  }
  let updateMineToGo = app.totalMines - mineFlagged
  $('#minetogo').text(updateMineToGo)
}

const checkWin = (app) => {
  let flagWin = true
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      if (app.grid[row][col].isMine === 1 && app.grid[row][col].isFlagged === 0) {
        flagWin = false
        return flagWin
      }
      if (app.grid[row][col].isMine === 0 && app.grid[row][col].isOpened === 0) {
        flagWin = false
        return flagWin
      }
    }
  }
  return flagWin
}

const checkLost = (app) => {
  let flagLost = false
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      if (app.grid[row][col].isMine === 1 && app.grid[row][col].isOpened === 1) {
        flagLost = true
        return flagLost
      }
    }
  }
  return flagLost
}

//a function to start timer and display it, active on first right or left click ( logic in handler functions)
const startTimer = () => {
  const timer = () => {
    if ((second += 1) === 60) {
      second = 0
      minute++;
    }
    $('#minute').text(minute < 10 ? '0' + minute : minute)
    $('#second').text(second < 10 ? '0' + second : second)
  }
  if (!cron) {
    cron = setInterval(() => { timer() }, 1000) // run timer every 1k milisec, 1 second
  }
}

const resetTimer = () => {
  second = 0
  minute = 0
  $('#minute').text(minute < 10 ? '0' + minute : minute)
  $('#second').text(second < 10 ? '0' + second : second)
  clearInterval(cron)
  cron = null //to restart the timer with first click, right or left
}

const checkGameEnd = (app) => {
  if (checkWin(app) || checkLost(app)) {
    clearInterval(cron)
    if (checkWin(app)) {
      $("#result").text('You Win! Congratulations on successfully avoiding contact with the virus.')
    }
    if (checkLost(app)) {
      $("#result").text('You Lose. Sorry that you have come into contact with the virus.')
    }
  }
}

// this is the all in one Render function that is run after each user interactions: left click, right click, reset
const renderGridData = (app) => {
  console.log('render grid data')
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      //for the cellid based on their cell data, do sth
      let cellid = row.toString() + '-' + col.toString()
      $("#" + cellid).empty()

      formatOpenedClosedCell(app.grid, row, col)

      //checks game end
      checkGameEnd(app)

      //conditionals to action for each of all possible states of one cell
      //gameover
      if ((app.grid[row][col].isMine === 1) && (app.grid[row][col].isOpened === 1) && (app.grid[row][col].isFlagged === 0)) {
        renderGameOver(app.grid, row, col)
        return
      }
      //mine that is not opened nor flagged
      else if ((app.grid[row][col].isMine === 1) && (app.grid[row][col].isOpened === 0) && (app.grid[row][col].isFlagged === 0)) { //nothing
      }
      //mine that is not opened but flag
      else if ((app.grid[row][col].isMine === 1) && (app.grid[row][col].isOpened === 0) && (app.grid[row][col].isFlagged === 1)) {
        renderFlag(row, col)
      }
      //non mine that is opened 
      else if ((app.grid[row][col].isMine === 0) && (app.grid[row][col].isOpened === 1) && (app.grid[row][col].isFlagged === 0)) {
        renderCellNum(app.grid, row, col)
      }
      //non mine that is not opened nor flag
      else if ((app.grid[row][col].isMine === 0) && (app.grid[row][col].isOpened === 0) && (app.grid[row][col].isFlagged === 0)) {
      }
      //non mine but is flagged ( error by user)
      else if ((app.grid[row][col].isMine === 0) && (app.grid[row][col].isOpened === 0) && (app.grid[row][col].isFlagged === 1)) { //flag the cell
        renderFlag(row, col)
      } else { console.log('a cell can not be both opened and flagged') }

    }
  }
  updateMineToGo(app)
}


//////////////////////////////////////////// C of MVC
const handleRightClick = (event) => {
  //only action on click if game has not ended
  if (!checkWin(app) && !checkLost(app)) {
    console.log('handleRightClick')
    event.preventDefault()
    startTimer()
    const $cell = $(event.currentTarget)
    const cellid = $cell.attr('id')
    const row = cellid.split("-")[0]
    const col = cellid.split("-")[1]

    if (app.grid[row][col].isFlagged === 0 && app.grid[row][col].isOpened === 0) {
      app.grid[row][col].isFlagged = 1
    } else if (app.grid[row][col].isFlagged === 1) {
      app.grid[row][col].isFlagged = 0
    }
    renderGridData(app)
  }
}

const countFlaggedNeighbor = (grid, row, col) => {
  console.log('countFlaggedNeighbor')
  let countFlaggedNeighbor = 0
  const dr = [-1, -1, -1, 0, 0, +1, +1, +1]
  const dc = [-1, 0, +1, -1, +1, -1, 0, +1]
  for (let i = 0; i < dr.length; i++) {
    let neighborRow = row + dr[i]
    let neighborCol = col + dc[i]
    if ((neighborRow >= 0) && (neighborRow < TOTALROW) && (neighborCol >= 0) && (neighborCol < TOTALCOL) && (grid[neighborRow][neighborCol].isFlagged === 1)) {
      countFlaggedNeighbor += 1
    }
  }
  return countFlaggedNeighbor
}

//in any case if a opened nomine cell is 0, flip all 8 neighbors to opened state
const openNeighborsIfNoMine = (grid, row, col) => {
  console.log('openNeighborsIfNoMine')
  if (grid[row][col].neighborMineCount === 0 && grid[row][col].isOpened === 1 && grid[row][col].isMine === 0) {

    const dr = [-1, -1, -1, 0, 0, +1, +1, +1]
    const dc = [-1, 0, +1, -1, +1, -1, 0, +1]
    for (let i = 0; i < dr.length; i++) {
      let neighborRow = row + dr[i]
      let neighborCol = col + dc[i]
      if ((neighborRow >= 0) && (neighborRow < TOTALROW) && (neighborCol >= 0) && (neighborCol < TOTALCOL) && (grid[neighborRow][neighborCol].isOpened === 0)) {
        grid[neighborRow][neighborCol].isOpened = 1 ///flip opened
        if (grid[neighborRow][neighborCol].neighborMineCount === 0) {
          openNeighborsIfNoMine(grid, neighborRow, neighborCol) //recursive part
        }
      }
    }
  }
}

const openNonFlaggedNeighbor = (grid, row, col) => {
  console.log('openNonFlaggedNeighbor')
  const dr = [-1, -1, -1, 0, 0, +1, +1, +1]
  const dc = [-1, 0, +1, -1, +1, -1, 0, +1]
  for (let i = 0; i < dr.length; i++) {
    let neighborRow = row + dr[i]
    let neighborCol = col + dc[i]
    if ((neighborRow >= 0) && (neighborRow < TOTALROW) && (neighborCol >= 0) && (neighborCol < TOTALCOL) && (grid[neighborRow][neighborCol].isFlagged === 0)) {
      grid[neighborRow][neighborCol].isOpened = 1
      openNeighborsIfNoMine(grid, neighborRow, neighborCol) // by chance the opened neighbor is 0,  continue to open its neighbors
    }
  }
}

const handleLeftClick = (event) => {
  //only action on click if game has not ended
  if (!checkWin(app) && !checkLost(app)) {
    startTimer()
    console.log('handleLeftClick')
    console.log(event.currentTarget)
    const $cell = $(event.currentTarget)
    const cellid = $cell.attr('id')
    const row = parseInt(cellid.split("-")[0])
    const col = parseInt(cellid.split("-")[1])

    //if cell is not opened and not flagged yet, then open it
    if (app.grid[row][col].isOpened === 0 && app.grid[row][col].isFlagged === 0) {
      app.grid[row][col].isOpened = 1
      openNeighborsIfNoMine(app.grid, row, col)
    }
    else //if cell is already opened, not a mine, and has # flagged neighbors same as its number, open all nonflagged neighbors, note that if user flags wrongly, a mine will open
      if ((app.grid[row][col].isOpened === 1)
        && (countFlaggedNeighbor(app.grid, row, col) === app.grid[row][col].neighborMineCount)
        && (app.grid[row][col].isMine === 0)) {
        openNonFlaggedNeighbor(app.grid, row, col)
      }
    renderGridData(app)
  }
}

const handleReset = () => {
  //empty all grid data, placing randome mines and update neighbor
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      app.grid[row][col].isFlagged = 0
      app.grid[row][col].isOpened = 0
      app.grid[row][col].isMine = 0
      app.grid[row][col].neighborMineCount = 0
    }
  }
  createMine(app.grid, app.totalMines)
  updateNeighborMineCount(app.grid)
  renderGridData(app) //to make sure format of all cells are render back to original 
  resetTimer()
  $('#result').text('')
}




///////////////////////////////////////
const main = () => {

  let TOTALROW = 10
  let TOTALCOL = 10 //(default grid size)

  $(":root")[0].style.setProperty('--totalRow', TOTALROW)
  $(":root")[0].style.setProperty('--totalCol', TOTALCOL)

  const app = {
    totalMines: Math.floor(TOTALCOL * TOTALROW * 0.16),
    grid: createGridData(TOTALCOL, TOTALROW)
  }
   
  let indexLevel = $("#level")[0].selectedIndex


  createEmptyGrid(TOTALROW, TOTALCOL)
  createMine(app.grid, app.totalMines)
  //update neighboring mine value
  updateNeighborMineCount(app.grid)

  //handle left click
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      let cellid = row.toString() + '-' + col.toString()
      $("#" + cellid).on('click', handleLeftClick)
    }
  }

  //handle right click
  for (let row = 0; row < TOTALROW; row++) {
    for (let col = 0; col < TOTALCOL; col++) {
      let cellid = row.toString() + '-' + col.toString()
      $("#" + cellid).contextmenu(handleRightClick)
    }
  }

  //handle reset button click
  $('#reset').on('click', handleReset)

  //handle input level

  renderGridData(app)

}

$(main)