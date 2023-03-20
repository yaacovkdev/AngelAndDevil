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

let surround = [[-1,-1] ,[0, -1],[1,-1],
                [-1,0]       ,[1,0],
                [-1,1],[0,1],[1,1]];

let surround_adjacent_index = [0,1,2,4,7,6,5,3];

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