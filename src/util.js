function includeSub(Arr, valuearr){
    for(var i in Arr){
        checker = true;
        for(var j in valuearr){
            if(Arr[i][j] != valuearr[j]) {
                checker = false;
                break;
            }
            
        }
        if(checker) return true;
    }
    return false;
}