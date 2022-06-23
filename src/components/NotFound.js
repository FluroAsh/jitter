import { Link } from 'react-router-dom';
export const NotFound = () => {
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <p>No page found, please check the URL and try again</p>
      <Link to="messages">Go back to home page</Link>
    </div>
  );
};
