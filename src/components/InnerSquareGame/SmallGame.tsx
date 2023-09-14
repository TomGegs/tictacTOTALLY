import { useEffect, useState } from 'react';
import SmallCell from './SmallCell';

type smallGameScore = {
    [key: string]: number;
};

const INITIAL_GAME_STATE = ['', '', '', '', '', '', '', '', ''];
const INITIAL_SMALL_SCORE_STATE: smallGameScore = { X: 0, O: 0 };
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

function SmallGame() {
    const [smallGameState, setSmallGameState] = useState(INITIAL_GAME_STATE);
    const [currentPlayer, setCurrentPlayer] = useState('O');
    const [smallGameWin, setSmallGameWin] = useState('');
    const [smallGameScore, setSmallGameScore] = useState(
        INITIAL_SMALL_SCORE_STATE
    );

    useEffect(() => {
        if (smallGameState === INITIAL_GAME_STATE) {
            return;
        }
        checkForSmallGameWinner();
    }, [smallGameState]);

    //set and save score in local browser storage

    const handleSmallGameWin = () => {
        setSmallGameWin(currentPlayer);
    };

    const handleSmallGameDraw = () => {};

    const checkForSmallGameWinner = () => {
        let cellWon = false;

        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const winner = WINNING_COMBINATIONS[i];

            //winning combination
            const a = smallGameState[winner[0]];
            const b = smallGameState[winner[1]];
            const c = smallGameState[winner[2]];

            //check if empty string / no winner
            if ([a, b, c].includes('')) {
                continue;
            }
            //check all 3 winning states
            if (a === b && b === c) {
                cellWon = true;
                break;
            }
        }
        //alert if round won
        if (cellWon) {
            setTimeout(() => {
                handleSmallGameWin();
            }, 500);
            return;
        }
        //alert if draw
        if (!smallGameState.includes('')) {
            setTimeout(() => {
                handleSmallGameDraw();
            }, 500);
            return;
        }
        //change player
        changePlayer();
    };

    const changePlayer = () => {
        setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
    };

    const handleSmallCellClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const smallCellIndex = Number(
            event.currentTarget.getAttribute('small-data-cell-index')
        );

        const currentValue = smallGameState[smallCellIndex];
        if (currentValue) return;

        const newValue = [...smallGameState];
        newValue[smallCellIndex] = currentPlayer;
        setSmallGameState(newValue);
    };

    return (
        <div
            className={`mx-auto grid h-full w-full grid-cols-3 gap-2 border-[20px] border-[#212121] bg-cyan-600`}
        >
            {smallGameState.map((playerMove, index) => (
                <SmallCell
                    data-cell-index={index}
                    onClick={handleSmallCellClick}
                    key={index}
                    {...{ index, playerMove }}
                />
            ))}
        </div>
    );
}

export default SmallGame;
