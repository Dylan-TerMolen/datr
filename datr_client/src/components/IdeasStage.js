import { useEffect, useState } from "react"
import { Row, Button, Spinner } from "reactstrap"
import DateCard from "./DateCard";


export default function IdeasStage(props) {
    const [ideas, setIdeas] = useState(null)

    useEffect(() => {
        const userChoices = {
            moods: props.moods,
            preferences: props.preferences
        }
        const queryParams = (new URLSearchParams(userChoices)).toString()
        
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generate_new_idea?${queryParams}`, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("datrToken")}`},
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === "success") {
                setIdeas(result.places)
            }
        })
    }, [props.moods, props.preferences])
    
    const handleSaveLocation = (e, place) => {
        const queryParams = (new URLSearchParams(place)).toString()
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/save_date_location?${queryParams}`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${localStorage.getItem("datrToken")}`},
        })
    }

    return (
        <div className="datr-background">
            {ideas !== null &&
                <Row>
                    {ideas.map((place, i) => 
                    <DateCard 
                        name={place.name} 
                        address={place.address} 
                        button={<Button color="danger" onClick={(e) => handleSaveLocation(e, place)}>Save Idea</Button>}
                        photo_string={place.photo_string}
                        key={i}
                        />)}
                </Row>
            }
            {ideas === null && 
            <Spinner color="danger"/>
            }
        </div>
    )
}