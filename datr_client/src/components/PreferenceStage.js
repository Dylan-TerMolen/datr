import { useState } from 'react'
import { Button } from 'reactstrap'

const drinksOnlyString = "Drinks only"
const preferenceOptions = [
    ['🍝', "Italian"],
    ['🌮', "Mexican"],
    ['🥗', "Salad"],
    ['🍜', "Noodles"],
    ['🍣', "Sushi"],
    ['🍔', "American"],
    ['🍦', "Dessert"],
    ['🍤', "Seafood"],
    ['🥂', drinksOnlyString]
]


export default function PreferenceStage(props) {
    const [preferencesClicked, setPreferencesClicked] = useState([])
    const [message, setMessage] = useState(null)

    const renderPreferences = (preferences) => {
        return (
            <div className="d-flex justify-content-center">
                {preferences.map((preference, i) => {
                    return (
                        <div className="ml-3 mr-3" key={i} onClick={(e) => onPreferenceButtonClick(preference[1])}>
                            <div className={preferencesClicked.includes(preference[1]) ? "datr-circle-clicked" : "datr-circle"}>{preference[0]}</div>
                            <div>{preference[1]}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    /* Handle adding of new preferences to the state 
     * If "Drinks only" is selected then it should be the only one chosen so remove others in that scenario
     */
    
    const onPreferenceButtonClick = (preferenceName) => {
        if (preferenceName === drinksOnlyString && preferencesClicked.length === 0) {
            setPreferencesClicked([drinksOnlyString])
            return
        } 

        if (preferencesClicked.includes(preferenceName)) {
            setPreferencesClicked(preferencesClicked.filter(x => x !== preferenceName))
        } else {
            if (preferenceName === drinksOnlyString) {
                setPreferencesClicked([drinksOnlyString])
            } else {
                setPreferencesClicked([...(preferencesClicked.filter(x => x !== drinksOnlyString)), preferenceName])
            }
        }
    }

    const handleNextClick = () => {
        if (preferencesClicked.length === 0) {
            setMessage("Please select at least 1 preference")
            return
        }
        props.updateStateAbove(preferencesClicked)
        props.setStage(props.stage + 1)
    }
    return (
        <div className="datr-background text-white">
            <h2 className="d-flex justify-content-center mt-1">Choose one or more preferences</h2>
            <h5 className="d-flex justify-content-center mt-1">Or drinks only to skip the meal</h5>
            {renderPreferences(preferenceOptions)}
            <div className="row justify-content-center mt-3"><Button border="danger" color="danger" onClick={handleNextClick}>Next</Button></div>
            {message !== null && <div className="d-flex justify-content-center mt-3">{message}</div>}
        </div>

    )
}