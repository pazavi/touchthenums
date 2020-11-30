'use strict'
console.log('touch the nums');

var gSize;

var gNums;
var gNextNum = 1;
var gTimer=0;


function chooseLevel(elBtn) {
    if (elBtn.name === 'easy') {
        gSize = 4;
    }
    if (elBtn.name === 'medium') {
        gSize = 5;
    }
    if (elBtn.name === 'hard') {
        gSize = 6;
    }
    gNums = [];
    var len = gSize ** 2;
    for (var i = 1; i <= len; i++) {
        gNums.push(i);
    }
    gNums = shuffle(gNums);
    document.querySelector('table').classList.add('table');
    document.querySelector('.victory').style.opacity = '0';
    gNextNum = 1;
    document.querySelector('.nextNum').innerText = ('Next Number: '+ gNextNum);
  
    init();

}

function init() {
    gNextNum = 1;
    var playBoard = createBoard();
    renderBoard(playBoard);
    setTimer()

}

function createBoard() {
    var board = [];
    for (var i = 0; i < gSize; i++) {
        board[i] = [];
        for (var j = 0; j < gSize; j++) {
            board[i][j] = +gNums.pop()
        }
    }
    
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        var row = board[i];
        for (var j = 0; j < board[0].length; j++) {
            var cell = row[j];
            strHtml += `<td onclick=cellClicked(this) id="${cell}" >${cell}</td>`;
        }
        strHtml += '</tr>';
        
    }
    
    var elTable = document.querySelector('.table-body');
    elTable.innerHTML = strHtml;

    
}


function cellClicked(elClickedNum){
    
    if (+elClickedNum.innerText === gNextNum){
        elClickedNum.style.backgroundImage = 'linear-gradient(to left, rgb(170, 170, 170) , white)';
        elClickedNum.style.color ='#000103'
        gNextNum++;
        document.querySelector('.nextNum').innerText = ('Next Number: '+ gNextNum);
        
        if (+elClickedNum.innerText === gSize**2){
            clearInterval(gTimer);
            document.querySelector('.victory').innerText = 'Victory achieved';
            document.querySelector('.victory').style.opacity = '100';
            document.querySelector('.nextNum').innerText = ('No Next Number left');

            
        }
    }
}




function setTimer() {
    clearInterval(gTimer)
    var start = Date.now();
    gTimer = setInterval(function () {
        var delta = Date.now() - start;
        
        var secDelta = (Math.floor(delta / 1000));

        document.querySelector('.timer').innerText = ('Seconds Passed: '+ secDelta) ;
        

    }, 1000);

   
}




function shuffle(array) {
    var currentIndex = array.length - 1, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        currentIndex--;
    }

    return array;
}