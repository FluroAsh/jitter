import React, { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Navigation } from './Navigation';
import { LoginForm } from './LoginForm';
import { MessageForm } from './MessagesForm';
import { Messages } from './Messages';
import initialMessageList from '../Data/message-list.json';
import { About } from './About';
import { NotFound } from './NotFound';
import { MessageDetail } from './MessageDetail';
import { reducer } from '../utils/reducer';
import { StateContext } from '../utils/stateContext';

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
  const { loggedInUser } = store;

  useEffect(() => {
    // usually a fetch (but currently static in json)
    dispatch({
      type: 'setMessageList',
      data: initialMessageList,
    });
  }, []);

  return (
    <div className="App">
      <h1>Jitter</h1>
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
            </Route>
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
