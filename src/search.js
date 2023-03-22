
let surround = [[-1,-1] ,[0, -1],[1,-1],
                [-1,0]       ,[1,0],
                [-1,1],[0,1],[1,1]];

let surround_adjacent_index = [0,1,2,4,7,6,5,3];

function randomAngelMove(){
    var i = int(Math.random() * 8);
    
    var direction = angelFindCirc(surround[i], i);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    
    Angel.x += direction[0];
    Angel.y += direction[1];
}

function orderedSearchMove(){
    var i = 1;
    
    var direction = angelFindCirc(surround[i], i);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    
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

//Wacky search
function angelDepthFirst(){
    var testgoal = [int(gridinfo.grids/2), 0];

    if(arrayEqual(angelFindCirc(surround[0],0),[0,0])){
        lostcondition = true;
        return;
    }

    //grid matrix of unvisited cells
    var Visited = Array(gridinfo.grids).fill(Array(gridinfo.grids).fill(false));
    var stackMemo = [[Angel.x, Angel.y]];
    
    for(var i in Visited){
        for(var j in Visited[i]){
            print(Visited[i][j]);
        }
    }

    //the first direction
    var bestdirection = [0,0];

    //you only need to get the direction from this code

    while(stackMemo.length != 0 ){
        //var u = stackMemo[stackMemo.length-1];
        var u = stackMemo.pop();
        if(!Visited[u[0]][u[1]]){
            Visited[u[0]][u[1]] = true;

            if(arrayEqual(u, testgoal)){
                console.log('path found');
                breakloop = true;
                break;
            }

            
            
            //all 8 directions but they don't reset
            for(var i = 0; i < 8; i++){
                var potentialmove = [u[0] + surround[i][0], u[1] + surround[i][1]];
                
                
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
        print(stackMemo.length);
    }
    for(var i in Visited){
        for(var j in Visited[i]){
            print(Visited[i][j]);
        }
    }

    //this will run when the stack gets popped to 0
    if(arrayEqual(bestdirection,[0,0])){
        //lostcondition = true;
        //return;
        console.log('location blocked');
    }

    Angel.x += bestdirection[0];
    Angel.y += bestdirection[1];
    print('bestdirection', bestdirection);
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