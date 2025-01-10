import styles from "./page.module.css";
import Link from "next/link";
import { UserPlus, LogIn, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {AppDispatch, RootState} from "@/store/store";
import React, {useEffect} from "react";
import {fetchUser} from "@/store/slices/user.slice";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { data: user, loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    if (error) {
        return (
            <div className={styles.error}>
                <div>Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {loading && <Loading />}

            <nav className={styles.nav}>
                <div className={styles.logo}>
                    Auth Tester
                </div>
                <ul className={styles.navLinks}>
                    <li>
                        <Link href="/profile" className={styles.link}>
                            {user?.avatarUrl ?
                                <div className={styles.avatarWrapper}>
                                    <Image
                                        src={user?.avatarUrl || '/user.png'}
                                        className={styles.avatar}
                                        fill
                                        sizes="30px"
                                        alt="User Avatar"
                                        priority
                                    />
                                </div>
                                :
                                <User size={20}/>
                            }
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className={styles.link}>
                            <UserPlus size={20}/>
                            <span>Register</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className={styles.link}>
                            <LogIn size={20}/>
                            <span>Login</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Auth Tester</h1>
                <p className={styles.subtitle}>Your journey begins here</p>
            </main>
        </div>
    );
}