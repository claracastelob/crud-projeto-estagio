import styles from "./styles.module.css"

export default function Button(props) {
    return (
    <button 
        className={`${styles.Btn} ${styles[props.color]}`}
        onClick={props.onClick}
    >
        {props.text}
    </button>
    )
}