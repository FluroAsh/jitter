import React, { useState, useEffect, useReducer } from 'react';
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
import { reducer } from '../utils/reducer';

function App() {
  // !! 'useReducer' handles all the states in the same object
  const initialState = {
    messageList: initialMessageList,
    loggedInUser: '',
  };
  /**
   * 'useReducer' receives 2 arguments (reducer, state)
   * reducer -> is the function
   */
  const [store, dispatch] = useReducer(reducer, initialState);
  const { messageList, loggedInUser } = store;

  const activateUser = (username) => {
    dispatch({
      type: 'setLoggedInUser',
      // don't actually need password just testing it...
      data: [username, 'password'],
    });
    // setLoggedInUser(username);
  };

  useEffect(() => {
    // usually a fetch (but currently static in json)
    dispatch({
      type: 'setMessageList',
      data: initialMessageList,
    });
  }, []);

  const addMessage = (text) => {
    const message = {
      id: nextId(messageList), // UID as we add additional messages
      user: loggedInUser,
      text: text,
    };

    dispatch({
      type: 'addMessage',
      data: message, // appends to the top of messageList
    });
  };

  function nextId(data) {
    if (data.length === 0) {
      return 1;
    }

    data.sort((a, b) => a.id - b.id);
    const nextId = data[data.length - 1].id + 1;
    return nextId;
  }

  console.log(messageList);

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
