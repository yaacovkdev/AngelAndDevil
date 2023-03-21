let lostcondition = false;
function mousePressed(){
    if(lostcondition) return;
    if(!mouseBound(mouseX, mouseY)) return;
    
    var gridpos = toPos(mouseX, mouseY);

    if(!isClear(gridpos.x, gridpos.y)) return;
    
    //change it's location
    Filled.push([gridpos.x, gridpos.y]);
    
    angelDepthFirst();
    redraw();
}

function mouseBound(x,y){
    if(x < 0 || y < 0 || x >= CANVSIZEX-2 || y >= CANVSIZEY-2){
        return false;
    }
    return true;
}