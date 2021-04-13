import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Table, Spinner } from 'reactstrap'
import UserNavbar from "./UserNavbar"

export default function UserPage() {
    const [userInfo, setUserInfo] = useState(null)
    const [username, setUsername] = useState(null)
    const history = useHistory()

    /* On loading this component fetch the user's information */
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get_saved_date_locations`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("datrToken")}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    setUserInfo(result.data)
                    setUsername(result.username)
                } else {
                    history.push("/login")
                }
        })
    }, [history])

    return (
        <div>
            <UserNavbar username={username}/>
            {userInfo !== null &&
                <Table className="datr-table">
                    <thead>
                    <tr>
                        <th>Place Name</th>
                        <th>Place Address</th>
                        <th>Place ID</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userInfo.map((place, i) => <tr key={i}>
                            <td>{place.name}</td>
                            <td>{place.address}</td>
                            <td>{place.place_id}</td>
                        </tr>)}
                    </tbody>
                </Table>
            }
            {userInfo === null && <Spinner color="danger" />}
        </div>
    )
}