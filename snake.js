function init() {
  canvas = document.getElementById('mycanvas');
  W = canvas.width = 1500;
  H = canvas.height = 580;
  pen = canvas.getContext('2d');
  cs = 66;
  game_over = false;
  score = 0;
  var fail = document.getElementById('failmusic');
  var point = document.getElementById('point');
  var tenpts = document.getElementById('ten');
  //fail = new sound('assets/fail.mp3');

  food_img = new Image();
  food_img.src = 'assets/apple.png';

  food = getRandomFood();

  snake = {
    init_len: 5,
    colour: 'blue',
    cells: [],
    direction: 'right',
    createSnake: function () {
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.colour;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 3,
          cs - 3
        );
      }
    },
    updateSnake: function () {
      console.log('Updating snake according to direction property');

      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        console.log('Food eaten !');
        food = getRandomFood();
        score++;
        if (score % 10 == 0) {
          tenpts.play();
        } else {
          point.play();
        }
      } else {
        this.cells.pop();
      }
      //this.cells.pop();
      var nextX, nextY;
      if (this.direction == 'right') {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == 'left') {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == 'down') {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }
      this.cells.unshift({ x: nextX, y: nextY });

      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);

      if (
        this.cells[0].y + 1 < 0 ||
        this.cells[0].x + 1 < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        game_over = true;

        fail.play();
      }
    },
  };
  snake.createSnake();
  function keyPressed(e) {
    console.log('Key pressed', e.key);
    if (e.key == 'ArrowRight' && snake.direction != 'left') {
      snake.direction = 'right';
    } else if (e.key == 'ArrowLeft' && snake.direction != 'right') {
      snake.direction = 'left';
    } else if (e.key == 'ArrowDown' && snake.direction != 'up') {
      snake.direction = 'down';
    } else if (e.key == 'ArrowUp' && snake.direction != 'down') {
      snake.direction = 'up';
    }
    console.log(snake.direction);
  }
  document.addEventListener('keydown', keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
  pen.fillStyle = food.colour;
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
  pen.fillStyle = 'black';

  pen.font = '50px Verdana';
  pen.fillText('Score : ' + score, 20, 60);
}

function update() {
  //console.log("In Update");
  snake.updateSnake();
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - 50 - cs)) / cs);
  var foodY = Math.round((Math.random() * (H - 50 - cs)) / cs);

  var food = {
    x: foodX,
    y: foodY,
    colour: 'red',
  };
  return food;
}

function gameloop() {
  draw();
  update();
  if (game_over == true) {
    clearInterval(f);
    alert('Game Over ! Your score is : ' + score);
    if (window.confirm('Want to play again ?')) {
      location.reload();
    }
  }
}

init();
var f = setInterval(gameloop, 100);
