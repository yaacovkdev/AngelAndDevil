function mousePressed(){
    if(!mouseBound(mouseX, mouseY)) return;

    var gridpos = toPos(mouseX, mouseY);

    if(!moveCondition(gridpos.x, gridpos.y)) return;
    
    //change it's location
    modifyGlobal(gridpos.x, gridpos.y);
    Angel.x = gridpos.x;
    Angel.y = gridpos.y;
    fillRandomGrid();
    
    redraw();
}

function mouseBound(x,y){
    if(x < 0 || y < 0 || x > CANVSIZEX || y > CANVSIZEY){
        return false;
    }
    return true;
}

function moveCondition(x,y){
    if(x == Angel.x && y == Angel.y) return false;
    if(Math.abs(x-Angel.x) > 1 || Math.abs(y-Angel.y) > 1) return false;
    if(includeSub(Filled, [x,y])) return false;
    return true;
}

/*TODO: Offset needs to be changed for random filler, which will become devil becasue it.
Needs to have an actual AI for tracking and blocking the Angel
*/
function fillRandomGrid(){
    var x = int(Math.random() * gridinfo.grids);
    var y = int(Math.random() * gridinfo.grids);

    //x += Offset.x;
    //y += Offset.y;
    if(includeSub(Filled, [x,y]) || (x == Angel.x && y == Angel.y)){
        for(var i = 0; i < gridinfo.grids; i++){
            for (var j = 0; j < gridinfo.grids; j++){
                if(i == Angel.x && j == Angel.y) continue;
                if(!includeSub(Filled, [i,j])){
                    console.log('just pushed', i, j);
                    Filled.push([i,j]);
                    console.log('Angelpos:', Angel.x, Angel.y);
                    console.log('we are at i,j');
                    return;
                }
            }
        }
    } else {
        console.log('just pushed', x, y);
        console.log('Angelpos:', Angel.x, Angel.y);
        console.log('we are at x,y');
        Filled.push([x,y]);
    }
}