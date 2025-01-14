import styles from "@/components/LoginForm/LoginForm.module.css";
import { z } from "zod";

export const renderError = (error:  z.ZodError | null,field: string) => {
    const issue = error?.issues.find((issue) => issue.path[0] === field);
    return issue ? <p className={styles.error}>{issue.message}</p> : null;
};