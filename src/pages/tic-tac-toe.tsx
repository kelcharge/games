import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

function Square(props: any) {
    return (
        <button className={"square square-" + props.id} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props: any) {
    // Setup
    function renderSquare(i: number) {
        return (
            <Square
                key={i}
                id={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    }

    return (
        <div>
            {props.squares.map((square: any, index: number) => {
                if (index % 3 === 0) {
                    return (
                        <div className='board-row' key={index}>
                            {props.squares.map((square: any, i: number) => {
                                if (i < index + 3 && i > index - 1) {
                                    return renderSquare(i);
                                }
                            })}
                        </div>
                    );
                }
            })}
        </div>
    );
}

function Game() {
    // Setup
    const [history, setHistory] = useState([
        {
            squares: Array(9).fill(null),
            position: {
                x: 0,
                y: 0,
            },
        },
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i: number) {
        const hist = history.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? "X" : "O";
        setHistory(
            hist.concat([
                {
                    squares: squares,
                    position: {
                        x: i % 3,
                        y: i < 3 ? 0 : i > 6 ? 2 : 1,
                    },
                },
            ])
        );

        setStepNumber(hist.length);
        setXIsNext(!xIsNext);
    }

    function jumpTo(step: number) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    function renderUI() {
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (xIsNext ? "X" : "O");
        }

        const moves = history.map((step: any, move: number) => {
            const desc = move
                ? "Go to move number " + move
                : "Go to game start";
            return (
                <li key={move}>
                    <button
                        className={move === stepNumber ? "bold" : ""}
                        onClick={() => jumpTo(move)}
                    >
                        {desc}
                    </button>
                    <span>
                        {" "}
                        ({history[move].position.x}, {history[move].position.y})
                    </span>
                </li>
            );
        });

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i: number) => handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    return <>{renderUI()}</>;
}

function calculateWinner(squares: any) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

export default function TicTacToe() {
    return (
        <>
            <div className={styles.main}>
                <h1>Tic-Tac-Toe</h1>
                <h4>Get three in a row!</h4>
                <Game />
            </div>
        </>
    );
}
