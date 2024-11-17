import { AppBar } from '../components/Appbar'
import { BlogCard } from '../components/BlogCard'
import { Skeletons } from '../components/Skeletons';
import { useBlogs } from '../hooks/blogs'

export function Blogs() {
    const {loading , blogs}= useBlogs();

    if (loading) {
        return <div>
            <AppBar /> 
            <div  className="flex justify-center">
                <div>
                    <Skeletons />
                    <Skeletons />
                    <Skeletons />
                    <Skeletons />
                    <Skeletons />
                </div>
            </div>
        </div>
    }

    if(loading){
        return <div>
            <Skeletons />
        </div>
    }
    return (
    <div>
        <AppBar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard 
                    id = {blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={ blog.title }
                    content={ blog.content }
                    publishDate= { "2 Feb"}
                />)}
                {/* <BlogCard 
                    authorName={"Lakshya"}
                    title={" How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"}
                    content={"No need to create a fancy and modern website with hundreds  of pages to make money online."}
                    publishDate={"Apr31, 2024"}
                />*/}
            </div>
        </div>
    </div>
    )
}
