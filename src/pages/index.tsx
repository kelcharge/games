import { useEffect, useState } from "react"


export default function Home() {
  const [highscores, setHighScores] = useState([]);

  async function getHighScores() {
    const highscores = await fetch('/api/get-highscore')
      .then(response => response.json()).then(data => data);
    
      setHighScores(highscores);
  }

  useEffect(() => {
      getHighScores();
  }, []);

  return (
    <>
      <h1>This is some crap</h1>
      <ul>
        {highscores.map((score: any) => {
          return (
            <li key={score.id}>{score.username} : {score.moveCount}</li>
          )
        })}
      </ul>
    </>
  )
}