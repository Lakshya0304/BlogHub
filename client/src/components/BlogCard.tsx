import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { MouseEvent, useState } from "react"

interface BlogCardProps {
    id: string,
    authorName : string,
    title : string,
    content : string, 
    publishDate : string
}

export const BlogCard = ({id,authorName,title,content,publishDate} : BlogCardProps) => {
    const [like,setLike] = useState(false);
    const clicked = (e : MouseEvent<SVGSVGElement>) =>{
        e.preventDefault();
        setLike((prev) => !prev)
    }
    return( 
    <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md cursor-pointer relative z-0">
            <div className=" flex">
                <div className=" flex justify-center flex-col">
                    <Avatar name={authorName} size="small"/> 
                </div>
                <div className="font-semibold text-lg text-black pl-2 pr-2">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col text-gray-500 text-xs font-thin">
                    &#128900;  {publishDate}
                </div>
            </div>          
            <div className="text-2xl font-bold pt-2">
                {title}
            </div>

            <div className="text-md font-normal">
                {content.slice(0,50) + "..."}
            </div>
            <div className="text-gray-500 text-sm pt-5 font-thin flex">
                {`${Math.ceil(content.length / 100)} min read`}
                <div className="flex ml-auto">
                    <div className="flex flex-row mr-3">                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill={like? 'red':'none'} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  className={`z-10 w-6 h-6 ml-2 ${like ? "text-red-500" : "text-current"}`} 
                        onClick={clicked} >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        
                    </div>
                </div>
            </div>
        </div>
    </Link>
    )
}

//Over View of BlogCard
// BlogCard ({authorName,title,content,publishDate} : BlogCardProps) => {
//     return (
//         <div>
//             <div>
//                 {authorName} . {publishDate}
//             </div>
//             <div>{title}</div>
//             <div>{content.slice(0,100) + "..."}</div>
//             <div>{`${Math.ceil(content.length /100)} minutes`}</div>
//         </div>
//     )
// }