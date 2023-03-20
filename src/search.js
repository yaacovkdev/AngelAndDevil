
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
    var testgoal = [Angel.x,0];
    var direction = [0,0];

    

    direction = angelFindClosest(direction, testgoal);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    Angel.x += direction[0];
    Angel.y += direction[1];
}

//still broken
function angelDepthFirst(){
    var testgoal = [Angel.x,0];
    var start = [Angel.x, Angel.y];
    if(arrayEqual(angelFindCirc(surround[0],0),[0,0])){
        lostcondition = true;
        return;
    }
    var searchStack = [start];

    var Visited = Array(gridinfo.grids).fill(Array(gridinfo.grids).fill(false));
    

    var breakloop = false;
    while(searchStack.length != 0 && !breakloop){
        var last = searchStack.pop();
        if(!Visited[last[0]][last[1]]){
            Visited[last[0]][last[1]] = true;
            for(var i in surround){
                var potentialmove = [last[0] + surround[i][0], last[1] + surround[i][1]];

                //if we reach our goal then break the loop and start moving!
                
                
                
                if(inField(potentialmove[0], potentialmove[1]) && isClear(potentialmove[0], potentialmove[1]) && !Visited[potentialmove[0]][potentialmove[1]]){
                    if(arrayEqual(potentialmove, testgoal)){
                        searchStack.push(potentialmove);
                        breakloop = true;
                        break;
                    }
                    searchStack.push(potentialmove);
                    
                }
                
            }
        }   
    }
    if(searchStack.length == 0){
        orderedSearchMove();
        return;
    }
    print(searchStack);
    Angel.x += searchStack[0][0];
    Angel.y += searchStack[0][1];
}


//searches for avalible paths in a circular order
function angelFindCirc(direction, i){
    
    var count = 0;
    while(!inField(Angel.x + direction[0], Angel.y + direction[1]) || 
    !isClear(Angel.x + direction[0], Angel.y + direction[1])){
        i++;
        if(i == 8) i = 0;
        if(count == 8){
            return [0,0];
        }
        direction = surround[i];
        count++;
        print('debug', direction);
    }
    print('end debug, count:', count, Filled);
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
            if(isClear(Angel.x + x, Angel.y + y) && inField(Angel.x + x, Angel.y + y)){
                return [x,y];
            }
        }
    }
    return [0,0];
}