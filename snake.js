
function init()
{
    canvas = document.getElementById("mycanvas");
    W=canvas.width=1500;
    H=canvas.height=720;
    pen= canvas.getContext('2d');
    cs=67;
    
    snake= 
        {
      init_len:5,
        colour:"red",
        cells:[],
        direction:"right",
        speed:50,
        createSnake:function()
        {
            for(var i=this.init_len; i>0;i--)
                {
                    this.cells.push({x:i, y:0});
                }
        },
        drawSnake:function()
        {
            for(var i=0;i<this.cells.length;i++)
            {
           pen.fillStyle = this.colour;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }
        },
        updateSnake:function()
        {
            console.log("Updating snake according to direction property");
            this.cells.pop();
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            var nextX,nextY;
            if(this.direction=="right")
                {
                    nextX=headX+1;
                    nextY = headY;
                }
            else if(this.direction=="left")
                {
                    nextX=headX-1;
                    nextY = headY;
                }
            else if(this.direction=="down")
                {
                    nextX=headX;
                    nextY = headY+1;
                }
            else
                {
                    nextX=headX;
                    nextY=headY-1;
                }
            this.cells.unshift({x:nextX,y:nextY});
        }
    };
    snake.createSnake();
    function keyPressed(e)
    {
        console.log("Key pressed", e.key);
        if(e.key=="ArrowRight" && snake.direction!="left")
            {
                snake.direction="right";
            }
        else if(e.key=="ArrowLeft" && snake.direction!="right")
            {
                snake.direction="left";
            }
        else if(e.key=="ArrowDown" && snake.direction!="up")
            {
                snake.direction="down";
            }
        else if(e.key=="ArrowUp" && snake.direction!="down")
            {
                snake.direction="up";
            }
        console.log(snake.direction);
    }
    document.addEventListener("keydown", keyPressed);
}
    
function draw()
{
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
}

function update()
{
    //console.log("In Update");
    snake.updateSnake();
    
}

function gameloop()
{
   draw();
    update();
}

init();
var f = setInterval(gameloop,150);

