function calc_x(x){
    //If it's a black key
    if (black.indexOf(x) !== -1){
        //Number of black keys before * width of each key
        x = ((black.indexOf(x) + 1) * 8) + ((white.indexOf(x - 1) + 1) * 10);
    } else {
        //If it's a white key
        //Number of white keys before * width of each key
        x = ((white.indexOf(x) + 1) * 10) + (Math.max(black.indexOf(x - 1), black.indexOf(x - 2)) * 8);
    }
    return x + 100;
}