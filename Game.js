const c = document.getElementById("Game");
const ctx = c.getContext("2d");
const splashScreen = document.querySelector(".splash");
let RectOfset = 40;
let TextLeftOfset = 250;
let OutlineOfset = 225;
let RectLeftOfset =  250;
let RectHeight = 100;
const shake_enabled = true;
const particles_enabled = true;
const DEBUG = {
  print_ai: false,
};
let colors = {
  blue: "#0a2e44",
  yellow: "#fcffcc",
};
let ball = {
  x: 400,
  y: 200,
  r: 5,
  width: 10,
  height: 10,
  x_speed: 4,
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
let levelLeftOfset = 100;
let level1 = {
  x: 10,
  y: 98,
  w: 50,
  h: 55,
};
let level2 = {
  x: 110,
  y: 98,
  w: 50,
  h: 50,

};

let level3 = {
  x: 210,
  y: 98,
  w: 50,
  h: 50,

};
let splashScreenOn = false;
let BALLLIVE = false;
let arrowUpPressed = false;
let arrowDownPressed = false;
let splash = null;
let random_y_angle = null;
let soundEFX1 = new Audio("/explosion.wav");
let soundEFX2 = new Audio("/click.wav");
let parts = [];
random_y_angle = getRndInteger(-5, 5);
ball.y += random_y_angle;
let screenShaking = false;
let AISpeed = 2;
let current_keys = new Map();
let level = true;
let levelOn = 1;
let levelActice = null;
let LevelStart = false;
let RectWidthLine = 5;
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
  if (!particles_enabled) return;
  parts = [];
  for (let i = 0; i < 50; i++) {
    parts.push({
      pos: {
        x: x,
        y: y,
      },
      vel: {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      },
      alive: true,
      age: 0,
    });
  }
}
function StartLevelSelect() {
  if (LevelStart === false) {
    LevelStart = true;
  }
}
function updateLevelSelect() {
  if (ball.alive === false) {
    if ((LevelStart = true)) {
      console.log("LevelSelect");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, c.width, c.height);
      //DrawOutline
      if (levelOn === 1) {
        ctx.lineWidth = RectWidthLine;
        ctx.strokeStyle = "red";
        ctx.strokeRect(level1.x + OutlineOfset, level1.y, level1.w, level1.h);
      }
      if (levelOn === 2) {
        ctx.lineWidth = RectWidthLine;
        console.log("2");
        ctx.strokeStyle = "red";
        ctx.strokeRect(level2.x + OutlineOfset, level2.y, level1.w, level1.h);
      }
      if (levelOn === 3) {
        ctx.lineWidth = RectWidthLine;
        console.log("3");
        ctx.strokeStyle = "red";
        ctx.strokeRect(level3.x + OutlineOfset, level3.y, level1.w, level1.h);
      }
      if (levelOn === 4) {
        ctx.lineWidth = RectWidthLine;
        console.log("4");
        ctx.strokeStyle = "red";
        ctx.strokeRect(310 + OutlineOfset, 98, 50, 55);
      }

      if (levelOn === 5) {
        ctx.lineWidth = RectWidthLine;
        console.log("5");
        ctx.strokeStyle = "red";
        ctx.strokeRect(410 + OutlineOfset, 98, 50, 55);
      }
      if (levelOn === 6) {
        ctx.lineWidth = RectWidthLine;
        console.log("6");
        ctx.strokeStyle = "red";
        ctx.strokeRect(10 + OutlineOfset, 198, 50, 55);
      }
      if (levelOn === 7) {
        ctx.lineWidth = RectWidthLine;
        console.log("7");
        ctx.strokeStyle = "red";
        ctx.strokeRect(110 + OutlineOfset, 198, 50, 55);
      }
      if (levelOn === 8) {
        ctx.lineWidth = RectWidthLine;
        console.log("8");
        ctx.strokeStyle = "red";
        ctx.strokeRect(210 + OutlineOfset, 198, 50, 55);
      }
      if (levelOn === 9) {
        ctx.lineWidth = RectWidthLine;
        console.log("9");
        ctx.strokeStyle = "red";
        ctx.strokeRect(310 + OutlineOfset, 198, 50, 55);
      }
      if (levelOn === 10) {
        ctx.lineWidth = RectWidthLine;
        console.log("10");
        ctx.strokeStyle = "red";
        ctx.strokeRect(410 + OutlineOfset, 198, 50, 55);
      }

      //Draw Rects
      ctx.font = "48px serif";
      ctx.fillStyle = "blue";
      //Number 1 Rect
      ctx.fillRect(-15 + RectLeftOfset, RectHeight, 50, 50);
      //Number 2 Rect
      for(let i = 0; i < 400; i += 100) {
        ctx.fillRect((75 + RectLeftOfset) + i + 10, RectHeight, 50, 50);
      }
      ctx.fillRect(-15 + RectLeftOfset, RectHeight+100, 50, 50);
      for (let i = 0; i < 400; i += 100) {
        ctx.fillRect((75 + RectLeftOfset) + i +10, RectHeight+100, 50, 50);
      }
      ctx.fillStyle = "white";
      ctx.fillText("1", 0 + TextLeftOfset, RectHeight + RectOfset);
      ctx.fillText("2", 100 + TextLeftOfset, RectHeight + RectOfset);
      ctx.fillText("3", 200 + TextLeftOfset, RectHeight + RectOfset);
      ctx.fillText("4", 300 + TextLeftOfset, RectHeight + RectOfset);
      ctx.fillText("5", 400 + TextLeftOfset, RectHeight + RectOfset);
      ctx.fillText("6", 0 + TextLeftOfset, 240);
      ctx.fillText("7", 100 + TextLeftOfset, 240);
      ctx.fillText("8", 200 + TextLeftOfset, 240);
      ctx.fillText("9", 300 + TextLeftOfset, 240);
      ctx.fillText("10", 385 + TextLeftOfset, 240);



      if (splashScreenOn === true) {
        if (current_keys.get("Enter") === true) {
          if (levelOn === 1) {
            BALLLIVE = true;
            AISpeed = 2;
          }
          if (levelOn === 2) {
            BALLLIVE = true;
            AISpeed = 4;
          }
          if (levelOn === 3) {
            BALLLIVE = true;
            AISpeed = 6;
          }
          if (levelOn === 4) {
            BALLLIVE = true;
            AISpeed = 8;
          }
          if (levelOn === 5) {
            BALLLIVE = true;
            AISpeed = 10;
          }
          if (levelOn === 6) {
            BALLLIVE = true;
            AISpeed = 12;
          }
          if (levelOn === 7) {
            BALLLIVE = true;
            AISpeed = 14;
          }
          if (levelOn === 8) {
            BALLLIVE = true;
            AISpeed = 16;
          }
          if (levelOn === 9) {
            BALLLIVE = true;
            AISpeed = 18;
          }
          if (levelOn === 10) {
            BALLLIVE = true;
            AISpeed = 20;
          }
        }
        if (BALLLIVE === true) {
          ball.alive = true;
        }
      }
    }
  }
}
function draw_score(ctx) {
  ctx.font = "80px serif";
  ctx.fillStyle = "#ffeecc";
  ctx.fillText(player.score, 250, 75);
  ctx.fillText(computer.score, 750, 75);
}
function draw_particles() {
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    if (part.alive) {
      let a = Math.floor(100 - part.age * 2);
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,119,119,${a}%)`;
      ctx.fillRect(part.pos.x, part.pos.y, 10, 10);
      ctx.restore();
    }
  }
}
function draw_paddles_and_ball(ctx) {
  ctx.fillStyle = "#ffeecc";
  ctx.fillRect(player.posX, player.posY, paddle.w, paddle.h);
  ctx.fillRect(computer.posX, computer.posY, paddle.w, paddle.h);

  for (let t = 0; t < 5; t++) {
    let per = t / 5;
    let r = Math.floor(per * 255);
    let g = Math.floor(per * 176) + 5;
    let b = Math.floor(per * 163);
    ctx.fillStyle = `rgba(${r},${g},${b},${100 - per * 100}%)`;
    ctx.fillRect(
      ball.x + ball.x_speed * -t,
      ball.y + random_y_angle * -t,
      ball.width + t,
      ball.height + t
    );
  }
  ctx.fillStyle = "#ff6973";
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}
function draw_net(ctx) {
  for (let i = 0; i < c.height; i += 20) {
    ctx.fillStyle = "#808080";
    ctx.fillRect(500, i, 10, 10);
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
  }
}
function checkSplash() {
  if (splash === true) {
    splashScreen.style.opacity = 0;
    setTimeout(() => {
      splashScreen.classList.add("hidden");
      splashScreenOn = true;
    }, 610);
  }
  StartLevelSelect();
  //   ball.alive = true
}
function check_wall_collisions() {
  // check top wall
  if (ball.y <= 20) {
    ball.y = 20;
    start_particles(ball.x, ball.y);
    random_y_angle = getRndInteger(1, 5);
    ball.y += random_y_angle;
    soundEFX2.play();
    start_screen_shake();
  }
  // check bottom wall
  if (ball.y >= 630) {
    start_particles(ball.x, ball.y);
    ball.y = 600;
    random_y_angle = getRndInteger(-5, -1);
    ball.y += random_y_angle;
    soundEFX2.play();
    start_screen_shake();
  }
  if (player.posY <= 0) {
    player.posY = 0;

  }
  if (player.posY >= 580) {
    player.posY = 580;
    }
}
function game_check_keyboard() {
  if (current_keys.get("ArrowRight") === true) {
    if (arrowUpPressed === false) {
      levelOn += 1;
      arrowUpPressed = true;
      arrowDownPressed = false;
    }
  }
  if (current_keys.get("ArrowRight") === false) {
    arrowUpPressed = false;
  }

  if (current_keys.get("ArrowLeft") === true) {
    if (arrowDownPressed === false) {
      levelOn -= 1;
      arrowUpPressed = false;
      arrowDownPressed = true;
    }
  }
  if (current_keys.get("ArrowLeft") === false) {
    arrowDownPressed = false;
  }
  if (current_keys.get("Enter") === true) {
    splash = true;
  }
  if (current_keys.get("w") === true || current_keys.get("ArrowUp")) {
    player.posY -= 5;
  }
  if (current_keys.get("s") === true || current_keys.get("ArrowDown")) {
    player.posY += 5;
  }
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
  if (
    new_ball_x <= 115 &&
    ball.y >= player.posY &&
    ball.y <= player.posY + 70
  ) {
    ball.x = 115;
    ball.x_speed *= -1;
    ball.x += ball.x_speed;
    soundEFX2.play();
    random_y_angle = getRndInteger(-5, 5);
    ball.y += random_y_angle;
    start_particles(ball.x, ball.y);
    start_screen_shake();
    return;
  }

  //if ball hit computer paddle
  //reverse direction
  if (
    new_ball_x >= 880 &&
    ball.y >= computer.posY &&
    ball.y <= computer.posY + 71
  ) {
    ball.x = 880;
    ball.x_speed *= -1;
    ball.x += ball.x_speed;
    soundEFX2.play();
    random_y_angle = getRndInteger(-5, 5);
    ball.y += random_y_angle;
    start_particles(ball.x, ball.y);
    start_screen_shake();
    return;
  }

  ball.x = new_ball_x;
  ball.y = ball.y + random_y_angle;
}
function update_computer_paddle() {
  if (computer.posY + 35 <= ball.y) computer.posY += AISpeed;
  if (computer.posY + 35 >= ball.y) computer.posY -= AISpeed;
}
function draw_debug(ctx) {
  if (DEBUG.print_ai) {
    ctx.fillStyle = "red";
    ctx.font = "24px sans-serif";
    ctx.fillText("ai speed = " + AISpeed, 100, 100);
    ctx.fillText("ball speed = " + ball.x_speed, 100, 130);
  }
}
function clear_screen(ctx) {
  // clear screen
  ctx.fillStyle = "#f1f2da";
  ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
  checkSplash();
  //check for user input
  game_check_keyboard();
  updateLevelSelect();

  if (ball.alive === true) {
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
    clear_screen(ctx);
    draw_paddles_and_ball(ctx);
    draw_net(ctx);
    draw_score(ctx);
    draw_particles();
    draw_debug(ctx);
    ctx.restore();
  }
  window.requestAnimationFrame(update);
}

function start() {
  if (ball.alive === true) {
    draw_score(ctx);
  }
  setup_keyboard();
  update();
}
start();
