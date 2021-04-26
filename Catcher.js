const Catcher_size = 20;
var GameScore = 0;
var score;
var notes = [];
var catcher;
var gameSpeed = 2;
function setup() {

  var canvas = createCanvas(400, 600);
  canvas.parent('Game-holder');
  catcher = createVector(width / 2, height - 50);

}
function scored() {
    text("Score: " + GameScore +" ");
}
function draw() {
    background(46, 46, 46);
    handleCatcher();
    scored();

    if(frameCount % 15 === 0 && random() < 0.2){
        notes.push(new Note(random(width), 0, random(10) + 10, 'white', random(1,3) * gameSpeed))

    }
    for(var i = notes.length - 1; i >= 0; i--){
        if (notes[i].onScreen) {
            notes[i].update();
            notes[i].draw();

            if (notes[i].caughtBy(catcher)){
                score += Math.round(notes[i].vel.y / notes[i].size);
                notes.splice(i, 1);
                GameScore++;
                gameSpeed += 0.2;
                console.log("speedup");
            }
        } else {
            endGame();
        }
    }
    textSize(20);
    text(GameScore, width / 2.15, 50);
}
function endGame(){
    noLoop();
    textSize(40);
    stroke('rgba(0,255,0,0.25)');
    strokeWeight(4);
    fill('White');
    text("Game Over!", width / 4.1, height/ 2);
    
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
