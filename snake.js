
function getTileId(x, y){
    return x.toString().padStart(2, '0') + y.toString().padStart(2, '0');
}

function randomPos(){
    return Math.floor(Math.random()*16);
}

class Snake {
    x;
    y;
    moveDir;
    snakeBody = []
    tail;
    bodyLength;
    constructor(){
        this.x = 8;
        this.y = 8;
        this.moveDir = "ArrowRight";
        this.snakeBody.push([this.x, this.y]);
        this.tail = [this.x, this.y];
        this.bodyLength = 5;
    }

    changeDir(dir){
        this.moveDir = dir;
        console.log("snakedir is"+this.moveDir);
    }

    move(){
        let x = this.x;
        let y = this.y;
        let moveDir = this.moveDir;

        if(moveDir === "ArrowRight")
            y++;
        else if(moveDir === "ArrowLeft")
            y--;
        else if(moveDir === "ArrowUp")
            x--;
        else if(moveDir === "ArrowDown")
            x++;

        if( y > 15 ) y = 0;
        if( x > 15 ) x = 0;
        if( y < 0 ) y = 15;
        if( x < 0 ) x = 15;
 
        let pos = [x, y];
        //console.log(pos)
        this.snakeBody.unshift(pos);
        if(this.snakeBody.length > this.bodyLength)
            this.tail = this.snakeBody.pop();

        this.x = x;
        this.y = y;
    }

    collide(apple) {
        if(this.x === apple.x && this.y === apple.y){
            this.bodyLength += 3;
            apple.regen(this);
        }     
        this.snakeBody.slice(1).forEach(element => {
            if(element[0] === this.x && element[1] === this.y)
                window.location.reload();
        });
    }

    checkPosFree(x, y){
        this.snakeBody.forEach(element => {
            if(element[0] === x && element[1] === y)
                return false;
        });
        return true;
    }


    draw(){
        console.log(this.snakeBody[0]);
        //we need to draw the head and erase the tail
        let head = document.getElementById(getTileId(...this.snakeBody[0]));
        head.classList.add('snakeBody');

       // console.log("tail"+this.tail)
        let tailEnd = document.getElementById(getTileId(...this.tail));
        tailEnd.classList.remove('snakeBody');
    }
}

class Apple {
    x;
    y;
    appleTile;
    constructor(){
        this.regen();
    }
    regen(snake=null){
        if( this.appleTile != undefined )
            this.dispose()
        this.x = randomPos();
        this.y = randomPos();
        let ccc = 1;
        if(snake == null || snake.checkPosFree(this.x, this.y)){
            this.appleTile = document.getElementById(getTileId(this.x, this.y));
            this.appleTile.classList.add('appleTile');
        } else {
            this.regen(snake);
        }
    }
    dispose(){
        this.appleTile.classList.remove("appleTile");
    }
}

const theSnake = new Snake();
const theApple = new Apple();

window.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    theSnake.changeDir(event.key);
});
window.addEventListener('keyup', function(event) {
    console.log('Key released:', event.key);
    // Your logic here
});

function gameLoop(){
    theSnake.move();
    theSnake.draw();
    theSnake.collide(theApple);
    console.log("gameloop");
}

let intervalId = setInterval(gameLoop, 500);
