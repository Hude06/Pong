const c = document.getElementById("Game")
const ctx = c.getContext("2d")
const splashScreen = document.querySelector(".splash")

const shake_enabled = true
const particles_enabled = true
const DEBUG = {
  print_ai:false,
}

let ball = {
  x: 400,
  y: 200,
  r: 5,
  width: 10,
  height: 10,
  x_speed: 5,
  alive: false,
};
let player = {
  score: 0,
  posX: 100,
  posY: 165,
};
let paddle = {
  w: 10,
  h: 70,
};
let computer = {
  posX: 900,
  posY: 265,
  score: 0,
};
let splash = null;
let random_y_angle = null;
let soundEFX1 = new Audio("/explosion.wav");
let soundEFX2 = new Audio("/click.wav");
let parts = [];
random_y_angle = getRndInteger(-5, 5);
ball.y += random_y_angle;
let screenShaking = false;
let AISpeed = 1;
let current_keys = new Map();

ctx.font = "50px pacifico_font";
ctx.fillStyle = "#f0f6f0";


function reset_ball() {
  player.posX = 100;
  player.posY = 165;
  computer.posX = 900;
  computer.posY = 265;
  ball.width = 10;
  ball.height = 10;
  ball.alive = true;
  screenShaking = false;
  ball.x = 400;
  ball.y = 200;
  random_y_angle = getRndInteger(-5, 5);
  ball.y += random_y_angle;
}
function setup_keyboard() {
  window.addEventListener("keydown", function (event) {
    current_keys.set(event.key, true);
  });
  window.addEventListener("keyup", function (event) {
    current_keys.set(event.key, false);
  });
}
function start_particles(x, y) {
  if(!particles_enabled) return
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
// let outline = true;
// let outlineOn = 2;
// let levelActice = null;
// let LevelStart = false;
// function StartLevelSelect() {
//     if (LevelStart === false) {
//         LevelStart = true;
//     }
// }
// function updateLevelSelect() {
//     if (LevelStart = true) {
//         console.log("LevelSelect")
//         ctx.fillStyle = `rgba(0,48,59)`;
//         ctx.fillRect(0,0,c.width,c.height)
//         if (outline === true) {
//             //DrawOutline
//             if (outlineOn === 1) {
//                 ctx.fillStyle = "red"
//                 ctx.fillRect(c.width/2-52,c.height/2-202.5, 105, 55)
//             }
//             if (outlineOn === 2) {
//                 console.log("2")
//                 ctx.fillStyle = "red"
//                 ctx.fillRect(c.width/2-77,c.height/2-102.5, 180, 55)
//             }
//             if (outlineOn === 3) {
//                 console.log("3")
//                 ctx.fillStyle = "red"
//                 ctx.fillRect(c.width/2-52,c.height/2-2, 105, 55)
//             }
//         }
//         //PONG
//         ctx.fillStyle = "black"
//         ctx.fillText("PONG", c.width/2-62, c.height/2-250);
//         //EASY
//         ctx.font = "48px serif";
//         ctx.fillStyle = "black"
//         ctx.font = "48px serif";
//         ctx.fillStyle = "black"
//         ctx.fillRect(c.width/2-50,c.height/2-200, 100, 50)
//         ctx.fillStyle = "white"
//         console.log("EASY")
//         ctx.fillText("Easy", c.width/2-45, c.height/2-163);
//         //MEDIUM
//         ctx.fillStyle = "black"
//         ctx.font = "48px serif";
//         ctx.fillStyle = "black"
//         ctx.fillRect(c.width/2-75,c.height/2-100, 175, 50)
//         ctx.fillStyle = "white"
//         ctx.fillText("Medium", c.width/2-65, c.height/2-63);
//         //HARD
//         ctx.fillStyle = "black"
//         ctx.font = "48px serif";
//         ctx.fillStyle = "black"
//         ctx.fillRect(c.width/2-50,c.height/2-0, 100, 50)
//         ctx.fillStyle = "white"
//         ctx.fillText("Hard", c.width/2-45, c.height/2 + 40);
//         // ball.alive = true

//     }
// }
function draw_score(ctx) {
  ctx.font = "80px serif";
  ctx.fillText(player.score, 250, 75);
  ctx.fillText(computer.score, 750, 75);
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
function draw_player(ctx) {
  // clear screen
  ctx.fillStyle = "#f1f2da";
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillRect(player.posX, player.posY, paddle.w, paddle.h / 2);
  ctx.fillRect(player.posX, player.posY + 35, paddle.w, paddle.h / 2);
  ctx.fillRect(computer.posX, computer.posY, paddle.w, paddle.h / 2);
  ctx.fillRect(
    computer.posX,
    computer.posY + 35,
    paddle.w,
    paddle.h / 2
  );
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}
function draw_net(ctx) {
  for (let i = 0; i < 1000; i += 20) {
    ctx.fillStyle = "#808080";
    ctx.fillRect(500, i, 10, 10);
    ctx.fillStyle = "white";
  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkScore() {
  if (ball.x <= 0) {
    soundEFX1.currentTime = 0.1;
    soundEFX1.play();
    ball.x_speed *= -1;
    ball.alive = false;
    reset_ball();
    computer.score += 1;
  }
  if (ball.x >= 950) {
    soundEFX1.currentTime = 0.1;
    soundEFX1.play();
    ball.x_speed *= -1;
    ball.alive = false;
    reset_ball();
    player.score += 1;
    if (player.score > computer.score) {
      AISpeed++;
    }
  }
}
function checkSplash() {
  if (splash === true) {
    splashScreen.style.opacity = 0;
    ball.alive = false;
    setTimeout(() => {
      splashScreen.classList.add("hidden");
    }, 610);
  }
  // StartLevelSelect();
  ball.alive = true
}
function check_wall_collisions() {
  // check top wall
  if (ball.y <= 20) {
    ball.y = 20
    random_y_angle = getRndInteger(1, 5);
    ball.y += random_y_angle;
    soundEFX2.play();
    start_screen_shake()
  }
  // check bottom wall
  if (ball.y >= 600) {
    ball.y = 600
    random_y_angle = getRndInteger(-5, -1);
    ball.y += random_y_angle;
    soundEFX2.play();
    start_screen_shake()
  }
}
function game_check_keyboard() {
  if (current_keys.get("Enter") === true) {
    splash = true;
  }
  if (current_keys.get("w") === true || current_keys.get('ArrowUp')) {
    player.posY -= 5;
  }
  if (current_keys.get("s") === true || current_keys.get('ArrowDown')) {
    player.posY += 5;
  }
}
function menu_check_keyboard() {

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
function start_screen_shake() {
    if (shake_enabled) {
      screenShaking = true;
      setTimeout(() => {
        screenShaking = false;
      }, 200);
    }
}
function check_paddle_collisons() {
  // move the ball
  let new_ball_x = ball.x + ball.x_speed;
  //if ball hit player paddle
  //reverse direction
  if(new_ball_x <= 115 && ball.y >= player.posY && ball.y <= player.posY + 70) {
    ball.x = 115
    ball.x_speed *= -1;
    ball.x += ball.x_speed;
    soundEFX2.play();
    random_y_angle = getRndInteger(-5, 5);
    ball.y += random_y_angle;
    start_particles(ball.x,ball.y)
    start_screen_shake()
    return
  }

  //if ball hit computer paddle
  //reverse direction
  if(new_ball_x >= 880 && ball.y >= computer.posY && ball.y <= computer.posY + 71) {
    ball.x = 880
    ball.x_speed *= -1;
    ball.x += ball.x_speed;
    soundEFX2.play();
    random_y_angle = getRndInteger(-5, 5);
    ball.y += random_y_angle;
    start_particles(ball.x,ball.y)
    start_screen_shake()
    return
  }

  ball.x = new_ball_x
  ball.y = ball.y + random_y_angle
}
function update_computer_paddle() {
  if (computer.posY + 35 <= ball.y) computer.posY += AISpeed;
  if (computer.posY + 35 >= ball.y) computer.posY -= AISpeed;
}

function draw_debug(ctx) {
  if(DEBUG.print_ai) {
    ctx.fillStyle = 'red'
    ctx.font = '24px sans-serif'
    ctx.fillText("ai speed = " + AISpeed, 100,100)
    ctx.fillText("ball speed = " + ball.x_speed, 100,130)
  }
}

function update() {
  checkSplash();
  //input
  //   updateLevelSelect()
  //movement / physics
  if (ball.alive === true) {
    //check for user input
    game_check_keyboard();
    // move the computer
    update_computer_paddle();
    //check for wall collisions
    check_wall_collisions();
    //check for paddle collisions
    check_paddle_collisons();

    checkScore();

    update_particles();

    ctx.save();
    if (screenShaking === true) {
      ctx.translate(Math.random() * 30, 0);
    }
    // draw
    draw_player(ctx);
    draw_net(ctx);
    draw_score(ctx);
    draw_particles();
    draw_debug(ctx)
    ctx.restore();
  }
  window.requestAnimationFrame(update);
}

function start() {
  if (ball.alive === true) {
    draw_score(ctx);
  }
  setup_keyboard();
  update()
}
start();
