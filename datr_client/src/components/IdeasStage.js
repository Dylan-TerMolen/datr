import { useEffect, useState } from "react"
import { Row, Button, Spinner } from "reactstrap"
import DateCard from "./DateCard";

/* f29173d6c733e677a74e703ca87c2a97 */

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
                <Row className="d-flex justify-content-center">
                    {ideas.map((place, i) => 
                    <DateCard 
                        name={place.name} 
                        address={place.address} 
                        button={<Button color="danger" onClick={(e) => handleSaveLocation(e, place)}>Save Idea</Button>}
                        photo_string={place.photo_string}
                        rating={place.rating}
                        totalRatings={place.total_ratings}
                        key={i}
                        />)}
                </Row>
            }
            {ideas === null &&
            <div>
                <h1 className="mt-10 d-flex justify-content-center text-white">Loading your uniquely random recommendations!</h1>
                <div className="d-flex justify-content-center"><Spinner color="white"/></div>
            </div> 
            }
        </div>
    )
}