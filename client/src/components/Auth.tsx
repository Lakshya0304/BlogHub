import {SignUpInput } from '@lakshya_25/bloghub-validator'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
import { URL } from '../config'

export default function Auth({type} : {type: "signup" | "signin"}) {
    const navigate = useNavigate();
    const [input, setInput ] = useState<SignUpInput>({
        name : "",  
        email : "",
        password : "",
    })

    async function submitData() {
        try {
            const response = await axios.post(`${URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}` , input);
            // const response = await axios.post(`http://127.0.0.1:8787/api/v1/user/${type === "signup" ? "signup" : "signin"}` , input);
            //we get a jwt token from response
            const jwt = response.data.jwt;
            localStorage.setItem("token" , jwt);
            navigate("/blogs");
        } catch (error) {
            throw("Request failed! Please try again")
        }
    }

    return (
        <div className='h-screen flex justify-center flex-col'>
            <div className='flex justify-center'>
                <div>
                    <div className='px-12'>
                        <div className='text-3xl font-bold '>
                            Create an account
                        </div>
                        <div className='text-m font-normal pt-2 pb-5 text-slate-800'>
                            {type === 'signup' ? "Already have an account? " : "Don't have an account! "}
                            <Link className='underline' to={type==='signup' ? "/signin":"/signup" }> 
                                { type === "signup" ? "SignIn" : "SignUp"}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Input label='Email' placeholder='Enter your valid email' onChange={(e) => {
                            setInput({
                                ...input,
                                email : e.target.value
                            })
                        }}/>
                        
                        <Input label='Password' type={"password"} placeholder='Min of 8 charcters' onChange={(e) => {
                            setInput({
                                ...input,
                                password : e.target.value
                            })
                        }}/>

                        {type==="signup"? 
                        <Input label='Username' placeholder='Enter your username' onChange={(e) => {
                            setInput({
                                ...input,
                                name : e.target.value
                            })
                        }}/> : null}

                        <button type="button" onClick={submitData} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full mt-5"> {type === "signup" ? "Sign Up" : "Sign In"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
