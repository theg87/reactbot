import React from 'react';
import ControlPanel from './ControlPanel.jsx';

export default class App extends React.Component {
  render() {
    return (
      <section>
        <h1>Reactbot</h1>
        <ControlPanel />
      </section>
    );
  }
}
