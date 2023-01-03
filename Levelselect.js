export let ball = {
    x: 400,
    y: 200,
    r: 5,
    width: 10,
    height: 10,
    x_speed: 5,
    alive: false,
};
export let splashScreenOn = false;
let BALLLIVE = false;
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
let RectWidthLine = 5;
let RectOfset = 40;
let TextLeftOfset = 250;
let OutlineOfset = 225;
let RectLeftOfset =  250;
let RectHeight = 100;
export let levelOn = 1;
let LevelStart = false;
export function StartLevelSelect(ctx,c) {
  if (LevelStart === false) {
    LevelStart = true;
  }
}
export function updateLevelSelect(ctx,c) {
  if (ball.alive === false) {
    if ((LevelStart === true)) {
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
      for (let i = 0; i < 400; i += 100) {
        ctx.fillRect(75 + RectLeftOfset + i + 10, RectHeight, 50, 50);
      }
      ctx.fillRect(-15 + RectLeftOfset, RectHeight + 100, 50, 50);
      for (let i = 0; i < 400; i += 100) {
        ctx.fillRect(75 + RectLeftOfset + i + 10, RectHeight + 100, 50, 50);
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
