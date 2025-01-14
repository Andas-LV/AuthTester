import styles from "./LoginForm.module.css";
import { login as loginApi } from "@/service/auth.service";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth.slice";
import { useRouter } from "next/router";
import { useForm } from "@/hooks/useForm";
import {loginSchema} from "@/libs/zod";
import {renderError} from "@/utils/renderError";

export default function LoginForm() {
    const form = { username: "", password: "" };
    const { formData, loading, error, handleChange, handleSubmit } = useForm(form, loginSchema);

    const dispatch = useDispatch();
    const router = useRouter();

    const loginSend = async (formData: typeof form) => {
        const response = await loginApi(formData);
        dispatch(login({ username: formData.username, token: response.token }));
        await router.push("/profile");
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h1 className={styles.title}>Login</h1>
            <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className={styles.input}
                    placeholder="Enter your username"
                />
                {renderError(error, "username")}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={styles.input}
                    placeholder="Enter your password"
                />
                {renderError(error, "password")}
            </div>
            {error && !error.issues && (
                <p className={styles.error}>Error: {error.message}</p>
            )}
            <button
                type="submit"
                className={styles.button}
                onClick={() => handleSubmit(loginSend)}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
