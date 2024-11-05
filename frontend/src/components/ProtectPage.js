import { useEffect } from "react";
import {useNavigate } from "react-router-dom"

const ProtectPage = ({children,isAuth})=>{
    const Navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            Navigate("/Signup"); 
        }
    }, [isAuth, Navigate]);

    return children; 
}

export default ProtectPage; 

