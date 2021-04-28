import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Row, Spinner, Button } from 'reactstrap'
import UserNavbar from "./UserNavbar"
import DateCard from "./DateCard"

export default function UserPage() {
    const [savedLocations, setSavedLocations] = useState(null)
    const [message, setMessage] = useState(null)
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
                    if (result.data.length === 0) {
                        setMessage("Head over to new ideas page to get some ideas to save!")
                    }
                    setSavedLocations(result.data)
                    setUsername(result.username)
                } else {
                    history.push("/login")
                }
        })
    }, [history])

    const handleDeleteLocation = (e, place) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete_date_location?place_id=${place.place_id}`, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("datrToken")}`},
            method: "POST"
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === "success"){
                    setSavedLocations(savedLocations.filter(x => x.place_id !== place.place_id))
                }
        })
    }

    return (
        <div>
            <UserNavbar username={username}/>
            <div className="datr-background">
                {savedLocations !== null &&
                    <Row className="d-flex justify-content-center">
                    {savedLocations.map((place, i) => 
                    <DateCard 
                        name={place.name} 
                        address={place.address} 
                        button={<Button color="danger" onClick={(e) => handleDeleteLocation(e, place)}>Remove Idea</Button>}
                        photo_string={place.photo_string}
                        key={i}
                        />)}
                </Row>
                }
                {savedLocations === null && <Spinner color="danger" />}
                {message !== null && <p>{message}</p>}
            </div>
        </div>
    )
}