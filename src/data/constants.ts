
export default {

    type Score = {
        [key: string]: number;
    };
    
    const INITIAL_GAME_STATE = ['', '', '', '', '', '', '', '', ''];
    const INITIAL_SCORE_STATE: Score = { X: 0, O: 0 };
    const WINNING_COMBINATIONS = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // center column
        [2, 5, 8], // right column
        [0, 4, 8], // left to right diagonal
        [2, 4, 6], // right to left diagonal
    ];
    
}