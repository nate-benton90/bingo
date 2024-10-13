import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Use environment variable for the API base URL
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post(`${apiBaseUrl}/api/users/register`, { username, password });
      alert('Registered successfully');
    } catch (err) {
      alert('Error registering');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/users/login`, { username, password });
      console.log("Login response:", response);  // Add this line to check response
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login error:", err);  // Add this line to log any error
      alert('Invalid credentials');
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>
            <h2>Login</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </div>
        </Route>
        {isLoggedIn && (
          <Route path="/capybara">
            <div>
              <h1>Welcome!</h1>
              <img src="path_to_capybara_image" alt="Capybara" />
            </div>
          </Route>
        )}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
