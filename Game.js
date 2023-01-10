import {ParticleSource} from "./particles.js";
import {LevelSelector} from "./Levelselect.js"
import {Level} from './level.js'
import {Bounds, Point, Size} from "./node_modules/josh_js_util/dist/index.js"

Bounds.prototype.translate = function(pt) {
  return new Bounds(
      this.position.add(pt),
      this.size
  )
}
const DEBUG = {
  print_ai: false,
  sound:false,
  particles:true,
  bounds:true,
  print_ball:false,
};

let particles = new ParticleSource()
particles.particles_enabled = DEBUG.particles
let player = {
  score: 0,
  // posX: 100,
  // posY: 165,
  bounds: new Bounds(new Point(100,165), new Size(28,140))
};
let paddle = {
  w: 14,
  h: 70,
};
let computer = {
  posX: 900,
  posY: 265,
  score: 0,
};


const c = document.getElementById("Game");
const ctx = c.getContext("2d");
const splashScreen = document.querySelector(".splash");
const shake_enabled = true;
const PlayerPaddleSkin = new Image();
const CurrentEnemy = new Image();
const PaddelSkinAI = new Image();
const TopHatSkin = new Image();
const ChristmasHatSkin = new Image();
const PlainSkin = new Image();
const RedBeltSkin = new Image();
const fireball = new Image();
fireball.src = "FireBall.png";
let TopHat = "/TopHatSkin.png";
let ChristmasHat = "/ChristMasSkin.png";
let Plain = "/PlainSkin.png";
let RedBelt = "/RedBelt.png";
let random_y_angle = null;
let paused = false;
let arrowUpPressed = false;
let arrowDownPressed = false;
let showing_splash = true;
let soundEFX1 = new Audio("/explosion.wav");
let soundEFX2 = new Audio("/click.wav");
let soundEFX3 = new Audio("/ControllsFliped.wav");
let screenShaking = false;
let current_keys = new Map();
let nav_keys = new Map()
let FlipedControlles = false;
let settingsWindowOpen = false;
let settingRuned = false;
let LeftPressed = false;
let RightPressed = false;
let skinOn = 1;
let checkHealthBarVisable = true;
let current_enemy_bounds = new Bounds(new Point(500,325), new Size(10,10))
let EnemyHealth = 10;
let SoundedPlayed = false;
RedBeltSkin.src = "/RedBelt.png";
PlainSkin.src = "/PlainSkin.png";
TopHatSkin.src = "/TopHatSkin.png";
ChristmasHatSkin.src = "/ChristMasSkin.png";
PaddelSkinAI.src = "/PlainSkin.png";
PlayerPaddleSkin.src = Plain;
CurrentEnemy.src = null;
let FireBallPosx = 500;
let FireBallPosy = 325//CurrentEnemyPosY;

const LEVEL1 = new Level()
LEVEL1.fireBallActive = false
LEVEL1.AISpeed = 2;
LEVEL1.CurrentEnemyW = 16 * 5;
LEVEL1.CurrentEnemyH = 16 * 5;
LEVEL1.Enemy = true
LEVEL1.enemy_src = "/Snail.png";
LEVEL1.EnemySpeed = 1;

const LEVEL2 = new Level()
LEVEL2.fireBallActive = true
LEVEL2.AISpeed = 2;
LEVEL2.CurrentEnemyW = 16 * 3;
LEVEL2.CurrentEnemyH = 16 * 3;
LEVEL2.Enemy = true
LEVEL2.enemy_src = "/FireMan.png";
LEVEL2.EnemySpeed = 1;
const LEVELS = [LEVEL1, LEVEL2]
let mode = "splash"
let level_select = new LevelSelector(LEVELS)
let current_level = null
class Ball {
  constructor() {
      this.bounds = new Bounds(new Point(400, 200), new Size(10, 10))
      this.x_speed = 5
      this.alive = true
  }
}
let balls = []
random_y_angle = getRndInteger(-5, 5);
function drawFireBall() {
  if (current_level.fireBallActive) {
    FireBallPosx -= 1;
    ctx.drawImage(fireball, FireBallPosx, FireBallPosy, 16 * 3, 16 * 3);
  }
}
function DrawEnemyHeathBar() {
  if (checkHealthBarVisable === true) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.strokeRect(500 - 100, 600, 200, 25);
    ctx.fillStyle = "black";
    ctx.fillRect(500 - 98, 600 + 2, EnemyHealth * 19.6, 22);
  }
}
function CheckEnemyHealth() {
  if (checkHealthBarVisable === true) {
    if (EnemyHealth <= 0) {
      EnemyHealth = 0;
      current_level.Enemy = false
    }
  }
}
function draw_enemy() {
  if (current_level.Enemy === true) {
    ctx.drawImage(
      CurrentEnemy,
      current_enemy_bounds.position.x,
      current_enemy_bounds.position.y,
      current_enemy_bounds.size.w,
      current_enemy_bounds.size.h
    );
    if (player.bounds.position.y-30 + player.bounds.size.w <= current_enemy_bounds.position.y) {
      current_enemy_bounds.position.y -= current_level.EnemySpeed;
    }
    if (player.bounds.position.y-30 >= current_enemy_bounds.position.y) {
      current_enemy_bounds.position.y += current_level.EnemySpeed;
    }
    if (player.bounds.position.y-30 <= current_enemy_bounds.position.x) {
      current_enemy_bounds.position.x -= current_level.EnemySpeed;
    }
    if (player.bounds.position.y-30 >= current_enemy_bounds.position.x) {
      current_enemy_bounds.position.x += current_level.EnemySpeed;
    }
  }
}
function draw_settings_window() {
  if (settingsWindowOpen === true) {
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "blue";
    let ofset = 10;
    for (let i = 0; i < 5; i += 1) {
      ofset = ofset + 150;
      ctx.fillRect(-10 + ofset, 75, 100, 100);
    }

    if (current_keys.get("ArrowLeft") === true) {
      if (LeftPressed === false) {
        skinOn -= 1;
        LeftPressed = true;
        RightPressed = false;
      }
    }
    if (current_keys.get("ArrowLeft") === false) {
      LeftPressed = false;
    }
    if (current_keys.get("ArrowRight") === true) {
      if (RightPressed === false) {
        skinOn += 1;
        RightPressed = true;
        LeftPressed = false;
      }
    }
    if (current_keys.get("ArrowRight") === false) {
      RightPressed = false;
    }
    console.log(skinOn);
    if (skinOn === 1) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(145, 70, 110, 110);
    }
    if (skinOn === 2) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(295, 70, 110, 110);
    }
    if (skinOn === 3) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(145 + 150 * skinOn - 150, 70, 110, 110);
    }
    if (skinOn === 4) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(145 + 150 * skinOn - 150, 70, 110, 110);
    }
    if (skinOn === 5) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(145 + 150 * skinOn - 150, 70, 110, 110);
    }
    ctx.drawImage(PlainSkin, 190, 80, 14 * 1.2, 70 * 1.2);
    ctx.drawImage(TopHatSkin, 340, 80, 14 * 1.2, 70 * 1.2);
    ctx.drawImage(ChristmasHatSkin, 350 + 140, 80, 14 * 1.2, 70 * 1.2);
    ctx.drawImage(RedBeltSkin, 350 + 145 * 2, 80, 14 * 1.2, 70 * 1.2);

    if (current_keys.get("Enter") === true) {
      if (skinOn === 1) {
        PlayerPaddleSkin.src = Plain;
      }
      if (skinOn === 2) {
        PlayerPaddleSkin.src = TopHat;
      }
      if (skinOn === 3) {
        PlayerPaddleSkin.src = ChristmasHat;
      }
      if (skinOn === 4) {
        PlayerPaddleSkin.src = RedBelt;
      }
      paused = false;
      settingsWindowOpen = false
    }
  }
}
function checkSettingsWindow() {
  if (current_keys.get("x") === true) {
    if (settingRuned === false) {
      paused = true;
      settingsWindowOpen = true;
      settingRuned = true;
    }
  }
  if (current_keys.get("x") === false) {
    settingRuned = false;
  }
}
function EnemyEatPaddle() {
  if(current_enemy_bounds.intersects(player.bounds) || player.bounds.intersects(current_enemy_bounds)) {
    console.log("Paddle Being Eaten")
    player.bounds.size.h -= 0.5
    if (player.bounds.size.h <= 0) {
      console.log("PlayerDied")
      player.bounds.size.h = 0;
    }
  
  }
}
function reset_ball() {
  balls = []
  balls.push(new Ball);
  random_y_angle = getRndInteger(-5, 5);
  for (let i = 0; i < balls.length; i++) {
    balls[i].alive = true;
    balls[i].bounds.position = new Point(400,200)
    balls[i].bounds.position.y += random_y_angle;
  }
  player.bounds.position.x = 100;
  player.bounds.position.y = 165;
  computer.posX = 900;
  computer.posY = 265;
  screenShaking = false;
}
function setup_keyboard() {
  window.addEventListener("keydown", function (event) {
    current_keys.set(event.key, true);
    nav_keys.set(event.key,true)
  });
  window.addEventListener("keyup", function (event) {
    current_keys.set(event.key, false);
  });
}
function draw_score(ctx) {
  ctx.font = "80px serif";
  ctx.fillStyle = "black";
  ctx.fillText(player.score, 250, 75);
  ctx.fillText(computer.score, 750, 75);
}
function Flip_Controlls() {
  if (FlipedControlles === true) {
    if (SoundedPlayed === false && DEBUG.sound) {
      soundEFX3.play();
      SoundedPlayed = true;
    }
  }
}
function draw_paddles_and_ball(ctx) {
  ctx.fillStyle = "#ffeecc";
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(PlayerPaddleSkin,
      player.bounds.position.x, player.bounds.position.y,
      player.bounds.size.w,
      player.bounds.size.h,
);
  ctx.drawImage(PaddelSkinAI, computer.posX, computer.posY, 14 * 2, 70 * 2);
  ctx.fillStyle = "#ff6973";
  for (let i = 0; i < balls.length; i++) {
    // for (let t = 0; t < 5; t++) {
    //   let per = t / 5;
    //   let r = Math.floor(per * 255);
    //   let g = Math.floor(per * 176) + 5;
    //   let b = Math.floor(per * 163);
    //   ctx.fillStyle = `rgba(${r},${g},${b},${100 - per * 100}%)`;
      // ctx.fillRect(
      //   balls[i].bounds.position.x + balls[i].x_speed * -t,
      //   balls[i].bounds.position.y + random_y_angle * -t,
      //   balls[i].bounds.size.w + t,
      //   balls[i].bounds.size.h + t
      // );
    // }
    balls[i].bounds.position.y += random_y_angle
    ctx.fillRect(balls[i].bounds.position.x, balls[i].bounds.position.y, balls[i].bounds.size.w, balls[i].bounds.size.h);
  }

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

function play_hit_wall_sound() {
  if(DEBUG.sound === true) {
    soundEFX1.currentTime = 0.1;
    soundEFX1.play();
  }
}

function checkScore() {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].bounds.position.x <= 0) {
      play_hit_wall_sound()
      balls[i].x_speed *= -1;
      balls[i].alive = false;
      console.log("Reseting")
      reset_ball();
      computer.score += 1;
    }
    if (balls[i].bounds.position.x >= 950) {
      play_hit_wall_sound()
      balls[i].x_speed *= -1;
      balls[i].alive = false;
      console.log("Reseting")
      reset_ball();
      player.score += 1;
    }
  }
}

function start_splash() {
  if (showing_splash === true) {
    splashScreen.style.opacity = 100
  } else {
    splashScreen.style.opacity = 0
  }
  setTimeout(() => {
    splashScreen.classList.add("hidden");
    showing_splash = false
    // level_select.set_visible(true)
    // mode = "levelSelect"
    mode = "startScreen"

  }, 1000)
}

function play_hit_paddle_sound() {
  if(DEBUG.sound) {
    soundEFX2.play();
  }
}

function check_wall_collisions() {
  // check top wall
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].bounds.position.y <= 20) {
      balls[i].bounds.position.y = 20;
      particles.start_particles(balls[i].bounds.position.x, balls[i].bounds.position.y);
      random_y_angle = getRndInteger(1, 5);
      balls[i].bounds.position.y += random_y_angle;
      play_hit_wall_sound()
      start_screen_shake();
    }
    // check bottom wall
    if (balls[i].bounds.position.y >= 630) {
      particles.start_particles(balls[i].bounds.position.x, balls[i].bounds.position.y);
      balls[i].bounds.position.y = 600;
      random_y_angle = getRndInteger(-5, -1);
      balls[i].bounds.position.y += random_y_angle;
      play_hit_wall_sound()
      start_screen_shake();
    }
  }
  if (player.bounds.position.y <= 0) {
    player.bounds.position.y = 0;

  }
  if (player.bounds.position.y >= 580) {
    player.bounds.position.y = 580;
  }
}
function game_check_keyboard() {
  if (current_keys.get("ArrowRight") === true) {
    if (arrowUpPressed === false) {
      arrowUpPressed = true;
      arrowDownPressed = false;
    }
  }
  if (current_keys.get("ArrowRight") === false) {
    arrowUpPressed = false;
  }

  if (current_keys.get("ArrowLeft") === true) {
    if (arrowDownPressed === false) {
      arrowUpPressed = false;
      arrowDownPressed = true;
    }
  }
  if (current_keys.get("ArrowLeft") === false) {
    arrowDownPressed = false;
  }
  if (current_keys.get("w") || current_keys.get("ArrowUp")) {
    if (FlipedControlles === false) {
      player.bounds.position.y -= 5;
    }
  }
  if (current_keys.get("s") || current_keys.get("ArrowDown")) {
    if (FlipedControlles === false) {
      player.bounds.position.y += 5;
    }
  }
  if (current_keys.get("w") || current_keys.get("ArrowUp")) {
    if (FlipedControlles === true) {
      player.bounds.position.y += 5;
    }
  }
  if (current_keys.get("s") || current_keys.get("ArrowDown")) {
    if (FlipedControlles === true) {
      player.bounds.position.y -= 5;
    }
  }
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
  for (let i = 0; i < balls.length; i++) {
    let new_ball_x = balls[i].bounds.position.x += balls[i].x_speed;
    let new_ball_bounds = balls[i].bounds.translate(new Point(balls[i].x_speed,random_y_angle))
  //if ball hit player paddle
  //reverse direction
  if(new_ball_bounds.intersects(player.bounds) || player.bounds.intersects(new_ball_bounds)) {
    //flip speed
    balls[i].x_speed *= -1;
    play_hit_paddle_sound()
    //new random y angle
    random_y_angle = getRndInteger(-5, 5);
    //calc new ball position
    balls[i].bounds = balls[i].bounds.translate(new Point(balls[i].x_speed,random_y_angle))
    particles.start_particles(balls[i].bounds.position.x, balls[i].bounds.position.y);
    start_screen_shake();
    balls[i].bounds.position.x = new_ball_x;
    balls[i].bounds.position.y = balls[i].bounds.position.y + random_y_angle;
  }
  if (
    new_ball_x >= 880 &&
    balls[i].bounds.position.y >= computer.posY &&
    balls[i].bounds.position.y <= computer.posY + paddle.h * 2
  ) {
    balls[i].bounds.position.x = 880;
    balls[i].x_speed *= -1;
    play_hit_paddle_sound()
    random_y_angle = getRndInteger(-5, 5);
    console.log(random_y_angle)
    balls[i].bounds.position.y = balls[i].bounds.position.y + random_y_angle;
    particles.start_particles(balls[i].bounds.position.x, balls[i].bounds.position.y);
    start_screen_shake();
  }
  // balls[i].bounds.position.x += balls[i].x_speed;

}
}
function update_computer_paddle() {
  for (let i = 0; i < balls.length; i++) {
    if (computer.posY + 35 <= balls[i].bounds.position.y) computer.posY += current_level.AISpeed;
    if (computer.posY + 35 >= balls[i].bounds.position.y) computer.posY -= current_level.AISpeed;
  }
}
function draw_debug(ctx) {
  if (DEBUG.print_ai) {
    ctx.fillStyle = "red";
    ctx.font = "24px sans-serif";
    ctx.fillText("ai speed = " + current_level.AISpeed, 100, 100);
    ctx.fillText("ball speed = " + ball.x_speed, 100, 130);
  }
  if(DEBUG.print_ball) {
    ctx.fillStyle = "black";
    ctx.font = "24px sans-serif";
    ctx.fillText(`ball xy = ${ball.bounds.position.x} ${ball.bounds.position.y}`,
        100, 130);
    ctx.fillText(`player xy = ${player.bounds.position.x} ${player.bounds.position.y}`,
        100, 150);
    ctx.fillText(`player wh = ${player.bounds.size.w} ${player.bounds.size.h}`,
        100, 170);
    let p1 = player.bounds.position
    //if b.p1 inside of a
    //if
    ctx.fillText(`p1  ${p1.x} ${p1.y} ${ball.bounds.contains(p1)}`,
        100, 390);
  }
}
function clear_screen(ctx) {
  // clear screen
  ctx.fillStyle = "#f1f2da";
  ctx.clearRect(0, 0, c.width, c.height);
}
function drawDebugBounds() {
  for (let i = 0; i < balls.length; i++) {
  if (DEBUG.bounds === true) {
    ctx.strokeStyle = "red"
    ctx.strokeRect(player.bounds.position.x,player.bounds.position.y,player.bounds.size.w,player.bounds.size.h)
    ctx.lineWidth = 4;
    ctx.strokeStyle = "blue"
    ctx.strokeRect(balls[i].bounds.position.x,balls[i].bounds.position.y,balls[i].bounds.size.w,balls[i].bounds.size.h)
    ctx.strokeStyle = "yellow"
    ctx.strokeRect(current_enemy_bounds.position.x,current_enemy_bounds.position.y,current_enemy_bounds.size.w,current_enemy_bounds.size.h)

  }
}
}
let loadSelected = false
let startSelected = false
function drawStartScreen() {
  if (mode = "startScreen") {
    console.log("Loading Startscreen")
    ctx.fillStyle = "gray"
    ctx.fillRect(0,0,c.width,c.height)
    ctx.fillStyle = "white"
    ctx.font = "100px serif";
    ctx.fillText("PONG", c.width/2-120, 90);
    ctx.fillStyle = "black"
    ctx.fillRect(c.width/2-90,200,180,50)
    ctx.fillRect(c.width/2-90,300,180,50)
    ctx.fillStyle = "white"
    ctx.font = "50px serif";
    ctx.fillText("Start",c.width/2-50,240);
    ctx.fillText("Load",c.width/2-50,340)



    if (mode === "startScreen") {
      if (current_keys.get("ArrowDown") === true) {
        startSelected = false
        loadSelected = true;
      }
      if (current_keys.get("ArrowUp") === true) {
        loadSelected = false;
        startSelected = true;
      }
      if (current_keys.get("Enter") === true) {
        if (startSelected === true) {
            level_select.set_visible(true)
            mode = "levelSelect"

          }
        if (loadSelected === true) {
        }
      }
    }
    if (loadSelected === true) {
      console.log("Down")
      ctx.strokeStyle = "red"
      ctx.lineWidth = 3;
      ctx.strokeRect(c.width/2-90,300,180,50)
    }
    if (startSelected === true) {
      console.log("Up")
      ctx.strokeStyle = "red"
      ctx.lineWidth = 3;
      console.log("Start")
      ctx.strokeRect(c.width/2-90,200,180,50)
    }
  
  }
}
let hitEnemy = false;
function update() {
  game_check_keyboard(ctx);
  if (mode === "levelSelect") {
      if(level_select.visible) {
        level_select.check_input(nav_keys,showing_splash)
        if(level_select.finished) {
          mode = "play"
          balls.push(new Ball)
          // let ball2 = new Ball();
          // ball2.x_speed = 1
          // balls.push(ball2)
          console.log("really starting the level", level_select.levelOn)
          current_level = LEVELS[level_select.levelOn-1]
          CurrentEnemy.src = current_level.enemy_src
          current_enemy_bounds.size.w = current_level.CurrentEnemyW
          current_enemy_bounds.size.h = current_level.CurrentEnemyH
          level_select.set_visible(false)
        }
        level_select.draw(ctx, c);
      }
  }
  for (let i = 0; i < balls.length; i++) {
    if(balls[i].bounds.intersects(current_enemy_bounds) || current_enemy_bounds.intersects(balls[i].bounds)) {
      if (hitEnemy === false) {
        console.log("hit the enemy with the ball")
        if (current_level.Enemy === true) {
          screenShaking = true
        }
        hitEnemy = true
        setTimeout(() => {
            screenShaking = false
          
        }, 200)
        setTimeout(() => {
          EnemyHealth -= 5;
        }, 1000)
  
      }
    }
    if(balls[i].bounds.intersects(current_enemy_bounds) || current_enemy_bounds.intersects(balls[i].bounds) === false) {
      hitEnemy = false;
    }
  }
  
  // let alive = false
  // for (let i = 0; i < balls.length; i++) {
  //   if (balls[i].alive === true) {
  //     alive = true
  //     console.log("ALive")
  //   }
  // }

  checkSettingsWindow(ctx);
  if (paused) {
      clear_screen(ctx);
      draw_settings_window();
  } else {
      // move the computer
      drawStartScreen();
      if (mode === "play") {
        update_computer_paddle(ctx);
        //check for wall collisions
        check_wall_collisions(ctx);
        //check for paddle collisions
        check_paddle_collisons(ctx);
        checkScore(ctx);
        particles.update_particles(ctx);
        Flip_Controlls(ctx);
        CheckEnemyHealth();
        ctx.save();
        if (screenShaking === true) {
          ctx.translate(Math.random() * 30, 0);
        }
      
      // draw
      clear_screen(ctx);
      draw_paddles_and_ball(ctx);
      draw_net(ctx);
      draw_score(ctx);
      particles.draw_particles(ctx);
      draw_debug(ctx);
      draw_enemy();
      DrawEnemyHeathBar();
      drawFireBall();
      ctx.restore();
      drawDebugBounds();
      EnemyEatPaddle();
      }
      
  }

  nav_keys.clear()
  window.requestAnimationFrame(update);
}
function start() {
  showing_splash = true
  if (mode === "splash") {
    start_splash(ctx);
  }
  // splashScreen.style.opacity = 0
  // level_select.set_visible(false)
  setup_keyboard();


  // ball.alive = true
  // current_level = LEVEL1
  // CurrentEnemy.src = current_level.enemy_src
  // current_enemy_bounds.size.w = current_level.CurrentEnemyW
  // current_enemy_bounds.size.h = current_level.CurrentEnemyH
  // reset_ball()
  // ball.x_speed = -1

  update();
}
start();
