import { AppBar, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';

export const Navigation = () => {
  // don't need to include dispatch in the object
  // as we're not setting the state
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;

  const navigate = useNavigate(); // hook to retrieve 'history'

  const logout = (event) => {
    event.preventDefault();
    dispatch({
      type: 'setLoggedInUser',
      data: '',
    });
    navigate('/messages'); // redirects to "/messages"
  };

  return (
    <AppBar position="sticky">
      <Typography variant="h3" style={{ textAlign: 'center' }}>
        Jitter
      </Typography>
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs value={false}>
          <Tab label="Home" component={Link} to="/messages" />
          <Tab label="About" component={Link} to="/messages" />
          {loggedInUser && (
            <Tab label="New message" component={Link} to="/messages/new" />
          )}
          {loggedInUser && (
            <Tab
              label="Logout"
              onClick={logout}
              component={Link}
              to="/messages"
            />
          )}
          {!loggedInUser && <Tab label="Login" component={Link} to="/login" />}
          {!loggedInUser && <Tab label="Signup" component={Link} to="/login" />}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};
