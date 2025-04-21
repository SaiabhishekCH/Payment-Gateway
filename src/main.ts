import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import {userModel , accountModel} from "./db";
import { AuthMiddleWare } from "./middlewares";
import mongoose from "mongoose";
import z from "zod";
const router = express.Router();

router.post("/signup" , async ( req , res ) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const inputValid = z.object({
        username : username , 
        password : password,
        firstName : firstName,
        lastName : lastName
    })
    const validInput = inputValid.safeParse(req.body);
    if(!validInput){
        res.json({
            message : "Enter valid details"
        })
        return;
    }
    const userExists = await userModel.findOne({
        username : username
    })

    if( userExists ){
        res.json({
            message : "username exists"
        })
        return;
    }

    await userModel.create({
        username : username,
        password : password,
        firstName : firstName,
        lastName : lastName
    })

    res.json({
        message : "Account Created !"
    })

})

router.post("/signin" , async ( req , res ) => {
    const username = req.body.username;
    const password = req.body.password;

    const inputValid = z.object({
        username : username , 
        password : password
    })
    const validInput = inputValid.safeParse(req.body);
    if(!validInput){
        res.json({
            message : "Enter valid details"
        })
        return;
    }

    const foundUser = await userModel.findOne({
        username : username ,
        password : password
    })

    if( !foundUser ){
        res.json({
            message : "user not found"
        })
        return;
    }

    const token = jwt.sign({
        username : username
    } , JWT_SECRET);

    res.json({
        message : "Signedin successfully ! ",
        token : token
    })

})

router.get("/username" , AuthMiddleWare , ( req , res ) => {
    //@ts-ignore
    const username = req.user.username;
    if(username){
        res.json({
            username : username
        })
    }
    else{
        res.json({
            message : " cannot find user "
        })
        return;
    }
})

router.put("/update" , AuthMiddleWare , async ( req , res ) => {
    //@ts-ignore
    const username = req.user.username;
    const password = req.body.password;
    const foundUser = await userModel.findOne({
        username : username
    })

    if( foundUser ){
        foundUser.password = password;
        await foundUser.save();
        res.json({
            message : "password updated"
        })
        return;
    }
    res.json({
        message : "password cannot be updated / user not found "
    })

})

router.get("/getUser" , AuthMiddleWare , async ( req , res ) => {
    const filter = typeof req.query.filter ==="string" ? req.query.filter : "";

    const users = await userModel.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        }]
    })
    res.json({
        user : users.map(user =>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })

})

router.post("/createAccount" , AuthMiddleWare , async ( req , res ) => {
    //@ts-ignore
    const username = req.user.username;

    const foundUser = await userModel.findOne({
        username : username
    })

    await accountModel.create({
        balance : 1000,
        userId : foundUser?._id
    })
    res.json({
        message : "Account created Successfully ! "
    })
})

router.get("/balance" , AuthMiddleWare , async ( req , res ) => {
    //@ts-ignore
    const username = req.user.username;
    const foundUser = await userModel.findOne({
        username : username
    })

    if( foundUser ){
        const foundBalance = await accountModel.findOne({
            userId : foundUser._id
        })
        if( foundBalance ){
            res.json({
                balance : foundBalance.balance
            })
            return;
        }
    }
    res.json({
        message : "User not found "
    })
})


// The transaction part .. .

router.post("/transfer" , AuthMiddleWare , async ( req , res ) => {

    const session = await mongoose.startSession();
    //@ts-ignore
    const username = req.user.username;
    session.startTransaction();
    const { amount , to } = req.body;

    const foundFromUser = await userModel.findOne({
        username : username
    }).session(session);

    if(!foundFromUser){
        await session.abortTransaction();
        res.json({
            message : " invalid user "
        })
        return;
    }

    const foundFromUserAccount = await accountModel.findOne({
        userId : foundFromUser._id
    }).session(session);
    
    if( !foundFromUserAccount ){
        await session.abortTransaction();
        res.json({
            message : " from user not found "
        })
        return;
    }

    const foundToUser = await userModel.findOne({
        username : to
    }).session(session);

    if( !foundToUser ){
        await session.abortTransaction();
        res.json({
            message : " Cannot find the addressed user "
        })
        return;
    }
    const foundToUserAccount = await accountModel.findOne({
        userId : foundToUser._id
    }).session(session);

    if( !foundToUserAccount ){
        await session.abortTransaction();
        res.json({
            message : " The addressed user's account can't be found "
        })
        return;
    }

    await accountModel.updateOne({
        userId : foundFromUser._id
    } , { $inc : { balance : -amount } } , {session} )

    await accountModel.updateOne({
        userId : foundToUser._id
    } , {$inc : { balance : +amount } } , {session} )

    await session.commitTransaction();
    res.json({
        message : " Transaction completed "
    })
})

export default router;