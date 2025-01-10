"use client";

import { useState } from "react";
import styles from "./RegisterForm.module.css";
import { register } from "@/service/auth.service";

export default function RegisterForm() {
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const registerSend = async () => {
        const registerForm = { phone, username, password };
        await register(registerForm);
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h1 className={styles.title}>Register</h1>
            <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>Phone</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your phone"
                />
            </div>
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
                onClick={registerSend}
            >
                Submit
            </button>
        </form>
    );
}
