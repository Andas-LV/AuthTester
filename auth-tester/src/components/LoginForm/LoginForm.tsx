"use client";

import { useState } from "react";
import styles from "./LoginForm.module.css";
import { login as loginApi } from "@/service/auth.service";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth.slice";
import { useRouter } from 'next/router'

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const router = useRouter()

    const loginSend = async () => {
        try {
            const response = await loginApi({ username, password });
            dispatch(login({ username, token: response.token }));
            await router.push('/profile');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h1 className={styles.title}>Login</h1>
            <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your username"
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                className={styles.button}
                onClick={loginSend}
            >
                Submit
            </button>
        </form>
    );
}
