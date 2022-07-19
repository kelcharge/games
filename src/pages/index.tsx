import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
    const router = useRouter();
    return (
        <div className={styles.main}>
            <h1>Games made in React</h1>
            <ul>
                <li>
                    <a onClick={() => router.push("/lightsout")}>Lights Out</a>
                </li>
            </ul>
        </div>
    );
}
