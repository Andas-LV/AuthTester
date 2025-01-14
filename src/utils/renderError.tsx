import styles from "@/components/LoginForm/LoginForm.module.css";

const renderError = (field: string) => {
    const issue = error?.issues.find((issue) => issue.path[0] === field);
    return issue ? <p className={styles.error}>{issue.message}</p> : null;
};