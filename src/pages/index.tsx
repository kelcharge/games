import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
    const router = useRouter();
    return (
        <div className={styles.main}>
            <h1 className={styles.code}>Games made in React</h1>
            <ul className={styles.grid}>
                <li>
                    <a onClick={() => router.push("/lightsout")}>Lights Out</a>
                </li>
                <span> | </span>
                <li>
                    <a onClick={() => router.push("/tic-tac-toe")}>
                        Tic-Tac-Toe
                    </a>
                </li>
            </ul>
        </div>
    );
}
