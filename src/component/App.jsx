import React from 'react';
import ControlPanel from './ControlPanel.jsx';

export default class App extends React.Component {
  render() {
    return (
      <section>
        <header>
          <h1>Reactbot</h1>
        </header>
        <ControlPanel />
      </section>
    );
  }
}
