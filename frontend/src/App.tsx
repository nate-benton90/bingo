import { useState } from 'react';
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
      alert('Registered new user successfully');
    } catch (err) {
      alert('Error registering user');
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
            <div className="min-h-screen flex items-center justify-center bg-red-500">
              <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleLogin}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                  Register
                </button>
              </div>
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
                src="./capy.gif"  // Update this path to match the file location in `public`
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
