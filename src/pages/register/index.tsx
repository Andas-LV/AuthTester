import RegisterForm from "@/components/RegisterForm/RegisterForm";
import styles from "./page.module.css";

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <RegisterForm />
        </div>
    );
}
