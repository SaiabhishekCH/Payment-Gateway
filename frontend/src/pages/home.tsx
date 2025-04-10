import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export function HomePage(props : any){
    const navigate = useNavigate();
    const [ userName , setUserName ] = useState("");
    const [ balance , setBalance ] = useState("");
    useEffect(()=>{
        async function fetchUserData(){
            const token = localStorage.getItem("token");
            if(!token){
                setUserName("");
                return;
            }
            const response = await axios.get("http://localhost:8080/user/username" , {
                headers : {
                    authorization : token
                }
            })
            setUserName(response.data.username)
        }
        fetchUserData();
    },[]);

    useEffect(()=>{
        async function getBalance(){
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/user/balance",{
                headers : {
                    authorization : token
                }
            })
            setBalance(response ?  response.data.balance : "null");
        }
        getBalance();
    },[balance])

    return(
        <div className="h-[100vh] w-[100vw] bg-white">
            <div className="flex justify-between border border-slate-400 h-[10%] p-4 shadow-md">
                <span><h1 className="text-2xl font-serif font-bold text-slate-600">DEx</h1></span>
                <div className="flex justify-center items-center gap-2">
                    <p className="flex flex-row items-center justify-center">{userName ? userName.toLocaleUpperCase() : ""}</p>
                    <div className="h-10 w-10 rounded-full border border-black bg-slate-400  flex justify-center items-center">{userName ? userName.charAt(0).toUpperCase() : "?"}</div>
                </div>
            </div>
            <div className="m-6 flex flex-col gap-4">
                <h1 className="font-bold">Your balance : <span className="font-normal">${balance}</span></h1>
                <h1>Users</h1>
                <div className="flex gap-4">
                <Input placeholder="Search users..." variant="Secondary" type="text"/>
                <Button title="Search" variant="Secondary"/>
                </div>
                <div>
                    <div className="flex w-[100%] justify-between ">
                        <div className="flex justify-center items-center gap-2">
                        <div className="h-10 w-10 rounded-full border border-black bg-slate-400 flex justify-center items-center">{userName ? userName.charAt(0).toUpperCase() : "?"}</div>
                        <h1>{userName}</h1>
                        </div>
                        <div className="mt-3"><Button title={"Send Money"} variant="Tertiary" onClick={()=>navigate("/send")}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}