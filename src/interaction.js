lostcondition = false;
function mousePressed(){
    if(!mouseBound(mouseX, mouseY)) return;
    
    var gridpos = toPos(mouseX, mouseY);

    if(!moveCondition(gridpos.x, gridpos.y)) return;
    
    //change it's location
    Filled.push([gridpos.x, gridpos.y]);
    randomAngelMove();
    redraw();
}

function mouseBound(x,y){
    if(x < 0 || y < 0 || x > CANVSIZEX || y > CANVSIZEY){
        return false;
    }
    return true;
}


function moveBound(x,y){
    if(x < 0 || y < 0 || x >= gridinfo.grids || y >= gridinfo.grids) return false;
    return true;
}

function moveCondition(x,y){
    if(x == Angel.x && y == Angel.y) return false;

    if(includeSub(Filled, [x,y])) return false;
    return true;
}

function randomAngelMove(){
    var i = int(Math.random() * 8);
    var direction = surround[i];

    count = 0;
    while(!moveBound(Angel.x + direction[0], Angel.y + direction[1]) || 
    !moveCondition(Angel.x + direction[0], Angel.y + direction[1])){
        i++;
        count++;
        i %= 8;
        direction = surround[i];
        if(count == 8){
            break;
        }
    }
    if(count == 8){
        lostcondition = true;
        return;
    }
    Angel.x += direction[0];
    Angel.y += direction[1];
}