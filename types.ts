import { z } from "zod"
export type P<T> = Promise<T>

export interface AdminClass {
    login(email:string, password:string) : P<any>
    getAdminData(id:number) : P<any>
    getAdmins() : P<any>
}

export const AdminSchema = z.object({
    admin_id: z.number().nonnegative(),
    name: z.string().min(1),
    email: z.string().email(),
    birthdate: z.number().nonnegative(),
    type: z.union([z.literal('Owner'), z.literal('Admin')]),
    password: z.string()
})

export type Admin = z.infer<typeof AdminSchema>
export type AdminNoPass = Omit<Admin, 'password'>

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})


export const SignupSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    birthDate: z.string().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    validPassword: z.literal(true)
})