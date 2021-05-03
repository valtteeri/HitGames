const canvas = document.getElementById("gamecanvas");
const context = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 640;

const Mineamount = 32;
const fieldsize = 16;

let blockarray = [];
let rngnumberstorage = [];

let score = 0;

const timerminutes = document.getElementById("timerminutes")
const timerseconds = document.getElementById("timerseconds")
let totaltime = 0;

setInterval(updatetimer, 1000);

class block {
    constructor (x, y, number, type) {
        this.x = x;
        this.y = y;
        this.width = 39;
        this.height = 39;
        this.color = "grey";
        this.number = number;
        this.type = type;
        this.adjacent = 0;
        this.revealed = "hidden";
    }
    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

function generateblocks() {
    // Creates all blocks on the field and pushes them to an array
    for (let x=0; x < fieldsize; x++) {
        for (let y=0; y < fieldsize; y++) {
            let row = x*40;
            let column = y*40;
            let number = x + "." + y;
            let type = "empty";
            blockarray.push(new block(row, column, number, type))
            // console.log("x = " + row + ", y = " + column + ", number = " + number )
        }
    }
}

function generatemines() {
    // Create a array for random numbers
    for (let i=0; i<blockarray.length; i++) {
        rngnumberstorage.push(i);
    };
    // Mark random blocks as mines
    for (let i=0; i<Mineamount; i++) {
        let randomnumber = Math.floor(Math.random()*rngnumberstorage.length);
        let rngindex = rngnumberstorage[randomnumber];
        blockarray[rngindex].type = "bomb";
        blockarray[rngindex].color = "grey";
        rngnumberstorage.splice( randomnumber, 1 );
    };
};

function generatenumbers() {
    // assign numbers to blocks based on nearby mines
    for (let i=0; i<blockarray.length; i++) {
        if(blockarray[i].type == "bomb") {
            let testpointX = blockarray[i].x;
            let testpointY = blockarray[i].y;
            // console.log(blockarray[i].type);
            for (let j=0; j<blockarray.length; j++) {
                if(blockarray[j].x == testpointX || blockarray[j].x == testpointX + 40 ||blockarray[j].x == testpointX - 40) {
                    if(blockarray[j].y == testpointY || blockarray[j].y == testpointY + 40 ||blockarray[j].y == testpointY - 40) {
                        if(blockarray[j].type != "bomb") {
                            blockarray[j].adjacent = blockarray[j].adjacent + 1;
                            blockarray[j].color = "grey";
                            blockarray[j].type = "number";
                            // console.log(blockarray[j].number + " " + blockarray[j].adjacent);
                        };
                    };
                };
            };
            
        };
    };
};

generateblocks();

generatemines();

generatenumbers();


function drawblocks() {
    // Draw all blocks in array
    for (let i=0; i < blockarray.length; i++) {
        blockarray[i].draw();
    }
}

function drawnumbers() {
    // Reveal all numbered blocks on loss
    for (let i=0; i<blockarray.length; i++) {
        if(blockarray[i].type == "number") {
            context.font = "30px Arial";
            context.fillStyle = "black";
            context.fillText(blockarray[i].adjacent,blockarray[i].x+12,blockarray[i].y+30);
        }
    }
}

function drawbombs() {
    // Reveal all bombs
    for (let i=0; i<blockarray.length; i++) {
        if(blockarray[i].type == "bomb") {
            context.drawImage(bombimage, blockarray[i].x, blockarray[i].y, 39, 39);
        }
    }
}


drawblocks();

// drawnumbers();

const bombimage = new Image();
bombimage.src = 'pictures/minesweeperbomb.png';


// Register and locate mouse clicks on canvas, then execute functions based on click location
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const xid = Math.floor(x/40)
    const yid = Math.floor(y/40)
    // console.log("x: " + x + " y: " + y)
    // console.log("button used:" + event.button)
    // console.log("block clicked: " + Math.floor(x/40) + "." + Math.floor(y/40))
    if(event.button == 0) {
        revealblock(xid, yid);
    } else if(event.button == 2) {
        markflag(xid,yid);
    }
    // drawbombs();
    if(checkvictory()) {
        wongame();
    }
}

canvas.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas, e)
})

canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});


function revealblock(x, y) {
    // reveals clicked block and and nearby blocks if clicked block is empty
    if(x>-1 && x<16 && y>-1 && y<16) {
        let blocknumber = (x + "." + y); 
        let clickedblock = blockarray.findIndex(block => block.number === blocknumber);
        if(blockarray[clickedblock].revealed != "revealed") {
            // console.log(clickedblock);
            if(blockarray[clickedblock].type == "bomb") {
                // Reveals all and ends game if bomb is clicked
                // console.log("You lost")
                drawbombs();
                drawnumbers();
                lostgame();
            } else if(blockarray[clickedblock].type == "number") {
                // Reveals block and shows number if block has number
                // console.log("you revealed a number");
                blockarray[clickedblock].color = "lightgrey";
                blockarray[clickedblock].revealed = "revealed";
                blockarray[clickedblock].draw();
                context.font = "30px Arial";
                context.fillStyle = "black";
                context.fillText(blockarray[clickedblock].adjacent,blockarray[clickedblock].x+12,blockarray[clickedblock].y+30);
            } else if(blockarray[clickedblock].type == "empty") {
                // Reveals empty block and it's surrounding blocks
                // console.log("you revealed empty")
                blockarray[clickedblock].color = "lightgrey";
                blockarray[clickedblock].revealed = "revealed";
                blockarray[clickedblock].draw();
                revealblock(blockarray[clickedblock].x/40 - 1, blockarray[clickedblock].y/40);
                revealblock(blockarray[clickedblock].x/40 + 1, blockarray[clickedblock].y/40);
                revealblock(blockarray[clickedblock].x/40, blockarray[clickedblock].y/40 - 1);
                revealblock(blockarray[clickedblock].x/40, blockarray[clickedblock].y/40 + 1);
            }
        }
    }
}

function markflag(x, y) {
    // Lets the player mark blocks with flags
    let blocknumber = (x + "." + y); 
    let clickedblock = blockarray.findIndex(block => block.number === blocknumber);
    if(blockarray[clickedblock].revealed != "revealed") {
        context.beginPath();
        context.fillStyle = "black";
        context.fillRect(blockarray[clickedblock].x+12,blockarray[clickedblock].y+5,2,30);
        context.fillStyle = "red";
        context.fillRect(blockarray[clickedblock].x+14,blockarray[clickedblock].y+5,14,10)
    }
}

function checkvictory() {
    // Checks winning condition
    for (i=0; i<blockarray.length; i++) {
        if(blockarray[i].type != "bomb" && blockarray[i].revealed != "revealed") {
            return false;
        }
    }
    return true;
}

function lostgame() {
    // Gives instructions when player loses and stops game
    context.font = "25px Arial,";
    context.fillStyle = "rgba(255, 255, 255, 0.2)";
    context.fillRect(0,0,640,640)
    context.fillStyle = "White";
    context.fillText("You landed on a mine and lost the game!",80,200)
    context.fillText("Please press Enter ",150,230)
    context.fillText("to start a new game!",170,260)
    window.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            restartgame();
        }
    });
}

function wongame() {
    // Gives instructions when player wins, stops game and records score
    score = totaltime;
    context.font = "25px Arial,";
    context.fillStyle = "rgba(255, 255, 255, 0.1)";
    context.fillRect(0,0,640,640)
    context.fillStyle = "White";
    context.fillText("You avoided all the mines and won!",80,200)
    context.fillText("Your time is automatically",150,230)
    context.fillText("recorded on the leaderboard",150,260)
    context.fillText("Please press Enter ",150,290)
    context.fillText("to start a new game!",170,320)
    localStorage.setItem('minesweeperscore',JSON.stringify(score));
    window.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            restartgame();
        }
    });
}


function restartgame() {
    // Restarts the game
    blockarray = [];
    rngnumberstorage = [];
    totaltime = 0;
    context.clearRect(0,0,canvas.width,canvas.height);

    generateblocks();

    generatemines();

    generatenumbers();

    drawblocks();

}


//These handle players time when playing the game
function updatetimer() {
    ++totaltime;
    timerseconds.innerHTML = pad(totaltime%60);
    timerminutes.innerHTML = pad(parseInt(totaltime/60));
}

function pad(val) {
    let = valstring = val + "";
    if(valstring.length < 2) {
        return "0" + valstring;
    } else {
        return valstring;
    }
}