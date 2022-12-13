import styles from './styles/Submit.module.css';

export default function Submit({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}