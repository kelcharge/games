import { useEffect, useState } from "react";

import styles from "../styles/LightsOut.module.css";

const LEVELS = [
    [7, 11, 12, 13, 17],
    [10, 12, 14],
    [7, 8, 11, 12, 13, 15, 17, 21],
    [2, 6, 7, 8, 10, 11, 13, 14, 16, 17, 18, 22],
    [0, 1, 2, 5, 6, 10, 11, 20],
    [5, 7, 9, 12, 15, 16, 18, 19, 22],
    [0, 2, 4, 5, 7, 9, 10, 12, 14, 15, 17, 19, 21, 22, 23, 24],
    [3, 4, 6, 8, 10, 14, 15, 17, 19],
    [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24],
    [2, 6, 8, 10, 12, 14, 16, 18, 22],
];

export default function LightsOut() {
    // Setup
    const [highscores, setHighScores] = useState([]);
    const [hasWon, setHasWon] = useState(false);
    const [size, setSize] = useState(25);
    const [lights, setLights] = useState(Array(size).fill(false));
    const [isLoaded, setIsLoaded] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        if (isLoaded) {
            checkWin();
        }
    }, [lights]);

    useEffect(() => {
        getHighScores();
        resetLevel();
    }, [level]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    function checkWin() {
        const anyOn = lights.filter((isOn) => isOn === true);

        if (anyOn.length === 0) {
            setHasWon(true);
        }
    }

    function saveHighScore() {
        // Break this out into own call that takes user data
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "KEL",
                moveCount: moveCount,
                level: level,
            }),
        };
        fetch("/api/add-highscore", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    function toggleLight(i: number) {
        return lights.map((value, index) => {
            if (i === index) {
                return !value;
            } else if (index === i - 1 && hasRemainder(i, 5)) {
                return !value;
            } else if (index === i + 1 && hasRemainder(i + 1, 5)) {
                return !value;
            } else if (index === i - 5) {
                return !value;
            } else if (index === i + 5) {
                return !value;
            } else {
                return value;
            }
        });
    }

    function hasRemainder(value: number, against: number) {
        return value % against !== 0;
    }

    function toggleLights(i: number) {
        if (!hasWon) {
            setLights(toggleLight(i));
            setMoveCount(moveCount + 1);
        }
    }

    function resetLevel() {
        setHasWon(false);
        setMoveCount(0);
        setLights(new Array(size).fill(false));
        setLights(
            lights.map((value, index) => {
                return LEVELS[level].includes(index) ? true : false;
            })
        );
    }

    function levelChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const level = parseInt(event.currentTarget.value);
        setLevel(level);
    }

    async function getHighScores() {
        // Fetch the highscores from our backend
        const highscores = await fetch("/api/get-highscore/" + level)
            .then((response) => response.json())
            .then((data) => data);

        setHighScores(highscores);
    }

    function getLightsOutBoard() {
        return (
            <>
                <div className={styles.board}>
                    <div
                        className={
                            styles.win + " " + (!hasWon ? styles.hide : "")
                        }
                    >
                        <span>You won!</span>
                    </div>
                    <ul className={styles.row}>
                        {lights.map((value, i) => {
                            return (
                                <li
                                    key={i}
                                    className={
                                        (value === true
                                            ? styles.on
                                            : styles.off) +
                                        " " +
                                        styles.square
                                    }
                                    onClick={() => toggleLights(i)}
                                ></li>
                            );
                        })}
                    </ul>
                </div>
                <button className={styles.button} onClick={() => resetLevel()}>
                    Reset Level
                </button>
                <br />
                <span>Number of Moves: {moveCount}</span>
            </>
        );
    }

    return (
        <>
            <div className={styles.main}>
                <h1>Lights Out</h1>
                <h4>
                    The goal is to turn all the lights below off in. Fewer total
                    moves gets a higher score.
                </h4>
                <span>Level Select: </span>
                <select className={styles.select} onChange={levelChange}>
                    {LEVELS.map((level: any, index: number) => {
                        return (
                            <option key={index} value={index}>
                                {index + 1}
                            </option>
                        );
                    })}
                </select>
                {getLightsOutBoard()}
                <br />
                <h2>High Scores {"(" + (level + 1) + ")"}</h2>
                <ul>
                    {highscores.map((score: any) => {
                        return (
                            <li key={score.id}>
                                {score.username} : {score.moveCount}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
