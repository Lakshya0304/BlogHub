import axios from "axios";
import { URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { AppBar } from "../components/Appbar";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    return <div>
        <AppBar />
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setContent(e.target.value)
                }} />
                <button 
                    onClick={async () => {
                        const response = await axios.post(`${URL}/api/v1/blog`, {
                            title,
                            content,
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/blog/${response.data.id}`)
                    }} 
                    type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                    Publish Blog
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 bg-gray-50 ">
            <div className="flex items-center justify-between border rounded-lg">
            <div className="my-2  rounded-b-lg w-full">
                <textarea onChange={onChange} rows={8} className="bg-gray-50 focus:outline-none block w-full px-0 text-sm text-gray-800 border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}