import { z } from "zod";

export const roles = {
    user: "User",
    admin: "Admin",
    petugas: "Petugas"
}

type Role = keyof typeof roles

export const formUserSchema = z.object({
    username: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(Object.keys(roles) as [Role, ...Role[]]).default("user")
});

export type FormUserSchema = typeof formUserSchema;