import { useState } from "react";


function UserToken() {
    // Function to get the token from local storage
    function getToken() {
        const tokenString = localStorage.getItem("token");

        // Ensure the token is neither "undefined" nor null and is a valid JSON string
        if (!tokenString || tokenString === "undefined") {
            return null; // Return null if no valid token is found
        }
        
        try {
            return JSON.parse(tokenString); // Parse the token if it's valid
        } catch (error) {
            console.error("Failed to parse token:", error);
            return null; // Return null if parsing fails
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
        removeToken,
    };
}

export default UserToken;