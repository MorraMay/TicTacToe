var area = document.getElementById('area');
var cell = document.getElementsByClassName('cell');
var currentPlayer = document.getElementById('curPlayer');
const modalResult = document.getElementById('modal-result')
const btnClose = document.getElementById('btn-close');

//Определяем выиграшные положения в массиве
//В переменную player присваиваем начального игрока 
// И в массив winIndex присваиваем все выиграшные положения
var player = "x";
// Логика статистики
var stat = {
    'x': 0,
    'o': 0,
    'd': 0
}
var winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

for (var i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

//Через цикл каждой ячейки, добавляем событие клика
// При нажатии которого будет срабатывать функция cellClick
for (var i = 0; i< cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}

function cellClick () {
    var data = [];

//Определяем занята ячейка или нет и записываем текущего игрока
    if(!this.innerHTML) {
        this.innerHTML = player;
    }else {
        modalResult.style.display = 'block';
        
        const closeModal = () => {
            modalResult.style.display = 'none';
        }

    overlay.addEventListener('click', closeModal);
    btnClose.addEventListener('click', closeModal);    
    }  
// через цикл проходимся по каждой ячейки и проверяем
// если в текущей ячейке стоит позиция текущего игрока
// тогда в массив data добавляем эти данные
    for(var i in cell){
        if(cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')))
        }
    }

// проверяем совпадает ли положение текущего игрока с выиграшным положением
    if(checkWin(data)) {
        stat[player] += 1;
        restart("Развалил Кабанчика: " + player)
// логика положения ничьи
    }else {
        var draw = true;
        for(var i in cell) {
            if(cell [i].innerHTML == '') draw = false;
        }
        if(draw) {
            stat.d += 1;
            restart("Ничеечка");
        }
    }
    // после каждого хода меняем игрока и выводим массив data
    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toLocaleUpperCase();
}

function checkWin(data) {
    for(var i in winIndex) {
        var win = true;
        for (var j in winIndex[i]){
            var id = winIndex [i][j];
            var ind = data.indexOf(id);

            if(ind == -1) {
                win = false
            }
        }

        if(win) return true;
    }
    return false;
}

//  после выиграша или ничьи нужно очистить поле 
function restart(text) {

    alert(text);
    for(var i = 0; i <cell.length; i++) {
        cell[i].innerHTML = '';
    }
    updateStat();
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    document.getElementById('sD').innerHTML = stat.d;
}



Number.prototype.pad = function(n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
  };
  
  function updateClock() {
    var now = new Date();
    var milli = now.getMilliseconds(),
      sec = now.getSeconds(),
      min = now.getMinutes(),
      hou = now.getHours(),
      mo = now.getMonth(),
      dy = now.getDate(),
      yr = now.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tags = ["mon", "d", "y", "h", "m", "s", "mi"],
      corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
    for (var i = 0; i < tags.length; i++)
      document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
  }
  
  function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
  }