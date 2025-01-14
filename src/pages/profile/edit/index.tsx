import React from 'react';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { updateUser } from '@/store/slices/user.slice';
import { Roles } from '@/types/User';
import { translateRole } from "@/utils/TranslateRole";
import Loading from '@/components/Loading/Loading';
import { UserRoundCheck, Ban } from 'lucide-react';
import { useForm } from "@/hooks/useForm";
import { updateProfileSchema } from "@/libs/zod";
import {renderError} from "@/utils/renderError";

const ProfileEdit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: user, loading: globalLoading, error: globalError } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    const isAdmin = [Roles.ADMIN, Roles.SUPERADMIN].includes(user?.role as Roles);

    const { formData, loading, error, handleChange, handleSubmit } = useForm(
        {
            username: user?.username || '',
            phone: user?.phone || '',
            role: user?.role || Roles.USER
        },
        updateProfileSchema(user?.role as Roles)
    );

    const roleOptions = Object.entries(Roles).map(([key, value]) => ({
        label: translateRole(key),
        value: value
    }));

    const onSubmit = async (data: typeof formData) => {
        const updatePayload = !isAdmin ? { ...data, role: undefined } : data;
        await dispatch(updateUser(updatePayload)).unwrap();
        await router.push('/profile');
    };

    return (
        <div className={styles.container}>
            {globalLoading && <Loading />}

            <form
                className={styles.form}
                onSubmit={(e) => {e.preventDefault()}}
            >
                {(globalError) && (
                    <div className={styles.error}>
                        {globalError}
                    </div>
                )}
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className={styles.input}
                        value={formData.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                    />
                    {renderError(error, "username")}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        className={styles.input}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                    {renderError(error, "phone")}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="role" className={styles.label}>
                        Role {!isAdmin && "(View only)"}
                    </label>
                    <select
                        id="role"
                        name="role"
                        className={styles.input}
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        disabled={!isAdmin}
                    >
                        {roleOptions.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {renderError(error, "role")}
                </div>
                <div className={styles.buttonGroup}>
                    {loading || globalLoading ? (
                        <button className={styles.button} disabled>
                            Saving...
                        </button>
                    ) : (
                        <button className={styles.button} onClick={() => handleSubmit(onSubmit)}>
                            <p>Save</p>
                            <UserRoundCheck />
                        </button>
                    )}

                    <button
                        type="button"
                        className={`${styles.button} ${styles.cancelButton}`}
                        onClick={() => router.push('/profile')}
                        disabled={loading || globalLoading}
                    >
                        <p>Cancel</p>
                        <Ban />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
