import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Table, Spinner, Button } from 'reactstrap'
import UserNavbar from "./UserNavbar"

export default function GeneratePage() {
    const [userInfo, setUserInfo] = useState(null)
    const [username, setUsername] = useState(null)
    const history = useHistory()

    /* On loading this component fetch the user's information */
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get_user_ideas`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("datrToken")}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    setUserInfo(result.places)
                    setUsername(result.username)
                } else {
                    history.push("/login")
                }
        })
    }, [history])

    const handleSaveLocation = (e, place) => {
        const queryParams = (new URLSearchParams(place)).toString()
        
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/save_date_location?${queryParams}`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${localStorage.getItem("datrToken")}`},
        })
    }
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
                        <th>Save Idea!</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userInfo.map((place, i) => <tr key={i}>
                            <td>{place.name}</td>
                            <td>{place.address}</td>
                            <td>{place.place_id}</td>
                            <td><Button color="danger" onClick={(e) => handleSaveLocation(e, place)}>Save Idea</Button></td>
                        </tr>)}
                    </tbody>
                </Table>
            }
            {userInfo === null && <Spinner color="danger" />}
        </div>
    )
}