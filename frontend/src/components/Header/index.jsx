import logoImg from "../../assets/logo.png"
import styles from "./styles.module.css"

export default function Header() {
    return (
        <div className={styles.container}>
            <img src={logoImg} alt="Logo azul da Globo" className={styles.logoImg} />
            <h2 className={styles.headerText}>CRUD FastAPI - Desenvolvimento Técnico</h2>
        </div>
    )
}