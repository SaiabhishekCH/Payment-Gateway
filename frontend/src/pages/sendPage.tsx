import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SendMoney(){
    const navigate = useNavigate();
    const sendRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    function sendMoney(){
        const name = sendRef.current?.value;
        const token = localStorage.getItem("token");
        if( name ){
            axios.post("http://localhost:8080/user/transfer" , {
                to : name,
                amount : amountRef.current?.value
            },
        {
            headers :{
                authorization : token
            }
        })
        }
        navigate("/home");
    }

    return(
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="h-[70%] w-[40%] border border-slate-400 bg-blue-100 flex justify-center items-center flex-col gap-10 rounded-md">
            <h1 className="text-3xl text-green-800">Send Money</h1>
                <Input placeholder="Reciever's Name" variant="Primary" reference={sendRef} type="text"/>
                <Input placeholder="Amount" variant="Primary" reference={amountRef} type="text"/> 
                <Button title="Send Money" variant="Primary" onClick={sendMoney}/>
            </div>
        </div>
    )
}