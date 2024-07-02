/*-------------------------------- Constants variables dont expect to change --------------------------------*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,4,6],
    [0,3,6],
    [0,4,8],
    [2,5,8],
  ]


/*---------------------------- Variables (state) we can change playerchoice ex ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X"
let winner = false
let tie = false


/*------------------------ Cached Element References query selectors ------------------------*/
const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.querySelector("#message")
const resetBtnEI = document.querySelector('#reset')


/*-------------------------------- Functions --------------------------------*/
const placePiece = (index => {
    board[index] = turn
})

const init = () => {
        // RESET ALL THE VARIABLES TO THE INITIAL STATE
    board = ["", "", "", "", "", "", "", "", ""]
    turn = "X"
    winner = false
    tie = false
    
    
    render()
}

const render = () => {
    updateBoard()
    updateMessage()
}

const updateBoard= () => {
    // Loop through each cell in the board array
    board.forEach((value, index) => {
        squareEls[index].innerText = value
    })
} 

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent =`It's your ${turn} turn`
        
    } else if (winner === false && tie === true) {
        messageEl.innerText = "It's a TIE"
        
    } else {
        messageEl.innerText = "YOU HAVE WON"
    }
}

const handleClick = (event => {
  const squareIndex = event.target.id

        if (board[squareIndex] === "X" || board[squareIndex] === "O"){
            messageEl.innerText = "The square is already been taken"
            return
        }
        if (winner === true) {
            messageEl.innerText = "The Game is over"
            return
            
        }
        placePiece(squareIndex)
        checkForWinner()
        checkForTie()
        switchPlayerTurn()
        render()
    })
    
const checkForWinner = () => {
    winningCombos.forEach(combination => {
        const [a, b, c] = combination
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = true
            console.log(`Is there a winner? ${winner}`)
        }
    });
};
const checkForTie = () => {
    tie = true; // Assume it's a tie initially
    
    // Check if there is any empty cell
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            tie = false; // Found an empty cell, so it's not a tie
            break; // Exit loop early since tie is already determined
        }
    }
    // If there is no empty cell and no winner, then it's a tie
    if (tie && !checkForWinner()) {
        console.log("It's a Tie!")
    }
}


const switchPlayerTurn = () => {

    if (turn === "X") {
        turn = "O" // Change turn to 'O' if current turn is 'X'
      } else {
        turn = "X" // Change turn to 'X' if current turn is 'O'
      }
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(key => {
    key.addEventListener('click' , handleClick)
})

resetBtnEI.addEventListener('click',init)

init()