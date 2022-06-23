import { AppBar, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';
import { getMyMessages, getMessages } from './services/messagesServices';

export const Navigation = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;

  const navigate = useNavigate(); // hook to retrieve 'history'

  const logout = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    // sessionStorage.removeItem('username'); // for single items
    dispatch({
      type: 'setLoggedInUser',
      data: null,
    });

    dispatch({
      type: 'setToken',
      data: null,
    });
    navigate('/messages'); // redirects to "/messages"
  };

  const myMessages = () => {
    getMyMessages()
      .then((messages) => {
        dispatch({
          type: 'setMessageList',
          data: messages,
        });
      })
      .catch((err) => console.error(err));
  };

  // const messages = () => {
  //   getMessages()
  //     .then((messages) => {
  //       dispatch({
  //         type: 'setMessageList',
  //         data: messages,
  //       });
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <AppBar position="sticky">
      <Typography variant="h3" style={{ textAlign: 'center' }}>
        Jitter
      </Typography>
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs value={false}>
          <Tab
            label="Home"
            // onClick={messages}
            component={Link}
            to="/messages"
          />
          <Tab label="About" component={Link} to="/about" />
          {loggedInUser && (
            <Tab label="New message" component={Link} to="/messages/new" />
          )}
          {loggedInUser && (
            <Tab
              label="My Messages"
              onClick={myMessages}
              component={Link}
              to={`/messages?username=${loggedInUser}`}
            />
          )}
          {loggedInUser && (
            <Tab
              label="Logout"
              onClick={logout}
              component={Link}
              to="/auth/logout"
            />
          )}
          {!loggedInUser && (
            <Tab label="Login" component={Link} to="/auth/login" />
          )}
          {!loggedInUser && (
            <Tab label="Signup" component={Link} to="/auth/signup" />
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};
