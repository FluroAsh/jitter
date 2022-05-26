import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Navigation from './Navigation';
import LoginForm from './LoginForm';
import MessageForm from './MessagesForm';
import Messages from './Messages';
import { About } from './About';
import { NotFound } from './NotFound';
import { MessageDetail } from './MessageDetail';
import initialMessageList from '../Data/message-list.json';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [messageList, setMessageList] = useState(initialMessageList);

  const activateUser = (username) => {
    setLoggedInUser(username);
  };

  useEffect(() => {
    // usually a fetch (but currently static in json)
    setMessageList(initialMessageList); // simulates the fetch
  }, []);

  const addMessage = (text) => {
    const message = {
      // TODO: needs refactoring, as we will be getting id: 4 every time...
      id: nextId(messageList), // UID as we add additional messages
      text: text,
      user: loggedInUser,
    };

    // gets messageList then appends the message to the top
    setMessageList((messageList) => [...messageList, message]);
    console.log(messageList);
  };

  function nextId(data) {
    if (data.length === 0) {
      return 1;
    }

    data.sort((a, b) => a.id - b.id);
    const nextId = data[data.length - 1].id + 1;
    return nextId;
  }

  return (
    <div className="App">
      <h1>Jitter</h1>
      {/* if no loggedInUser, render login form otherwise render message form*/}
      {/* {!loggedInUser ? (
        <LoginForm activateUser={activateUser} />
      ) : (
        <MessageForm loggedInUser={loggedInUser} addMessage={addMessage} />
      )} */}

      {/* Wrap all the components involved in the apps routing */}
      {/* <Messages messageList={messageList} /> */}

      <Router>
        {/* Needs to be inside the Router component because it uses the Link component */}
        <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
        <Routes>
          <Route path="/" element={<Navigate to="messages" replace />} />
          {/* Nested routes for 'messages' */}
          <Route path="messages">
            <Route index element={<Messages messageList={messageList} />} />
            {/* If user isn't logged in, redirect them to the login page */}
            <Route
              path="new"
              element={
                loggedInUser ? (
                  <MessageForm
                    loggedInUser={loggedInUser}
                    addMessage={addMessage}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path=":messageId"
              element={<MessageDetail messageList={messageList} />}
            />
          </Route>
          <Route path="about" element={<About />} />
          <Route
            path="login"
            element={<LoginForm activateUser={activateUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
