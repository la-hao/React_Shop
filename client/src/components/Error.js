import React from 'react';
import { Link } from 'react-router-dom';

function Error(props) {
  return (
    <div className="alert alert-danger">
      Page Not Found ! <Link to="/">Return Home</Link>
    </div>
  );
}

export default Error;