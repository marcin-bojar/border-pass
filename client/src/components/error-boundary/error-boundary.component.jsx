import React from 'react';
import image from '../../assets/png/error.png';

import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasErrored: true };
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-boundary">
          <img className="error-boundary__img" src={image} />
          <p className={'error-boundary__text'}>Ups... coś poszło nie tak. Spróbuj ponownie.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
