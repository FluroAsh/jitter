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
    <nav>
      <Link to="/messages">Home</Link>
      <Link to="/about">About</Link>
      {loggedInUser ? (
        <>
          {loggedInUser}
          <Link to="messages/new">New Message</Link>
          <Link to="/messages" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/login">Signup</Link>
          Guest
        </>
      )}
    </nav>
  );
};
