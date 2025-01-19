const WR = 7485 ;
const MAXBIN = Math.ceil(7485 * 1.2);
var score = 0;

var rows = new Array(25);

for (var i = 0; i < 25; i++) {
  rows[i] = new Array(30);
}

function getzeroone() {
    return Math.floor(Math.random() * 2 );
}

for (var i = 0; i < 25; i++) {
    // TODO: Make it so that any row that is generated with all zeroes is regenerated till there is at least 1 one
    for (var j = 0; j < 30; j++) {
        rows[i][j] = getzeroone();
    }
}
const body = document.createElement("tbody");
for (var i = 0; i < 25; i++) {
  const newRow = document.createElement("tr");
  body.appendChild(newRow);
  for (var j = 0; j < 30; j++) {
    const newCell = document.createElement("td");
    newCell.textContent = rows[i][j];
    newRow.appendChild(newCell);
  }
   const newCell = document.createElement("td");
   newCell.textContent = "Row " + (i + 1);
   newRow.appendChild(newCell);
}
const table = document.getElementById("demo");
table.innerHTML = "";
table.append(body);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function clearBin() {
    for (let i = 0; i < 3; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    console.log('Done');
    table.innerHTML = "";
}
clearBin();

var inputRows = new Array(25);

for (var i = 0; i < 25; i++) {
    inputRows[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

// for (var i = 0; i < 25; i++) {
//     var rowInput = prompt();
//     inputRows[i] = rowInput.split("").map(function(item) {
//         return parseInt(item);
//     });
// }
function myFalse() {
    return false;
  }
  
async function inputBin() {
    const waiter = await sleep(5000);
    const myTimeout = setTimeout(() => false, 10000);
    console.log(myTimeout);
    var i = 0;
    do {
        var rowInput = prompt("Enter row " + (i + 1));
        if (i < 25) {
            inputRows[i] = rowInput.split("").map(function(item) {
                return parseInt(item);
            });
        }
        i++;
        console.log(myTimeout);
    } while (myTimeout && i < 25);
    console.log('Input Done');
}

inputBin();

async function finish() {
    await sleep(5000);
    for (var i = 0; i < 25; i++) {
        var incorrects = 0;
        var lastRowPoints = 0;
        if (inputRows[i] == [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) {
            break;
        }
        if (i < 24 && inputRows[i+1] != [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) {
            for (var j = 0; j < 30; j++) {
                if (rows[i][j] != inputRows[i][j]) {
                    incorrects++;
                }
            }
            if (incorrects == 0) {
                score += 30;
            } else if (incorrects == 1) {
                score += 15;
            }
        } else {
            for (var j = 0; j < 30; j++) {
                if (rows[i][j] == inputRows[i][j]) {
                    lastRowPoints++;
                } else {
                    lastRowPoints = Math.ceil(lastRowPoints/2);
                    break;
                }
            }
            score += lastRowPoints;
        }
    }
    document.getElementById("demo").innerHTML = "Your score is: " + score;
}
finish();