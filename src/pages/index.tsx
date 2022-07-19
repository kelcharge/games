import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import LightsOut from "./lightsout";

export default function Home() {
    const [highscores, setHighScores] = useState([]);

    async function getHighScores() {
        // Fetch the highscores from our backend
        const highscores = await fetch("/api/get-highscore")
            .then((response) => response.json())
            .then((data) => data);

        setHighScores(highscores);
    }

    useEffect(() => {
        getHighScores();
    }, []);

    return (
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
            <LightsOut />
        </div>
    );
}
