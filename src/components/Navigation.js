import { Link, useNavigate } from 'react-router-dom';

const Navigation = ({ loggedInUser, activateUser }) => {
  const navigate = useNavigate(); // hook to retrieve 'history'
  const logout = (event) => {
    event.preventDefault();
    activateUser('');
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

export default Navigation;
