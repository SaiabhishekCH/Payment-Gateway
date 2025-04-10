import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { useRef } from "react";

export function Signup(){
    const navigate = useNavigate();
    const userNameRef = useRef<HTMLInputElement>(null);
    const FirstNameRef = useRef<HTMLInputElement>(null);
    const finalNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    function clickFunc(){
      axios.post("http://localhost:8080/user/signup" , {
        username : userNameRef.current?.value,
        password : passwordRef.current?.value,
        firstName : FirstNameRef.current?.value,
        lastName : finalNameRef.current?.value
      })
      navigate("/signin");
    }
    return(
        <div className=" h-[100vh] w-[100vw] bg-white flex justify-center items-center ">
            <div className=" h-[75%] bg-blue-200 w-[40%] mb-20 flex justify-center items-center rounded-md">
                <div className="h-[90%] w-[70%] bg-white rounded-md flex flex-col justify-center items-center gap-4">
                    <h1 className="text-3xl ">Sign up</h1>
                    <Input variant="Primary" placeholder="Firstname" reference={FirstNameRef} type ="text"/>
                    <Input variant="Primary" placeholder="lastName" reference={finalNameRef} type ="text"/>
                    <Input variant="Primary" placeholder="Email" reference={userNameRef} type ="text"/>
                    <Input variant="Primary" placeholder="password" reference={passwordRef} type="password"/>
                    <Button variant="Primary" title="Signup" onClick={clickFunc}/>
                </div>
            </div>
        </div>
    )
}