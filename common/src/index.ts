import z from "zod";

//This below 4 are the one that my backend needs for validation 
export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
    name : z.string().regex(/^[a-zA-Z0-9_]+$/)
})

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g),
})

export const createBlogInput = z.object({
    title :z.string(),
    content : z.string()
})

export const updateBlogInput = z.object({
    title :z.string(),
    content : z.string()
})


//Below this is need by frontEnd Code for validation check of the type 
export type SignUpInput = z.infer<typeof signupInput>
export type SignInInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer< typeof createBlogInput>
export type UpdateBlogInput = z.infer< typeof updateBlogInput>
