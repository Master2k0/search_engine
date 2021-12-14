export default function paint(ctx, DOT, H, W, dots, gradient){
    class Dot {
        constructor(x, y, vx, vy, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.dotsNears = [];
        }
    
        draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = DOT.color;
        ctx.fill();
        this.dotsNears.forEach((dotNear) => {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(dotNear.x, dotNear.y);
            ctx.lineWidth = (DOT.range - dotNear.d) * (2 / DOT.range);
            ctx.strokeStyle = DOT.colorLine;
            ctx.stroke();
        });
        }
    
        update(dots) {
        if (this.x - this.r >= W) {
            this.x = 0 - this.r;
            this.vy = (Math.random() - 0.5) * DOT.vY;
        }
        if (this.x + this.r < 0) {
            this.x = W + this.r;
            this.vy = (Math.random() - 0.5) * DOT.vY;
        }
        if (this.y - this.r >= H) {
            this.y = 0 - this.r;
            this.vx = (Math.random() - 0.5) * DOT.vX;
        }
        if (this.y + this.r < 0) {
            this.y = H + this.r;
            this.vx = (Math.random() - 0.5) * DOT.vX;
        }
    
        this.x += this.vx;
        this.y += this.vy;
    
        this.dotsNears = [];
        dots.forEach((dot) => {
            if (dot === this) return;
            const d = Math.sqrt((this.x - dot.x) ** 2 + (this.y - dot.y) ** 2);
            if (d < DOT.range) {
            this.dotsNears.push({ x: dot.x, y: dot.y, d: d });
            }
        });
        this.draw();
        }
    }
    function init() {
        for (let i = 0; i < DOT.count; i++) {
            const r = Math.random() * 3 + 3;
            const positionX = Math.random() * W;
            const positionY = Math.random() * H;
            const vx = (Math.random() - 0.5) * DOT.vX;
            const vy = (Math.random() - 0.5) * DOT.vY;
            dots.push(new Dot(positionX, positionY, vx, vy, r));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);
    
        if (dots.length > DOT.count) {
            dots = dots.filter(
                (dot) =>
                    dot.x + dot.r > 0 &&
                    dot.x - dot.r < W &&
                    dot.y + dot.r > 0 &&
                    dot.y - dot.r < H
                );
        }
        dots.forEach((dot) => {
        dot.update(dots);
        });
    }
    
    init();
    animate();
}