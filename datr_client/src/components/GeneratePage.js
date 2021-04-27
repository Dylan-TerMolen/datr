import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import PreferenceStage from "./PreferenceStage"
import MoodStage from "./MoodStage"
import UserNavbar from "./UserNavbar"
import IdeasStage from "./IdeasStage"

export default function GeneratePage() {
    const [username, setUsername] = useState(null)
    /* Stage represents the part of the questionnaire the user it at */
    const [stage, setStage] = useState(1)
    const [preferences, setPreferences] = useState([])
    const [moods, setMoods] = useState([])
    const history = useHistory()

    /* On loading this component fetch the user's information */
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/check_logged_in`, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("datrToken")}`}
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    setUsername(result.username)
                } else {
                    history.push("/login")
                }
        })
    }, [history])

    const renderStage = (stage) => {
        switch(stage) {
            case 1:
                return <PreferenceStage stage={stage} setStage={setStage} updateStateAbove={setPreferences}/>
            case 2:
                return <MoodStage stage={stage} setStage={setStage} updateStateAbove={setMoods}/>
            case 3:
                return <IdeasStage setStage={setStage} moods={moods} preferences={preferences}/>
            default:
                return <h1>State Error</h1>
        }
    }

    return (
        <div>
            <UserNavbar username={username}/>
            {renderStage(stage)}
        </div>
    )
}

