const surround = [[-1,-1] ,[0, -1],[1,-1],
                [-1,0]       ,[1,0],
                [-1,1],[0,1],[1,1]];

//find the next winning move for Angel
function obviousMove() {
    for (let i = 0; i < surround.length; i++) {
        if((Angel.x + surround[i][0] == 0 || Angel.x + surround[i][0] == gridinfo.grids-1 ||
            Angel.y + surround[i][1] == 0 || Angel.y + surround[i][1] == gridinfo.grids-1 ) && (isClear(Angel.x +surround[i][0], Angel.y + surround[i][1]))){
            Angel.x += surround[i][0];
            Angel.y += surround[i][1];
            return true;
        }
    }
    return false;
}

function randomAngelMove(){
    var i = int(Math.random() * 8);
    var direction = angelFindCirc(surround[i], i);
    
    Angel.x += direction[0];
    Angel.y += direction[1];
}

function orderedSearchMove(){
    var i = 1;
    var direction = angelFindCirc(surround[i], i);
    
    Angel.x += direction[0];
    Angel.y += direction[1];
}

function basicSearchMove(){
    var testgoal = [int(gridinfo.grids/2),0];
    var direction = [0,0];

    direction = angelFindClosest(direction, testgoal);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    Angel.x += direction[0];
    Angel.y += direction[1];
}

function angelDepthFirst(){

    //grid matrix of unvisited cells
    const Visited = [];
    for (var i = 0; i < gridinfo.grids; i++){
        var sub = [];
        for(var j = 0; j < gridinfo.grids; j++){
            sub.push(false);
        }
        Visited.push(sub);
    }

    const stackMemo = [[Angel.x, Angel.y]];

    //the first direction
    var bestdirection = [0,0];

    var loopbreak = false;
    //you only need to get the direction from this code
    while(stackMemo.length != 0 && !loopbreak){
        //var u = stackMemo[stackMemo.length-1];
        var u = stackMemo.pop();
        
        if(!Visited[u[0]][u[1]]){
            Visited[u[0]][u[1]] = true;
           
            //perimeter escape
            for(var i = 0; i < gridinfo.grids-1; i++){
                if(arrayEqual(u, [i,0]) || arrayEqual(u, [i,gridinfo.grids-1]) 
                || arrayEqual(u, [0,i]) || arrayEqual(u, [gridinfo.grids-1,i])) {
                    loopbreak = true;
                    break;
                }
            }
            
            
            //all 8 directions but they don't reset
            for(var i = 0; i < 8; i++){
                var potentialmove = [u[0] + surround[i][0], u[1] + surround[i][1]];
                //console.log(potentialmove, Angel, Visited[potentialmove[0]][potentialmove[1]]);
                
                //console.log(potentialmove);
                if(isClear(potentialmove[0], potentialmove[1]) && checkRange(potentialmove[0], potentialmove[1]) && !Visited[potentialmove[0]][potentialmove[1]]){
                    var surrindex = isAdjacentCell([Angel.x, Angel.y],potentialmove);
                    
                    if(surrindex != -1){
                        bestdirection[0] = surround[surrindex][0];
                        bestdirection[1] = surround[surrindex][1];
                    }
                    stackMemo.push(potentialmove);
                }

            }
        }
        
    }
    

    //this will run when the stack gets popped to 0
    if(!loopbreak){
        //lostcondition = true;
        //return;
    }

    Angel.x += bestdirection[0];
    Angel.y += bestdirection[1];
}

function angelBreadthFirst(){

    //grid matrix of unvisited cells
    var Visited = [];
    for (var i = 0; i < gridinfo.grids; i++){
        var sub = [];
        for(var j = 0; j < gridinfo.grids; j++){
            sub.push(false);
        }
        Visited.push(sub);
    }

    var stackMemo = [[Angel.x, Angel.y]];
    

    //the first direction
    var bestdirection = [0,0];

    var loopbreak = false;
    //you only need to get the direction from this code
    while(stackMemo.length != 0 && !loopbreak){
        //var u = stackMemo[stackMemo.length-1];
        var u = stackMemo.shift();
        
        if(!Visited[u[0]][u[1]]){
            Visited[u[0]][u[1]] = true;
           
            //perimeter escape
            for(var i = 0; i < gridinfo.grids-1; i++){
                if(arrayEqual(u, [i,0]) || arrayEqual(u, [i,gridinfo.grids-1]) 
                || arrayEqual(u, [0,i]) || arrayEqual(u, [gridinfo.grids-1,i])){
                    loopbreak = true;
                    break;
                }
            }
            
            
            //all 8 directions but they don't reset
            for(var i = 0; i < 8; i++){
                var potentialmove = [u[0] + surround[i][0], u[1] + surround[i][1]];
                //console.log(potentialmove, Angel, Visited[potentialmove[0]][potentialmove[1]]);
                
                //console.log(potentialmove);
                if(isClear(potentialmove[0], potentialmove[1]) && checkRange(potentialmove[0], potentialmove[1]) && !Visited[potentialmove[0]][potentialmove[1]]){
                    var surrindex = isAdjacentCell([Angel.x, Angel.y],potentialmove);
                    
                    if(surrindex != -1){
                        bestdirection[0] = surround[surrindex][0];
                        bestdirection[1] = surround[surrindex][1];
                    }
                    stackMemo.push(potentialmove);
                }

            }
        }
        
    }
    

    //this will run when the stack gets popped to 0
    if(!loopbreak){
        //lostcondition = true;
        //return;

        //this will not likely print now because even if the path is unreachable the algorithm still takes in direciton
        //won't be the case in a successful shortest path DFS
        console.log('location blocked');

    }

    Angel.x += bestdirection[0];
    Angel.y += bestdirection[1];
}

//searches for avalible paths in a circular order
function angelFindCirc(direction, i){
    var count = 0;
    while(!checkRange(Angel.x + direction[0], Angel.y + direction[1]) || 
    !isClear(Angel.x + direction[0], Angel.y + direction[1])){
        i++;
        if(i == 8) i = 0;
        if(count == 8){
            return [0,0];
        }
        direction = surround[i];
        count++;
    
    }
    
    return direction;
}

function angelFindClosest(direction, goal){
    //look
    if(Angel.x < goal[0]) direction[0]++;
    else if(Angel.x > goal[0]) direction[0]--;

    //look
    if(Angel.y < goal[1]) direction[1]++;
    else if(Angel.y > goal[1]) direction[1]--;

    for(var i = 0; i<3; i++){
        for(var j = 0; j < 3; j++){
            var x = (direction[0] + i);
            var y = (direction[1] + j);
            if(x > 1) x -=3;
            if(y > 1) y -= 3;
            if(x == 0 && y == 0) continue;
            if(isClear(Angel.x + x, Angel.y + y) && checkRange(Angel.x + x, Angel.y + y)){
                return [x,y];
            }
        }
    }
    return [0,0];
}

function isAdjacentCell(pos, target){
    for(var i in surround){
        if(arrayEqual([pos[0] + surround[i][0], pos[1] + surround[i][1]], target)){
            return i;
        }
    }
    return -1;
}

function calcCondition(){
    if(arrayEqual(angelFindCirc(surround[0],0),[0,0])){
        lostcondition = true;
        return;
    }

    if(inPerimiter([Angel.x, Angel.y])){
        wincondition = true;
        return;
    }
}