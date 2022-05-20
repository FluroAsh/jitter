const Navigation = ({ loggedInUser, activateUser }) => {
  const logout = (event) => {
    event.preventDefault();
    activateUser('');
  };

  return (
    <>
      {loggedInUser ? (
        <nav>
          <a href="/">Home</a>
          <a href="/">About</a>
          {loggedInUser}
          <a href="/" onClick={logout}>
            Logout
          </a>
        </nav>
      ) : (
        <nav>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Login</a>
          <a href="/">Signup</a>
          Guest
        </nav>
      )}
    </>
  );
};

export default Navigation;
