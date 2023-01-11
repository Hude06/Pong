const LevelSelectorWords = "Level Select"
const RectWidthLine = 5
const RectLeftOfset = 250 
export class LevelSelector {
    constructor(levels) {
        this.levels = levels
        this.levelOn = 1
        this.visible = false
        this.finished = false
    }

    set_visible(visible) {
        this.visible = visible
    }

    draw(ctx, c) {
        if (!this.visible) return
        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, c.width, c.height)


        ctx.fillStyle = "lightgray"
        ctx.fillRect(RectLeftOfset, 100, 100*5, 100*2)

        for(let i=0; i<this.levels.length; i++) {
            let level = this.levels[i]
            ctx.lineWidth = RectWidthLine

            let x = RectLeftOfset + 100*i
            let y = 100

            // draw button background
            ctx.fillStyle = "blue"
            ctx.fillRect(x,y, 50, 50)

            // draw button text
            ctx.font = "48px serif"
            ctx.fillStyle = 'white'
            ctx.fillText(""+(i+1),x+15,y+40)
            // draw rect if selected

            if((this.levelOn -1) === i) {
                ctx.strokeStyle = "red"
                ctx.strokeRect(x,y,50,50)
            }
        }
        ctx.font = "48px Roboto"
        ctx.fillText(LevelSelectorWords, c.width / 2 - 150, c.height / 2 - 250)
    }

    select_next_level() {
        this.levelOn += 1

    }
    select_prev_level() {
        this.levelOn -= 1
    }
    checkLevelLength() {
        if (this.levelOn > this.levels.length) {
            this.levelOn = 1;
        }
        if (this.levelOn <= 0) {
            this.levelOn = this.levels.length;
        }
    }

    check_input(current_keys,showing_splash,mode) {
        if (mode === "levelSelect") {
            if (current_keys.get("ArrowRight") === true) {
                this.select_next_level()
                this.checkLevelLength();
            }
            if (current_keys.get("ArrowLeft") === true) {
                this.select_prev_level()
                this.checkLevelLength();
            }
            if (current_keys.get("Enter") === true) {
                this.start_level()
            }
        }
    }

    start_level() {
        this.finished = true
    }
}
