const COLORS = [
    {r: 23, g: 1, b: 63}, //dark purple 23, 1, 63
    {r: 34, g: 0, b: 27}, // light purple 34, 0, 27
    {r: 85, g: 0, b: 50}, 
    {r: 34, g: 0, b: 27}, 
];


const PI2 = Math.PI * 2;

class GlowParticle {
  constructor(x, y, radius, rgb) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;

    this.vx = Math.random() * 4;
    this.vy = Math.random() * 4;

    this.sinValue = Math.random(); 
  }

  animate(ctx, stageWidth, stageHeight) {
    this.sinValue += 0.01;

    this.radius += Math.sin(this.sinValue);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > stageWidth) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > stageHeight) {
      this.vy *= -1;
      this.y -= 10;
    }

    ctx.beginPath();
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );

    //뿌애짐
    g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`)
    g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`)
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
    ctx.fill();
    
  }
}


class App {
    constructor () {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1)? 2 : 1;

        this.totalParticles = 15;
        this.particles = [];
        this.maxRadius = 900;//원의크기가 엄청커짐
        this.minRadius = 400;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;

      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeight * this.pixelRatio;
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      this.ctx.globalCompositeOperation = 'saturation';//그라데이션이 물결처럼 움직임

      this.createParticles();
    }

    createParticles() {
      let curColor = 0;
      this.particles = [];

      for (let i = 0; i < this.totalParticles; i++) {
        const item = new GlowParticle(
            Math.random() * this.stageWidth,
            Math.random() * this.stageHeight,
            Math.random() *
            (this.maxRadius - this.minRadius) + this.minRadius, COLORS[curColor]
        );

        if (++curColor >= COLORS.length) {
            curColor = 0;
        }

        this.particles[i] = item;
      }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}



window.onload = () => {
  new App();
}

