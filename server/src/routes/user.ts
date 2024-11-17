import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { signinInput, signupInput } from '@lakshya_25/bloghub-validator'

export const userAuth = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET : string
	},
    Variables: {
        prisma : PrismaClient
    }
}>().basePath('/api/v1/user')

userAuth.post('/signup' , async(c)=> {
    const prisma = c.get("prisma")

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message : "Inputs are incorrect" });
    }
    try {
        const user = await prisma.user.create({
            data : {
                name : body.name,
                email : body.email ,
                password : body.password
            }
        })
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.text("Create a new user")
		return c.json({ jwt });
        
    } catch (error) {
        c.json({error : "Error while signup"})
        c.json({error} , 403)
    }
} )

userAuth.post('/signin' ,async (c)=> {
    const prisma = c.get("prisma")

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        return c.json({message : "Inputs are incorrect" , status : 411} )
    }
    try {
        const user = await prisma.user.findUnique({
            where : {
                email : body.email,
                password : body.password
            }
        })
        if(!user){
            c.render("Please check the credential")
            return c.json({ error : "User not found!"} , 403) 
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        console.log("User is signin")
		return c.json({ jwt });
    } catch (error) {
        c.json({error : "Error while Signing IN"})
        c.json({error} , 403)
    }
} )
