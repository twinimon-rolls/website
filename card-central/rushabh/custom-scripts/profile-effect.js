(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'anime-fx-canvas';
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9999',
      mixBlendMode: 'screen'
    });
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
  
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  
    let time = 0;
    const explosions = [];
    class HeatWave {
      constructor() {
        this.reset();
      }
  
      reset() {
        this.x = Math.random() * width;
        this.y = height + 50;
        this.speed = Math.random() * 2 + 2;
        this.amplitude = Math.random() * 30 + 20;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.length = Math.random() * 150 + 100;
        this.alpha = Math.random() * 0.4 + 0.2;
        this.width = Math.random() * 3 + 1;
      }
  
      update() {
        this.y -= this.speed;
        this.alpha -= 0.003;
        if (this.y < -this.length || this.alpha <= 0) {
          this.reset();
        }
      }
  
      draw() {
        ctx.save();
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = this.width;
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.shadowColor = '#ff3300';
        ctx.shadowBlur = 10;
  
        ctx.beginPath();
        for (let i = 0; i < this.length; i += 5) {
          const currY = this.y + i;
          const currX = this.x + Math.sin(currY * this.frequency + time * 2) * this.amplitude;
          if (i === 0) ctx.moveTo(currX, currY);
          else ctx.lineTo(currX, currY);
        }
        ctx.stroke();
        ctx.restore();
      }
    }
  
    const heatWaves = Array.from({ length: 15 }, () => new HeatWave());
  
    class WaveExplosion {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = Math.random() * 60 + 110;
        this.alpha = 1;
        this.bladeAngles = [0, 45, 90, 135, 180, 225, 270, 315].map(
          (a) => (a * Math.PI) / 180 + (Math.random() - 0.5) * 0.2
        );
      }
  
      update() {
        this.radius += (this.maxRadius - this.radius) * 0.18;
        this.alpha -= 0.03;
      }
  
      draw() {
        if (this.alpha <= 0) return;
  
        ctx.save();
        ctx.translate(this.x, this.y);
  
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 1.3);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.3, 'rgba(255, 80, 0, 0.6)');
        grad.addColorStop(0.7, 'rgba(150, 0, 40, 0.3)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
  
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.stroke();
  
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
  
        ctx.strokeStyle = '#ffffff';
        this.bladeAngles.forEach((angle) => {
          const inner = this.radius * 0.2;
          const outer = this.radius * 1.6;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
          ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
          ctx.stroke();
        });
  
        ctx.restore();
      }
    }
  
    window.addEventListener('pointerdown', (e) => {
      explosions.push(new WaveExplosion(e.clientX, e.clientY));
    });
  
    function drawFlameWave(baseHeight, amplitude, frequency, speed, color, shadowColor, shadowOffsetY = 0) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 20;
  
      ctx.beginPath();
      ctx.moveTo(0, height);
  
      for (let x = 0; x <= width; x += 10) {
        const w1 = Math.sin(x * frequency + time * speed);
        const w2 = Math.sin(x * frequency * 2.5 - time * speed * 1.3) * 0.5;
        const w3 = Math.cos(x * 0.005 + time * 0.8) * 0.3;
        
        const y = height - baseHeight + shadowOffsetY + (w1 + w2 + w3) * amplitude;
        ctx.lineTo(x, y);
      }
  
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  
    function animate() {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);
  
      heatWaves.forEach((hw) => {
        hw.update();
        hw.draw();
      });
  
      drawFlameWave(120, 45, 0.006, 1.2, '#1a0008', '#000000', -15);
  
      drawFlameWave(100, 40, 0.008, 1.5, '#66001d', '#33000d');
  
      drawFlameWave(80, 35, 0.01, 1.8, '#ff3300', '#ff0000');
  
      drawFlameWave(55, 25, 0.014, 2.2, '#ffaa00', '#ff6600');
  
      drawFlameWave(30, 15, 0.02, 2.8, '#ffffff', '#ffcc00');
  
      for (let i = explosions.length - 1; i >= 0; i--) {
        const exp = explosions[i];
        exp.update();
        exp.draw();
        if (exp.alpha <= 0) {
          explosions.splice(i, 1);
        }
      }
  
      requestAnimationFrame(animate);
    }
  
    animate();
  })();