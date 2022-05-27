import { Link } from 'react-router-dom';

export const Message = ({ message }) => {
  return (
    <>
      <h4>{message.user}</h4>
      <p>{message.text}</p>
      {/* uses the relative path (localhost:3000/messages) */}
      <Link to={`${message.id}`}>View</Link>
    </>
  );
};
