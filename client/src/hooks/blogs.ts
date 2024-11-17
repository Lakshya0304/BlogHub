import axios from "axios";
import { useEffect, useState } from "react"
import { URL } from "../config"

export interface Blog {
    title : string,
    content : string ,
    id : string,
    author : {
        name : string
    },
    published? : Date
}

export const useBlog = ({id} : {id:string}) =>{
    const [loading , setLoading] = useState(true);
    const [blog , setBlog] = useState<Blog>();

    useEffect( () => {
        axios.get(`${URL}/api/v1/blog/${id}` , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
            .then( res => {
                setBlog(res.data.blog)
                setLoading(false)
            })
    } , [id])

    return{
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading , setLoading] = useState(true);
    const [blogs , setBlogs] = useState <Blog[]> ([]);

    useEffect( () => {
        axios.get(`${URL}/api/v1/blog/bulk` , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
            .then( res => {
                setBlogs(res.data.blogs)
                setLoading(false)
            })
    } , [])

    return{
        loading,
        blogs
    }
}