import { useState } from "react"
import { Button } from 'reactstrap'

const moodOptions = [
    ['🏕', "Outdoorsy"],
    ['🧗‍♀️' , "Adventurous"],
    ['🎨', "Creative"],
    ['🎼', "Musical"],
    ['🍖', "Hungry"],
    ['🥇', "Sporty"],
]

export default function MoodStage(props) {
    const [moodsClicked, setMoodsClicked] = useState([])
    const [message, setMessage] = useState(null)

    const renderMoods = (moods) => {
        return (
            <div className="d-flex justify-content-center">
                {moods.map((mood, i) => {
                    return (
                        <div className="ml-3 mr-3" key={i} onClick={(e) => onMoodButtonClick(mood[1])}>
                            <div className={moodsClicked.includes(mood[1]) ? "datr-circle-clicked" : "datr-circle"}>{mood[0]}</div>
                            <div>{mood[1]}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const onMoodButtonClick = (moodName) => {
        if (moodsClicked.includes(moodName)) {
            setMoodsClicked(moodsClicked.filter(x => x !== moodName))
        } else {
            setMoodsClicked([...moodsClicked, moodName])
        }
    }

    const handleNextClick = () => {
        if (moodsClicked.length === 0) {
            setMessage("Please select at least 1 mood")
            return
        }
        props.updateStateAbove(moodsClicked)
        props.setStage(props.stage + 1)
    }

    const handleBackClick = () => {
        props.setStage(props.stage - 1)
    }

    return (
        <div className="datr-background text-white">
            <h2 className="d-flex justify-content-center mt-1">Choose one or more moods</h2>
            {renderMoods(moodOptions)}
                
            <div className="row justify-content-center mt-3">
                <Button className="mr-2" border="danger" color="danger" onClick={handleBackClick}>Back</Button>
                <Button className="ml-2" border="danger" color="danger" onClick={handleNextClick}>Next</Button>
            </div>
            {message !== null && <div className="d-flex justify-content-center mt-3">{message}</div>}
        </div>
    )
}