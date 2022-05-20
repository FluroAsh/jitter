const Message = ({ message }) => {
  return (
    <>
      <h4>{message.user}</h4>
      <p>{message.text}</p>
    </>
  );
};

export default Message;
