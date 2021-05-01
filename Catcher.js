const Catcher_size = 20;
var GameScore = 0;
var notes = [];
var catcher;
var gameSpeed = 1;


function setup() {

  var canvas = createCanvas(400, 600);
  canvas.parent('Game-holder');
  catcher = createVector(width / 2, height - 50);
}
function scored() {
    text(" " + GameScore +" ");
}
function draw() {
    background(46, 46, 46);
    Loop();
    let canvas = document.getElementById("defaultCanvas0")
    canvas.addEventListener('click', (event) => {
    GameRestart();
});
}
function Loop() {
    handleCatcher();
    scored();
    if(frameCount % 15 === 0 && random() < 0.2){
        notes.push(new Note(random(width), 0, random(10) + 10, 'white', random(2,3) * gameSpeed))
    }
    for(i = 0; i < notes.length; i++){
        if (notes[i].onScreen) {
            notes[i].update();
            notes[i].draw();

            if (notes[i].caughtBy(catcher)){
                notes.splice(i, 1);
                GameScore++;
                gameSpeed += 0.2;
            }
        } else {
            endGame();
        }
    }
    textSize(20);
    text(GameScore, width / 2.15, 40);
}
function endGame(){
    noLoop();
    textSize(40);
    fill('White');
    text("Game Over!", width / 4, height/4);
    notes = [];
    
}
/*      The bat     */
function handleCatcher() {
    catcher.x = constrain(mouseX, 0, width);
    beginShape();
    fill('white');
    vertex(catcher.x - Catcher_size, catcher.y - Catcher_size / 2);
    vertex(catcher.x - Catcher_size, catcher.y + Catcher_size / 2);
    vertex(catcher.x + Catcher_size, catcher.y + Catcher_size / 2);
    vertex(catcher.x + Catcher_size, catcher.y - Catcher_size / 2);
    endShape(CLOSE);
}

/*      NOTES       */
function Note(x, y, size, color, velocity){
    this.pos = createVector(x, y);
    this.vel = createVector(0, velocity)
    this.s = size;
    this.c = color;
    this.onScreen = true;
}
Note.prototype.draw = function(){
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.s)
}
Note.prototype.update = function(){
    this.pos.y += this.vel.y;
    this.onScreen = (this.pos.y < height);
}
Note.prototype.caughtBy = function(b){
    return !(this.pos.x < catcher.x - Catcher_size ||
            this.pos.x > catcher.x + Catcher_size ||
            this.pos.y < catcher.y - Catcher_size / 2 ||
            this.pos.y > catcher.y + Catcher_size / 2);
}
function GameRestart() {     
    loop();
    GameScore = 0;
    gameSpeed = 1;
}

