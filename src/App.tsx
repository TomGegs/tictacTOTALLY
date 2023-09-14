import { useEffect, useState } from 'react';
import SmallGame from './components/InnerSquareGame/SmallGame';

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

function App() {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [currentPlayer, setCurrentPlayer] = useState('O');
    const [score, setScore] = useState(INITIAL_SCORE_STATE);

    useEffect(() => {
        if (gameState === INITIAL_GAME_STATE) {
            return;
        }
        checkForWinner();
    }, [gameState]);

    //set and save score in local browser storage
    useEffect(() => {
        const storedScores = localStorage.getItem('score');
        if (storedScores) {
            setScore(JSON.parse(storedScores));
        }
    }, []);

    const resetGame = () => {
        setGameState(INITIAL_GAME_STATE);
    };

    const resetScore = () => {
        setGameState(INITIAL_GAME_STATE);
        setScore(INITIAL_SCORE_STATE);
        localStorage.setItem('score', JSON.stringify(INITIAL_SCORE_STATE));
    };

    const handleWin = () => {
        const newPlayerScore = score[currentPlayer] + 1;
        const newScore = { ...score };
        newScore[currentPlayer] = newPlayerScore;
        setScore(newScore);
        localStorage.setItem('score', JSON.stringify(newScore));
        console.log(score);
        console.log('Win');
        resetGame();
    };

    const handleDraw = () => {
        window.alert(`Draw!`);
        resetGame();
    };

    const checkForWinner = () => {
        let roundWon = false;

        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const winner = WINNING_COMBINATIONS[i];

            //winning combination
            const a = gameState[winner[0]];
            const b = gameState[winner[1]];
            const c = gameState[winner[2]];

            //check if empty string / no winner
            if ([a, b, c].includes('')) {
                continue;
            }
            //check all 3 winning states
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        //alert if round won
        if (roundWon) {
            setTimeout(() => {
                handleWin();
                window.alert(`Player ${currentPlayer} has won!`);
            }, 500);
            return;
        }
        //alert if draw
        if (!gameState.includes('')) {
            setTimeout(() => {
                handleDraw();
            }, 500);
            return;
        }
        //change player
        changePlayer();
    };

    const changePlayer = () => {
        setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
    };

    const handleCellClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const cellIndex = Number(
            event.currentTarget.getAttribute('data-cell-index')
        );

        const currentValue = gameState[cellIndex];
        if (currentValue) return;

        const newValue = [...gameState];
        newValue[cellIndex] = currentPlayer;
        setGameState(newValue);
    };

    return (
        <div className="h-full w-full bg-[#212121] p-8">
            <h1 className="font-display mb-4 text-center text-3xl text-white lg:mb-12 lg:text-5xl">
                Tic-Tac-
                <span className="font-black text-violet-400">Totally</span>
            </h1>

            <div>
                <div className="mx-auto grid h-[80dvh] max-h-[1200px] w-full max-w-[1200px] grid-cols-3 gap-2 bg-white lg:w-full lg:gap-3">
                    {gameState.map((player, index) => (
                        <SmallGame
                            onClick={handleCellClick}
                            key={index}
                            {...{ index, player }}
                        />
                    ))}
                </div>
            </div>
            <div className="mx-auto flex w-full flex-row justify-between text-2xl text-white lg:w-[60%]">
                <div className="mt-[3.2rem] flex h-full w-full flex-col  gap-5">
                    <p>
                        Next Player: <span>{currentPlayer}</span>
                    </p>
                    <p>
                        Player X wins: <span>{score['X']}</span>
                    </p>
                    <p>
                        Player O wins: <span>{score['O']}</span>
                    </p>
                </div>
                <div className="flex w-full flex-row gap-5 font-semibold">
                    <div className="w-full">
                        {INITIAL_GAME_STATE === gameState
                            ? 'Pick who goes first'
                            : null}
                        <button
                            className={`${
                                INITIAL_GAME_STATE != gameState
                                    ? 'mt-[calc(2rem+20px)] h-full w-full rounded-xl bg-blue-900'
                                    : 'mt-[20px] h-full w-full rounded-xl bg-green-900'
                            }`}
                            onClick={
                                INITIAL_GAME_STATE === gameState
                                    ? changePlayer
                                    : resetGame
                            }
                        >
                            {INITIAL_GAME_STATE === gameState
                                ? `Player ${currentPlayer} goes first`
                                : 'Reset Current Match'}
                        </button>
                    </div>
                    <div className="w-full">
                        <button
                            className="mt-[calc(2rem+20px)] h-full w-full rounded-xl bg-orange-400 text-black"
                            onClick={resetScore}
                        >
                            Reset Game & Score
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
