var c = document.getElementById("Game");
var ctx = c.getContext("2d");
var splashScreen = document.querySelector(".splash");
let ball = {
  x: 400,
  y: 200,
  r: 5,
  width: 10,
  height: 10,
  speed: 5,
  alive: false,
};
let player = {
  score: 0,
  posX: 20,
  posY: 165,
};
let paddle = {
  sizeX: 10,
  sizeY: 70,
};
let computer = {
  posX: 980,
  posY: 265,
  score: 0,
};
let PlayerAiSpeed = 1;
let AIRunned = false;
let bots = false;
let splash = null;
let RANDOMENUM = null;
let soundEFX1 = new Audio("/explosion.wav");
let soundEFX2 = new Audio("/click.wav");
let playeraiRunning = false;
let parts = [];
RANDOMENUM = getRndInteger(-5, 5);
ball.y += RANDOMENUM;
let collidedWallBottom = null;
let collidedWallTop = null;
let screenShaking = false;
let AISpeed = 1;
let cureentKeys = new Map();
let collided = false;
const radius = 70;
let runned = false;
let runned2 = false;
ctx.font = "50px pacifico_font";
ctx.fillStyle = "#f0f6f0";
ctx.fillText(player.score, 200, 50);
ctx.fillText(computer.score, 550, 50);
function BallReset() {
  collidedWallBottom = false;
  collidedWallTop = false;
  collided = false;
  player.posX = 100;
  player.posY = 165;
  computer.posX = 900;
  computer.posY = 265;
  ball.width = 10;
  ball.height = 10;
  side = null;
  ball.alive = true;
  screenShaking = false;
  ball.x = 400;
  ball.y = 200;
  RANDOMENUM = getRndInteger(-5, 5);
  ball.y += RANDOMENUM;
}
function setupkeyboard() {
  window.addEventListener("keydown", function (event) {
    cureentKeys.set(event.key, true);
  });
  window.addEventListener("keyup", function (event) {
    cureentKeys.set(event.key, false);
  });
}
function start_particles(x, y) {
  parts = [];
  for (let i = 0; i < 50; i++) {
    parts.push({
      pos: {
        x: x,
        y: y,
      },
      vel: {
        x: Math.random(),
        y: Math.random(),
      },
      alive: true,
      age: 0,
    });
  }
}
function draw_score(ctx) {
  ctx.font = "48px serif";
  ctx.fillText(player.score, 250, 50);
  ctx.fillText(computer.score, 750, 50);
}
function draw_particles() {
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    if (part.alive) {
      ctx.fillStyle = `rgba(255,119,119,${50 - part.age}%)`;
      ctx.fillRect(part.pos.x, part.pos.y, 10, 10);
    }
  }
}
function drawPlayer(ctx) {
  // clear screen
  ctx.fillStyle = "#f1f2da";
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillRect(player.posX, player.posY, paddle.sizeX, paddle.sizeY / 2);
  ctx.fillRect(player.posX, player.posY + 35, paddle.sizeX, paddle.sizeY / 2);
  ctx.fillRect(computer.posX, computer.posY, paddle.sizeX, paddle.sizeY / 2);
  ctx.fillRect(
    computer.posX,
    computer.posY + 35,
    paddle.sizeX,
    paddle.sizeY / 2
  );
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}
function DrawNet(ctx) {
  for (let i = 0; i < 1000; i += 20) {
    ctx.fillStyle = "#808080";
    ctx.fillRect(500, i, 10, 10);
    ctx.fillStyle = "white";
  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkSide() {
  //Side 1 = Right Side
  //Side 2 = Left Side
  if (ball.x >= 500) {
    side = 1;
  }
  if (ball.x <= 500) {
    side = 2;
  }
}
function checkScore() {
  if (ball.x <= 0) {
    soundEFX1.currentTime = 0.1;
    soundEFX1.play();
    ball.speed *= -1;
    ball.alive = false;
    if (bots === true) {
      ball.speed += 0.2;
    }
    BallReset();
    setTimeout(() => {
      computer.score += 1;
      if (player.score < computer.score) {
        PlayerAiSpeed++;

        console.log("PlayerSpeed = " + PlayerAiSpeed);
        console.log("BallSpeed = " + ball.speed);
      }
    }, 500);
  }
  if (ball.x >= 950) {
    if (bots === true) {
      ball.speed += 0.2;
    }
    soundEFX1.currentTime = 0.1;
    soundEFX1.play();
    ball.speed *= -1;
    ball.alive = false;
    BallReset();
    setTimeout(() => {
      player.score += 1;

      if (player.score > computer.score) {
        AISpeed++;
        console.log("AiSpeed = " + AISpeed);
        console.log("BallSpeed = " + ball.speed);
      }
    }, 500);
  }
}
function checkSplash() {
  if (splash === true) {
    splashScreen.style.opacity = 0;

    ball.alive = true;
    setTimeout(() => {
      splashScreen.classList.add("hidden");
    }, 610);
  }
}
function checkWall() {
  if (ball.y <= 20) {
    collidedWallTop = true;
    screenShaking = true;
    setTimeout(() => {
      screenShaking = false;
    }, 100);
  }
  if (ball.y >= c.height) {
    collidedWallBottom = true;
    screenShaking = true;

    setTimeout(() => {
      screenShaking = false;
    }, 100);
  }
}
function check_Keyboard() {
  if (cureentKeys.get("Enter") === true) {
    splash = true;
  }
  if (cureentKeys.get("w") === true) {
    player.posY -= 5;
  }
  if (cureentKeys.get("s") === true) {
    player.posY += 5;
  }
}
function checkIfColoided() {
  if (collidedWallTop === true) {
    soundEFX2.play();
    RANDOMENUM = getRndInteger(1, 5);
    console.log("MUSIC PLAY");
  }
  if (collidedWallBottom === true) {
    soundEFX2.play();
    console.log("MUSIC PLAY");

    RANDOMENUM = RANDOMENUM = getRndInteger(-5, 0);
  }
  if (collided === true) {
    soundEFX2.play();
    console.log("MUSIC PLAY");
    start_particles(ball.x, ball.y);

    RANDOMENUM = getRndInteger(-5, 5);
    collided = false;
  }
  collidedWallTop = false;
  collidedWallBottom = false;
  collided = false;
  ball.y += RANDOMENUM;
}
function update_particles() {
  parts.forEach((part) => {
    part.pos.x += part.vel.x;
    part.pos.y += part.vel.y;
    part.age += 1;
    if (part.age > 50) {
      part.alive = false;
    }
  });
}
function update_Ball() {
  ball.x += ball.speed;
  if (ball.x <= 120) {
    if (ball.y >= player.posY && ball.y <= player.posY + 70)
      if (runned === false) {
        console.log("Colided");
        collided = true;
        ball.speed *= -1;
        runned = true;
        screenShaking = true;
        setTimeout(() => {
          screenShaking = false;
        }, 200);
      }
  }
  if (ball.x >= 880) {
    if (ball.y >= computer.posY && ball.y <= computer.posY + 71)
      if (runned2 === false) {
        console.log("Colided");
        collided = true;
        ball.speed *= -1;
        runned2 = true;
        screenShaking = true;

        setTimeout(() => {
          screenShaking = false;
        }, 200);
      }
  }
  runned = false;
  runned2 = false;
}
function AI() {
  if (computer.posY + 35 <= ball.y) computer.posY += AISpeed;

  if (computer.posY + 35 >= ball.y) computer.posY -= AISpeed;
}
function update() {
  checkSplash();
  //input
  check_Keyboard();
  //movement / physics
  if (ball.alive === true) {
    checkIfColoided();
    update_particles();
    AI();
    checkWall();
    update_Ball();
    checkScore();
    checkSide();
  }
  ctx.save();
  if (screenShaking === true) {
    ctx.translate(Math.random() * 10, 0);
  }
  // draw
  drawPlayer(ctx);
  DrawNet(ctx);
  draw_score(ctx);
  draw_particles();
  ctx.restore();
  window.requestAnimationFrame(update);
}
update();
function setup() {
  setupkeyboard();
}
setup();
