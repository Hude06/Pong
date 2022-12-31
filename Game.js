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
let BallSpeedX = 5;
let RANDOMENUM = null;
let soundEFX1 = new Audio('/explosion.wav');
let soundEFX2 = new Audio('/click.wav');
let playeraiRunning = false;
let parts = []

function start_particles(x,y) {
    parts = []
    for(let i=0; i<50; i++) {
        parts.push({
            pos: {
                x:x,
                y:y,
            },
            vel: {
                x:Math.random(),
                y:Math.random(),
            },
            alive:true,
            age:0,
        })
    }
}
function update_particles() {
    parts.forEach(part => {
        part.pos.x += part.vel.x
        part.pos.y += part.vel.y
        part.age += 1
        if(part.age > 50) {
            part.alive = false
        }
    })
}
function draw_particles() {
    for(let i=0; i<parts.length; i++) {
        let part = parts[i]
        if(part.alive) {
            ctx.fillStyle = `rgba(255,119,119,${50-part.age}%)`
            ctx.fillRect(part.pos.x, part.pos.y, 10,10)
        }
    }
}


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
let AISpeed = 2;

let cureentKeys = new Map;
let collided = false;
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function drawPlayer(ctx) {
    // clear screen
    ctx.fillStyle = "#f1f2da"
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
        BallX += BallSpeedX
    if (BallX <= 120) {
        if (BallY >= playerPosY && BallY <= playerPosY + 70)
            if (runned === false) {
                console.log("Colided")
                collided = true
                BallSpeedX *= -1
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
            BallSpeedX *= -1
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
let bots = false;
function checkScore() {
    if (BallX <= 0) {
        soundEFX1.currentTime = 0.1;
        soundEFX1.play();
        BallSpeedX *= -1;
        ballLive = false;
        if (bots === true) {
            BallSpeedX += numberToAdd;

        }
        BallReset();
        setTimeout(() => {
            scoreComputer += 1
            if (scorePlayer < scoreComputer) {
                PlayerAiSpeed += numberToAdd;
                console.log("PlayerSpeed = "+ PlayerAiSpeed)
                console.log("BallSpeed = "+ BallSpeedX)


            }
            }, 500)
    }
    if (BallX >= 950) {
        if (bots === true) {
            BallSpeedX += numberToAdd;

        }        soundEFX1.currentTime = 0.1;
        soundEFX1.play();
        BallSpeedX *= -1;
        ballLive = false;
        BallReset();
        setTimeout(() => {
            scorePlayer += 1       

            if (scorePlayer > scoreComputer) {
                    AISpeed += numberToAdd;
                    console.log("AiSpeed = "+ AISpeed)
                    console.log("BallSpeed = "+ BallSpeedX)

            } 
        },500)
    }
}
let numberToAdd = 0.05;
function checkIfPositive() {

    let number = BallSpeedX;

    // true if number is less than 0
    if (number < 0.0)
    numberToAdd = -1;
    // true if number is greater than 0
    else if ( number > 0.0)
    numberToAdd = 1;
    // if both test expression is evaluated to false
    else
        System.out.println(number + " is 0.");
}

let splash = null
function checkSplash() {
    if (splash === true) {
        splashScreen.style.opacity = 0;

        ballLive = true;
        setTimeout(()=>{
            splashScreen.classList.add('hidden')
            
        },610)
    }
}
function keyboard() {
    if (cureentKeys.get("Enter") === true) {
        splash = true;

    }
    if (cureentKeys.get('w') === true) {
        playerPosY -= 5;
    }
    if (cureentKeys.get("s") === true) {
        playerPosY += 5;

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
    soundEFX1 = new Audio('/explosion.wav');
    soundEFX2 = new Audio('/click.wav');
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
    ballLive = true;
    pacifico_font = new FontFace('CourierCocoW00-Regular', 'url(db.onlinewebfonts.com/t/ca7fab70d3dbd232a157600131e4c9dd.eot)');
    screenShaking = false
    BallX = 400;
    BallY = 200
    RANDOMENUM = getRndInteger(-5,5);
    BallY += RANDOMENUM;
}

function checkWall() {
    if (BallY <= 20){
        collidedWallTop = true
        screenShaking = true;
        setTimeout(() => {
            screenShaking = false;


        }, 100)
    }
    if (BallY >= c.height){
        collidedWallBottom = true;
        screenShaking = true;

        setTimeout(() => {
            screenShaking = false;

        }, 100)
    }

}
let PlayerAiSpeed = 2;
function playerAI() {
    if (playerPosY + 35 <= BallY)
    playerPosY += PlayerAiSpeed;
    if (playerPosY+35 >= BallY)
    playerPosY -= PlayerAiSpeed;
}
function checkIfColoided() {
    if (collidedWallTop === true) {
        soundEFX2.play();
        RANDOMENUM = getRndInteger(1,5);
        console.log("MUSIC PLAY")
        if (bots === true) {
            BallSpeedX += numberToAdd;

        }


    }
    if (collidedWallBottom === true) {
        soundEFX2.play();
        console.log("MUSIC PLAY")

        RANDOMENUM = RANDOMENUM = getRndInteger(-5,0);
        if (bots === true) {
            BallSpeedX += numberToAdd;
            console.log(BallSpeedX)


        }


    }
    if (collided === true) {
        soundEFX2.play();
        console.log("MUSIC PLAY")
        start_particles(BallX,BallY);

        RANDOMENUM = getRndInteger(-5,5);
        collided = false;
        if (bots === true) {
            BallSpeedX += numberToAdd;
            console.log(BallSpeedX)

        }
    }
    collidedWallTop = false
    collidedWallBottom = false;
    collided = false;
    BallY += RANDOMENUM;
}
let AIRunned = false;
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
function setPlayerRunning() {
    playeraiRunning = !playeraiRunning;
    bots = !bots;

}
function update() {
    checkIfPositive();
    checkSplash();
    //input
    keyboard();
    //movement / physics
    if (ballLive === true) {
        checkIfColoided();
        if (playeraiRunning === true) {
            playerAI();
        }
        update_particles();
        AI();
        checkWall();
        move_ball();
        checkScore();
        checkSide();

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
    draw_particles();
    ctx.restore()

    window.requestAnimationFrame(update);
}
sertupkeyboard();
update();


