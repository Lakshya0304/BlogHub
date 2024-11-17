import { ChangeEvent } from 'react'

interface inputType {
    label : string,
    placeholder : string,
    onChange : (e: ChangeEvent<HTMLInputElement>) => void,
    type ?: string
}

export default function Input({label , placeholder, onChange , type}:inputType ) {
  return (
    <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-3" >{label}</label>

        <input onChange={onChange} type={ type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder ={placeholder} required />
    </div>
  )
}
