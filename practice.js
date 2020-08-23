canvas=document.getElementById("mycanvas");
function f()
{
    console.log("You clicked on the canvas")
    
}
canvas.addEventListener('click',f);

function f2()
{
    console.log("Your key got pressed");   
}

document.addEventListener('keydown', f)