import React from 'react';
import UserList from './components/UserList';
import ErrorBoundary from './components/ErrorBoundary';
import "./App.css"

const App = () => {
  return (
    <ErrorBoundary>
      <div className="container">
        <h1 className="my-4">User Management Dashboard</h1>
        <UserList />
      </div>
    </ErrorBoundary>
  );
};

export default App;
