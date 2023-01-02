let parts = [];
const particles_enabled = true;

export function start_particles(x, y) {
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
export function draw_particles(ctx) {
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
export function update_particles() {
    parts.forEach((part) => {
        part.pos.x += part.vel.x;
        part.pos.y += part.vel.y;
        part.age += 1;
        if (part.age > 50) {
            part.alive = false;
        }
    });
}
