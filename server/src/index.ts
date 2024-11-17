import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userAuth } from './routes/user'
import { blog } from './routes/blog'
import { cors } from 'hono/cors'

// const auth = new Hono<{
// 	Bindings: {
// 		DATABASE_URL: string,
//         JWT_SECRET : string
// 	}
// }>().basePath('/api/v1/user')

// auth.post('/signup' , async(c)=> {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const body = await c.req.json();
//     try {
//         const user = await prisma.user.create({
//             data : {
//                 name : body.name,
//                 email : body.email ,
//                 password : body.password
//             }
//         })
//         const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
//         c.text("Create a new user")
// 		return c.json({ jwt });
//     } catch (error) {
//         // c.status(403)
//         c.json({error : "Error while signup"})
//         c.json({error} , 403)
//     }
//     // return c.text("Sign Up page")
// } )

// auth.post('/signin' ,async (c)=> {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const body = await c.req.json();
//     try {
//         const user = await prisma.user.findUnique({
//             where : {
//                 email : body.email,
//                 password : body.password
//             }
//         })
//         if(!user){
//             c.render("Please check the credential")
//             return c.json({ error : "User not found!"} , 403) 
//         }

//         const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
// 		return c.json({ jwt });

//     } catch (error) {
//         c.json({error : "Error while Signing IN"})
//         c.json({error} , 403)
//     }
//     // return c.text("Sign In page")
// } )

//---------------------------------------------------------------------------------------------

// const blog = new Hono<{
// 	Bindings: {
//         JWT_SECRET : string
// 	}
// }>().basePath('/api/v1/blog')

// blog.use('/api/v1/blog/*' , async(c , next) => {
//     //get a header 
//     const header = c.req.header("authorization") || ""
//     //token = [Bearer , token]
//     const token = header.split(" ")[1]
//     //verify the header
//     //if it is correct , we need to proceed to that particular route
//     //else we return a user 403 status code
//     const response = await verify( token , c.env.JWT_SECRET)
//     if(response.id){
//         c.set('userId' as any , response.id)
//         await next();
//     }else{
//         return c.json({error : "Unauthorized"} , 403)
//     }
// })

// blog.post('/' , (c)=> {
//     console.log(c.get('userId' as any))
//     return c.text("blog post page")
// } )
// blog.put('/' , (c)=> {
//   return c.text("Blog put page")
// } )
// blog.get('/:id' , (c)=> {
//   return c.text("Specific Blog page")
// } )
// blog.get('/bulk' , (c)=> {
//   return c.text("All blog page")
// } )


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET : string
	}
    Variables: {
        prisma : PrismaClient
    }
}>()

app.use("/*" , cors());

app.use("*" , async (c,next)=> {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url : c.env.DATABASE_URL,
            },
        },  
    }).$extends(withAccelerate())

    c.set("prisma" , prisma)
    await next();
})

app.route('/' , userAuth)
app.route('/' , blog)

export default app
