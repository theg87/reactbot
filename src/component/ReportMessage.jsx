import React from 'react';

export default class ReportMessage extends React.Component {
  render() {
    const { message, show, onClick } = this.props;
    const display = show ? 'block' : 'none';

    return (
      <div 
        className="report-message"
        style={{ display }}
        onClick={() => onClick()}
        tabIndex="0"
      >
        <div className="content">
          <h2 className="heading">Report from Reactbot</h2>
          <img src="assets/robot.png" width="128" height="128" alt="Reactbot" />
          <p className="message">{message}</p>
          <p className="text-small text-light">Click anywhere to close</p>
        </div>
      </div>
    );
  }
}

ReportMessage.propTypes = {
  message: React.PropTypes.string,
  show: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
 