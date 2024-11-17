import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { createBlogInput, updateBlogInput } from '@lakshya_25/bloghub-validator'

export const blog = new Hono<{
	Bindings: {
        DATABASE_URL : string;
        JWT_SECRET : string;
	},
    Variables: {
        userId : string;
        prisma : PrismaClient
    }
}>().basePath('/api/v1/blog')

blog.use('*' , async(c , next) => {
    const header = c.req.header("Authorization") || ""
    //token = [Bearer , token]
    // const token = header.split(" ")[1]

    try {
        const user = await verify( header , c.env.JWT_SECRET)
        if(user){
            console.log(user);
            c.set("userId" , user.id as string)
            await next();
        }else{
            return c.json({error : "Unauthorized"} , 403)
        }
    } catch (error) {
        console.log(error)
    }
})

blog.post('/' , async (c)=> {
    const userId = c.get("userId");

    const prisma = c.get("prisma");
    
    const body = await c.req.json(); 

    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        c.json({message : "Incorrect blog inputs"})
    }
    try {
        const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : userId
            }
        })
        return c.json({id : blog.id})
    } catch (error) {
        console.log(error);
        return c.json({error : "Error while creating a blog" , status : 403})
    }
} )

blog.put('/' , async (c)=> {
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        c.json({message : "Incorrect blog inputs while updating"})
    }
    try {
        const updatedBlog = await prisma.post.update({
            where : {
                id : body.id,
            },
            data: {
                title : body.title,
                content : body.content
            }
        })
        // return c.json({Blog : "Blog Updated"})
        return c.json({ id : updatedBlog.id })
    } catch (error) {
        console.log(error)
        return c.json({error : "Error while updating a blog"}) 
    }
} )

blog.get('/bulk' , async (c)=> {
    const prisma = c.get("prisma")

    const blogs = await prisma.post.findMany({
        select: {
            id: true,
            title : true,
            content : true,
            author : {
                select : {
                    name : true
                }
            },
        }
    })
    return c.json({
        blogs}
    );
} )

blog.get('/:id' , async (c)=> {
    const id = c.req.param('id');
    const prisma = c.get("prisma")
    try {        
        const blog = await prisma.post.findUnique({
            where : {
                id
            },
            select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : {
                        name: true
                    }
                }
            }
        })
        return c.json({blog})
    } catch (error) {
        return c.json({error: "Something went wrong"})
    }
} )


