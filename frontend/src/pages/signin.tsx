import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const navigate = useNavigate();
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    async function clickFunc1(){
        const response = await axios.post("http://localhost:8080/user/signin" , {
        username : userNameRef.current?.value,
        password : passwordRef.current?.value
    })
    localStorage.setItem("token" , response.data.token);
    navigate("/home");
  } 

    return(
        <div className=" h-[100vh] w-[100vw] bg-white flex justify-center items-center ">
            <div className=" h-[75%] bg-blue-200 w-[40%] mb-20 flex justify-center items-center rounded-md">
                <div className="h-[90%] w-[70%] bg-white rounded-md flex flex-col justify-center items-center gap-4">
                    <h1 className="text-3xl ">Sign in</h1>
                    <Input variant="Primary" placeholder="Email" reference={userNameRef} type ="text"/>
                    <Input variant="Primary" placeholder="password" reference={passwordRef} type="password"/>
                    <Button variant="Primary" title="Signin" onClick={clickFunc1}/>
                </div>
            </div>
        </div>
    )
}