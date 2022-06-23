import React, { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// import axios from 'axios';
import { Navigation } from './Navigation';
import { LoginForm } from './LoginForm';
import { MessageForm } from './MessagesForm';
import { Messages } from './Messages';
// import initialMessageList from '../Data/message-list.json';
import { About } from './About';
import { NotFound } from './NotFound';
import { MessageDetail } from './MessageDetail';
import { reducer } from '../utils/reducer';
import { StateContext } from '../utils/stateContext';
import SignUpForm from './SignUpForm';

function App() {
  const initialState = {
    messageList: [],
    loggedInUser: sessionStorage.getItem('username') || null,
    token: null,
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  return (
    <div className="App">
      {/* if no loggedInUser, render login form otherwise render message form*/}
      {/* {!loggedInUser ? (
        <LoginForm activateUser={activateUser} />
      ) : (
        <MessageForm loggedInUser={loggedInUser} addMessage={addMessage} />
      )} */}

      {/* Wrap all the components that use global states like:
      'loggedInUser' & 'messageList' in the state context provider */}
      <StateContext.Provider value={{ store, dispatch }}>
        {/* Wrap all the components involved in the apps routing */}
        <Router>
          {/* Needs to be inside the Router component because it uses the Link component */}
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="messages" replace />} />
            {/* Nested routes for 'messages' */}
            <Route path="messages">
              <Route index element={<Messages />} />
              {/* If user isn't logged in, redirect them to the login page */}
              <Route
                path="new"
                element={
                  loggedInUser ? (
                    <MessageForm loggedInUser={loggedInUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path=":messageId" element={<MessageDetail />} />
              <Route path="mymessages" element={<Messages />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="auth/login" element={<LoginForm />} />
            <Route path="auth/signup" element={<SignUpForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
