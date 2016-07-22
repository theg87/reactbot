import React from 'react';

const ReportMessage = props => (
  <div
    className="report-message"
    style={{ display: props.show ? 'block' : 'none' }}
    onClick={() => props.onClick()}
    tabIndex="0"
  >
    <div className="content">
      <h2 className="heading">Report from Reactbot</h2>
      <img src="assets/robot.png" width="128" height="128" alt="Reactbot" />
      <p className="message">{props.message}</p>
      <p className="text-small text-light">Click anywhere to close</p>
    </div>
  </div>
);

ReportMessage.propTypes = {
  message: React.PropTypes.string,
  show: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default ReportMessage;
