import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2,{message: "Too short"}),
    username: z.string().min(2,"Too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8,"Minimum 8 characters"),
})

export const SigninValidation = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8,"Minimum 8 characters"),
})

export const PostValidation = z.object({
    caption:z.string().min(5).max(2000),
    file:z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags:z.string()
})