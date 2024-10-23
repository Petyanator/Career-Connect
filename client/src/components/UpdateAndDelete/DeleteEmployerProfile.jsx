function DeleteEmployerProfile(){
    const SubmitDelete = async () => {
        const token = localStorage.getItem("token")
    
    if (window.confirm("Are you sure you want to delete your profile?")){
        try{
            const response = await fetch("http://localhost:5000/api/delete_employer_profile", {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                alert("Profile deleted successfully!");
            } else {
                const errorData = await response.json();
                console.error("Delete failed:", errorData);
                alert(`Error: ${errorData.message || "Profile deletion failed"}`);
            }
        } catch (error) {
                console.error("Network error:", error);
        }}
    
    }
    
    return(
        <>
        <div style={{ marginTop: "10rem"}}>
            <button onClick={SubmitDelete}>Delete Employer Profile</button>
        </div>
        </>
    )
}

export default DeleteEmployerProfile