import React from 'react';

import './welcome.styles.scss';

const Welcome = () => (
  <div className="welcome">
    <h3 className="welcome__title">Witaj w Border Pass!</h3>
    <p className="welcome__text">Wygląda na to, że jesteś tu pierwszy raz.</p>
    <p className="welcome__text">W jakim obecnie znajdujesz się kraju?</p>
  </div>
);

export default Welcome;
