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
            <Redirect to="/capybara" />   // Redirect to Capybara page if logged in
          )}
        </Route>
        <Route path="/capybara">
          {isLoggedIn ? (  
            <div>
              <h1>Welcome!</h1>
              <img src="path_to_capybara_image" alt="Capybara" />
            </div>
          ) : (
            <Redirect to="/" />   // Redirect to login if not logged in
          )}
        </Route>
        {/* Always redirect to "/" for any undefined route */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
