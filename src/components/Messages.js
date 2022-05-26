import Message from './Message';

const Messages = ({ messageList }) => {
  return (
    <>
      {/* the first message is the prop, the 2nd is the iterator */}
      {messageList.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  );
};

export default Messages;
