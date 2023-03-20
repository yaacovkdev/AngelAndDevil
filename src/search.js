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
    var testgoal = [0,0];
    var direction = [0,0];

    //look
    if(Angel.x < testgoal[0]) direction[0]++;
    else if(Angel.x > testgoal[0]) direction[0]--;

    //look
    if(Angel.y < testgoal[1]) direction[1]++;
    else if(Angel.y > testgoal[1]) direction[1]--;

    direction = angelFindCirc(direction,0);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    Angel.x += direction[0];
    Angel.y += direction[1];
}

//searches for avalible paths in a circular order
function angelFindCirc(direction, i){
    var count = 0;
    while((!moveBound(Angel.x + direction[0], Angel.y + direction[1]) || 
    !moveCondition(Angel.x + direction[0], Angel.y + direction[1])) && count != 8){
        count++;
        i++;
        if(i == 8) i = 0;
        direction = surround[i];
    }

    if(count == 8){
        return [0,0];
    }
    return direction;
}