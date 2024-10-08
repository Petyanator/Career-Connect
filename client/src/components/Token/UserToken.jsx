import { useState } from "react";


function UserToken() {

    function getToken(){
        const tokenString = localStorage.getItem("token");
        const UserToken = JSON.parse(tokenString);
        return UserToken;
    }

    const [token, setToken] = useState(getToken());

    function saveToken(UserToken){
        localStorage.setItem("token", JSON.stringify(UserToken));
        setToken(UserToken)
    }

    function removeToken(){
        localStorage.removeItem("token");
        setToken(null)
    }

    return {
        setToken: saveToken,
        token,
        removeToken,
    };
}

export default UserToken;