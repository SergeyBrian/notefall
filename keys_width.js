const black = [22, 25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87, 90, 92, 94, 97, 99, 102, 104, 106];
const white = [21, 23, 23, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84, 86, 88, 89, 91, 93, 95, 96, 98, 100, 101, 103, 105, 107, 108];

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