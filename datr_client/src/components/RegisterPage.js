import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import HomeNavbar from './HomeNavbar';
import { Input, InputGroupText, InputGroupAddon, InputGroup } from 'reactstrap'

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
                    history.push("/login")
                  } else {
                    setFormStatus(result.reason)
                  }
              })
        }
    }

    return (
        <div className="datr-background">
                <HomeNavbar/>
                <p>Register for Datr!</p>
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
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Retyped Password</InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" data-test="password" value={retypedPassword} onChange={e => setRetypedPassword(e.target.value)} />
                    </InputGroup>
                    <Input type="submit" value="Register" data-test="submit" />
                    <h3>Or go to Login page if you want to register with Facebook</h3>
                    <div>{formStatus}</div>
                </form>
            </div>
    )
}