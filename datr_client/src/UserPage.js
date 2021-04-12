import { useEffect, useState } from "react";

export default function UserPage() {
    const [userInfo, setUserInfo] = useState("")

    /* On loading this component fetch the user's information */
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get_user_info`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("datrToken")}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    setUserInfo(JSON.stringify(result))
                } else {
                    setUserInfo(result.reason)
                }
        })
    })
    return (
        <div>
            {userInfo}
        </div>
    )
}