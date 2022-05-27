import { useGlobalState } from '../utils/stateContext';
import { Message } from './Message';

export const Messages = () => {
  const { store } = useGlobalState();
  const { messageList } = store;
  return (
    <>
      {/* the first message is the prop, the 2nd is the iterator */}
      {messageList
        .map((message) => <Message key={message.id} message={message} />)
        .reverse()}
    </>
  );
};