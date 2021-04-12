import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formStatus, setFormStatus] = useState("")
    const history = useHistory()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (username.length < 1 || password.length < 1){
            setFormStatus("Username or Password cannot be empty")
        }
        else {
            setFormStatus("Logging In...")
            /* Request login with credentials and redirect to user page on success */
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/token/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
              .then(res => res.json())
              .then(result => {
                console.log(result)  
                const jwtToken = result.access
                localStorage.setItem("datrToken", jwtToken)
                history.push("/user")
              })
        }
    }

    return (
        <div className="datr-background">
            <Link className="datr-button" to="/">Back to Home</Link>
            <form onSubmit={handleSubmit}>
                <label>User Name</label>
                <input type="text" data-test="username" value={username} onChange={e => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" data-test="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Log In" data-test="submit" />
                <div>{formStatus}</div>
            </form>
        </div>
    )
}