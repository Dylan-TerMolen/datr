import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import HomeNavbar from './HomeNavbar';
import { Input, InputGroupText, InputGroupAddon, InputGroup } from 'reactstrap'

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
                  if (!result.access) {
                      setFormStatus("Username and password did not match")
                  } else {
                    const jwtToken = result.access
                    localStorage.setItem("datrToken", jwtToken)
                    history.push("/user/saved")
                  }
              })
        }
    }

    return (
        <div className="datr-background">
            <HomeNavbar/>
            <p>Login to Datr!</p>
            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Username</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" data-test="username" value={username} onChange={e => setUsername(e.target.value)} />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Password</InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" data-test="password" value={password} onChange={e => setPassword(e.target.value)} />
                </InputGroup>
                <Input type="submit" value="Log In" data-test="submit" />
                <div>{formStatus}</div>
            </form>
        </div>
    )
}

