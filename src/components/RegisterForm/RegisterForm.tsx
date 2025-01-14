"use client";

import styles from "./RegisterForm.module.css";
import { register } from "@/service/auth.service";
import { useRouter } from "next/router";
import { useForm } from "@/hooks/useForm";
import { Register } from "@/types/User";
import { registerSchema } from "@/libs/zod";
import {renderError} from "@/utils/renderError";

export default function RegisterForm() {
    const form: Register = {
        phone: "",
        username: "",
        password: "",
    };

    const { formData, handleChange, handleSubmit, loading, error } = useForm<Register>(form, registerSchema);
    const router = useRouter();

    const registerSend = async (form: Register) => {
        await register(form);
        await router.push("/login");
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h1 className={styles.title}>Register</h1>
            <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                    Phone
                </label>
                <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={styles.input}
                    placeholder="Enter your phone"
                />
                {renderError(error, "phone")}
            </div>
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
                onClick={() => handleSubmit(registerSend)}
                type="submit"
                className={styles.button}
                disabled={loading}
            >
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}
