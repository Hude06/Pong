let startSelected = false
let loadSelected = false
let topButtonOffset = 100;
function checkSplash() {
  if (showing_splash === true) {
    setStartScreenCode();
    if (current_keys.get("ArrowDown") === true) {
      startSelected = false
      loadSelected = true;
    }
    if (current_keys.get("ArrowUp") === true) {
      loadSelected = false;
      startSelected = true;
    }
    if (loadSelected === true) {
      ctx.clearRect(0,0,c.width,c.height)
      setStartScreenCode();
      ctx.strokeStyle = "red"
      ctx.lineWidth = 3;
      ctx.strokeRect(c.width/2-50,200+topButtonOffset,120,50)
    }
    if (startSelected === true) {
      ctx.clearRect(0,0,c.width,c.height)
      setStartScreenCode();
      ctx.strokeStyle = "red"
      ctx.lineWidth = 3;
      ctx.strokeRect(c.width/2-50,100+topButtonOffset,120,50)
    }
    if (current_keys.get("Enter") === true) {
      if (startSelected === true) {
        level_select.set_visible(true)
      } 
    }
  }
}