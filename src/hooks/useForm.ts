import { useState } from "react";
import { z } from "zod";

export function useForm<T>(initialValues: T, schema: z.Schema<T>) {
    const [formData, setFormData] = useState<T>(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<z.ZodError | null>(null);

    const handleChange = (field: keyof T, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (callback: (data: T) => Promise<void>) => {
        try {
            setLoading(true);
            setError(null);

            const parsedData = schema.parse(formData);
            await callback(parsedData);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err);
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return { formData, loading, error, handleChange, handleSubmit };
}
