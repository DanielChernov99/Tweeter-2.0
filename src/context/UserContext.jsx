import { createContext, useContext, useState } from "react";


const UserContex = createContext(null)

export function UserProvider({children}){

    const [userName,setUserName] = useState(() => {
        return localStorage.getItem("userName") || "Guest"
    })

    function checkValidName(name){
        if(!name || name.trim() === ""){
            return false;
        }
        if (/\d/.test(name)) {
            return false;
        }
        return false
    }

    function changeName(name){
        if(!checkValidName(name)){
            return false
        }
        const cleanName = name
        setUserName(cleanName)
        localStorage.setItem("userName",cleanName)

        return true
    }

    return (
        <UserContex.Provider value={{userName,changeName }}>
            {children}
        </UserContex.Provider>
    )
}


export function useUser(){
    return useContext(UserContex)
}