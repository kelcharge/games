import { useEffect, useState } from "react";

import styles from "../styles/LightsOut.module.css";

const LEVELS = [[10, 12, 14]];

export default function LightsOut() {
    // Setup
    const [highscores, setHighScores] = useState([]);
    const [hasWon, setHasWon] = useState(false);
    const [size, setSize] = useState(25);
    const [lights, setLights] = useState(Array(size).fill(false));
    const [isLoaded, setIsLoaded] = useState(false);
    const [moveCount, setMoveCount] = useState(0);

    useEffect(() => {
        getHighScores();
        resetLevel(0);
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const anyOn = lights.filter((isOn) => isOn === true);

            if (anyOn.length === 0) {
                setHasWon(true);

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: "KEL",
                        moveCount: moveCount,
                    }),
                };
                fetch("/api/add-highscore", requestOptions)
                    .then((response) => response.json())
                    .then((data) => console.log(data));
            }
        }
    }, [lights]);

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
        setLights(toggleLight(i));
        setMoveCount(moveCount + 1);
    }

    function resetLevel(level: number) {
        setHasWon(false);
        setMoveCount(0);
        setLights(
            lights.map((value, index) => {
                return LEVELS[level].includes(index) ? !value : value;
            })
        );
    }

    async function getHighScores() {
        // Fetch the highscores from our backend
        const highscores = await fetch("/api/get-highscore")
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
                <button className={styles.button} onClick={() => resetLevel(0)}>
                    Reset Level
                </button>
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
                <ul>
                    {highscores.map((score: any) => {
                        return (
                            <li key={score.id}>
                                {score.username} : {score.moveCount}
                            </li>
                        );
                    })}
                </ul>
                {getLightsOutBoard()}
            </div>
        </>
    );
}
