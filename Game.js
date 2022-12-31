var c = document.getElementById("Game");
var ctx = c.getContext("2d");
var splashScreen = document.querySelector('.splash')
let ballLive = false;
let sizeX = 10;
let sizeY = 70;
let playerPosX = 100;
let playerPosY = 165;
let computerPosX = 900;
let computerPosy = 265;
let side = null;
let SpeedX = 5;
let RANDOMENUM = null;
let soundEFX1 = new Audio('/explosion.wav');
let soundEFX2 = new Audio('/ping_pong_8bit_beeep.wav');

RANDOMENUM = getRndInteger(-5,5);
BallY += RANDOMENUM;
let collidedWallBottom = null;
let collidedWallTop = null;
var pacifico_font = new FontFace('CourierCocoW00-Regular', 'url(db.onlinewebfonts.com/t/ca7fab70d3dbd232a157600131e4c9dd.eot)');
let scorePlayer = 0;
let scoreComputer = 0
let screenShaking = false
var BallX = 400;
var BallY = 200
var R = 5;
let BallWidth = 10;
let BallHight = 10
let cureentKeys = new Map;
let collided = false;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
function drawPlayer(ctx) {
    // clear screen
    ctx.fillStyle = "#f0f6f0"
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(playerPosX, playerPosY, sizeX, sizeY/2);
    ctx.fillRect(playerPosX, playerPosY+35, sizeX, sizeY/2);
    ctx.fillRect(computerPosX, computerPosy, sizeX, sizeY/2);
    ctx.fillRect(computerPosX, computerPosy+35, sizeX, sizeY/2);
    ctx.fillRect(BallX, BallY, BallWidth,BallHight);
    

}
function checkSide() {
    //Side 1 = Right Side
    //Side 2 = Left Side
     if (BallX >= 500) {
        side = 1;
     }
     if (BallX <= 500) {
        side = 2;
     }
}
const radius = 70;
let runned = false;
let runned2 = false;
ctx.font = "50px pacifico_font"
ctx.fillStyle = "#f0f6f0"
ctx.fillText(scorePlayer, 200, 50);
ctx.fillText(scoreComputer, 550, 50);
function sertupkeyboard() {
    window.addEventListener('keydown', function(event) {
        cureentKeys.set(event.key,true);
    });
    window.addEventListener('keyup', function(event) {
        cureentKeys.set(event.key,false);
    });
}
function move_ball(){
        BallX += SpeedX
    if (BallX <= 120) {
        if (BallY >= playerPosY && BallY <= playerPosY + 70)
            if (runned === false) {
                console.log("Colided")
                collided = true
                SpeedX *= -1
                runned = true;
                screenShaking = true;
                setTimeout(() => {
                    screenShaking = false;

                }, 200) 
        }

    }
    if (BallX >= 880) {
        if (BallY >= computerPosy && BallY <= computerPosy + 71)
        if (runned2 === false) {
            console.log("Colided")
            collided = true
            SpeedX *= -1
            runned2 = true;
            screenShaking = true;

            setTimeout(() => {
                screenShaking = false;

            }, 200)
        }

    }
    runned = false;
    runned2 = false;
}
function checkScore() {
    if (BallX <= 50) {
        soundEFX1.play();
        SpeedX *= -1;
        ballLive = false;
        BallReset();
        setTimeout(() => {
            scoreComputer += 1
            }, 500)
    }
    if (BallX >= 950) {
        soundEFX1.play();
        SpeedX *= -1;
        ballLive = false;
        BallReset();
        setTimeout(() => {
            scorePlayer += 1
            },500)
    }
}
function keyboard() {
    if (cureentKeys.get("Enter") === true) {
        splashScreen.style.opacity = 0;
        ballLive = true;
        setTimeout(()=>{
            splashScreen.classList.add('hidden')
            
        },610)
    }
    if (cureentKeys.get('w') === true) {
        playerPosY -= 3;
    }
    if (cureentKeys.get("s") === true) {
        playerPosY += 3;

    }

}
function DrawNet(ctx) {
    for (let i = 0; i < 1000; i += 20   ) {
    ctx.fillStyle = "#808080"
      ctx.fillRect(500, i, 10, 10);
      ctx.fillStyle = "white"
    }
}
function BallReset() {
    collidedWallBottom = false
    collidedWallTop = false
    collided = false;
    playerPosX = 100;
    playerPosY = 165;
    computerPosX = 900;
    computerPosy = 265;
    BallWidth = 10;
    BallHight = 10;
    side = null;
    SpeedX = 5;
    ballLive = true;
    pacifico_font = new FontFace('CourierCocoW00-Regular', 'url(db.onlinewebfonts.com/t/ca7fab70d3dbd232a157600131e4c9dd.eot)');
    screenShaking = false
    BallX = 400;
    BallY = 200
    RANDOMENUM = getRndInteger(-5,5);
    BallY += RANDOMENUM;
}
function SqueeseBallBasedOnSpeed() {
    if (collided === true) {
        // console.log("BALLWIDTH += 1")
        // BallWidth += 10;
    }
    // setTimeout(() => {
    //     // BallWidth -= 5;
    //     // if (BallWidth === 10) {
    //     //     BallWidth += 5;
    //     //     return

    //     // }
    // },2000)
}
let AISpeed = 2;
function checkWall() {
    if (BallY <= 0){
        collidedWallTop = true
        screenShaking = true;
        setTimeout(() => {
            screenShaking = false;


        }, 100)
    }
    if (BallY >= 600){
        collidedWallBottom = true;
        screenShaking = true;

        setTimeout(() => {
            screenShaking = false;

        }, 100)
    }

}
function checkIfColoided() {
    if (collidedWallTop === true) {
        RANDOMENUM = getRndInteger(1,5);
        soundEFX2.play();


    }
    if (collidedWallBottom === true) {
        RANDOMENUM = RANDOMENUM = getRndInteger(-5,0);
        soundEFX2.play();

    }
    if (collided === true) {
        soundEFX2.play();
        RANDOMENUM = getRndInteger(-5,5);
        collided = false;
    }
    collidedWallTop = false
    collidedWallBottom = false;
    collided = false;
    BallY += RANDOMENUM;
}
function AI() {
    if (computerPosy + 35 <= BallY)
    computerPosy += AISpeed;
    if (computerPosy+35 >= BallY)
    computerPosy -= AISpeed;
}
function draw_score(ctx) {
    ctx.font = "48px serif";
    ctx.fillText(scorePlayer, 250, 50);
    ctx.fillText(scoreComputer, 750, 50);

}

function update() {
    //input
    keyboard();
    //movement / physics
    if (ballLive === true) {
        checkIfColoided();
        AI();
        checkWall();
        move_ball();
        checkScore();
        checkSide();
        SqueeseBallBasedOnSpeed()
    }
    var ctx = c.getContext("2d");
    ctx.save()
    if(screenShaking === true) {
      ctx.translate(Math.random()*10,0)
    }
    // draw
    drawPlayer(ctx);
    DrawNet(ctx);
    draw_score(ctx);
    ctx.restore()

    window.requestAnimationFrame(update);
}
sertupkeyboard();
update();


