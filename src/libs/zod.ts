import { z } from "zod";
import {Roles} from "@/types/User";

export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(3, "Password is required, at least 3 characters long"),
});

export const registerSchema = z.object({
    phone: z.string().min(1, "Phone number is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(3, "Password is required, at least 3 characters long"),
});

export const updateProfileSchema = (currentUserRole: Roles) => z.object({
    username: z.string().min(1, "Username is required"),
    phone: z.string().min(11, "phone is required"),
    role: z.enum([Roles.USER, Roles.ADMIN, Roles.SUPERADMIN])
        .refine(
            (role) => {
                if (![Roles.ADMIN, Roles.SUPERADMIN].includes(currentUserRole)) {
                    return role === currentUserRole;
                }
                return true;
            },
            {
                message: "You don't have permission to change roles. Only administrators can modify roles."
            }
        )
});