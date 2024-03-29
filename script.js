document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;

    class Dino {
        constructor(x, y, size) {
            this.x = x
            this.y = canvas.height - y
            this.width = size
            this.height = size
            this.size = size
            this.jumping = false
            this.jumpHeight = 150
            this.jumpSpeed = 15
            this.fallSpeed = 15
            this.img = new Image()
            this.img.src = './assets/dino.png'

            this.draw = function () {
                ctx.fillStyle = '#666';
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }

            this.jump = function () {
                if (!this.jumping) {
                this.jumping = true;
                let position = 0;
                const jumpInterval = setInterval(() => {
                    if (position >= this.jumpHeight) {
                    clearInterval(jumpInterval);
                    const fallInterval = setInterval(() => {
                        if (position === 0) {
                        clearInterval(fallInterval);
                        this.jumping = false;
                        position = 0
                        } else {
                            position -= this.fallSpeed;
                            this.y += this.fallSpeed;
                        }
                    }, 20);
                    }
                    position += this.jumpSpeed;
                    this.y -= this.jumpSpeed;
                }, 20);
                }
            }
        }
    }

    class Obstacle {
        constructor(x, y, w, h, speed) {
            this.x = canvas.width + x
            this.initx = this.x
            this.y =  canvas.height - y
            this.width = w
            this.height = h
            this.speed = speed
            this.img = new Image()
            this.img.src = './assets/obstaculo.png';

            this.draw = function () {
                ctx.fillStyle = '#333';
                // ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }

            this.move = function () {
                if (this.x < -this.width) {
                this.x = this.initx;
                } else {
                this.x -= this.speed;
                }
            }
        }
    }

    // Cria o jogador
    const dino = new Dino(50, 50, 50)
    let lose = false

    // Lista de Obstáculos
    let list_obs = []

    function generateRandomObstacles(qtd) {
        let max = Math.floor(Math.random() * qtd) + 1
        let count = 0
        list_obs = []

        while (count++ <= max) {
            let obj = new Obstacle(list_obs.length * 350, 50, 20, 50, 10)
            list_obs.push(obj)
        }
    }
    generateRandomObstacles(5)

    function drawText(text) {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        const textWidth = ctx.measureText(text).width;
        const x = (canvas.width - textWidth) / 2;
        const y = canvas.height / 2;
        ctx.fillText(text, x, y);
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dino.draw();

      for (let obj of list_obs) {
        obj.draw()
      }
    }
  
    function update() {
       for (let obj of list_obs) {
        if (
            dino.x < obj.x + obj.width && 
            dino.x + dino.width > obj.x && 
            dino.y < obj.y + obj.height && 
            dino.y + dino.height > obj.y 
        ) {
            drawText('Gamer Over')
            lose = true
            break
        }

        obj.move()
      }

      if (!lose) {
        draw()
        requestAnimationFrame(update)
      }
    }
  
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        dino.jump();
      }
    });
  
    update();
  });
  