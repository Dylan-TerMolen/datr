import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("")
    const [formStatus, setFormStatus] = useState("")
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        /* Perform username and password validation */
        if (username.length < 1 || password.length < 1 || retypedPassword.length < 1){
            setFormStatus("Username or Password cannot be empty")
        }
        
        else if (password !== retypedPassword) {
            setFormStatus("Passwords do not match")
        }
        
        /* If valid username/password then request to register the user */
        else {
            setFormStatus("Registering...")
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/create_user?username=${username}&password=${password}`)
              .then(res => res.json())
              .then(result => {
                  if (result.status === "success") {
                    history.push("/user")
                  } else {
                    setFormStatus(result.reason)
                  }
              })
        }
    }

    return (
        <div>
            <Link className="datr-button" to="/">Back to Home</Link>
            <form onSubmit={handleSubmit}>
                <label>User Name</label>
                <input type="text" data-test="username" value={username} onChange={e => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" data-test="password" value={password} onChange={e => setPassword(e.target.value)} />
                <label>Retype Password</label>
                <input type="password" data-test="password" value={retypedPassword} onChange={e => setRetypedPassword(e.target.value)} />
                <input type="submit" value="Log In" data-test="submit" />
                <div>{formStatus}</div>
            </form>
        </div>
    )
}