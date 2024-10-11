import { useState } from "react";

function UserToken() {
    // Function to get the token from local storage
    function getToken() {
        const tokenString = localStorage.getItem("token");

        if (!tokenString || tokenString === "undefined") {
            return null;
        }
        
        try {
            return JSON.parse(tokenString);
        } catch (error) {
            console.error("Failed to parse token:", error);
            return null;
        }
    }

    const [token, setToken] = useState(getToken());

    // Function to save the token
    function saveToken(userToken) {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken);
    }

    // Function to remove the token
    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken, // Ensure this is returned correctly
    };
}

export default UserToken;