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
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);  // Set logged-in state
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn ? (
            <div>
              <h2>Login</h2>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleRegister}>Register</button>
            </div>
          ) : (
            <Redirect to="/capybara" />
          )}
        </Route>
        
        <Route path="/capybara">
          {isLoggedIn ? (
            <div>
              <h1>Welcome!</h1>
              <img
                src="./capy.gif"  // Update this path to match the file location in `public/`
                alt="Capybara GIF"
                style={{ width: '300px', height: '300px' }}
              />
            </div>
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        {/* Always redirect to "/" for any undefined route */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
