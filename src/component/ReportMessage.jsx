import React from 'react';
import cx from 'classnames';

export default class ReportMessage extends React.Component {
  render() {
    const { message, show, onClick } = this.props;

    return (
      <div 
        className={cx('report-message', { 'is-hidden': !show })}
        onClick={() => onClick()}
      >
        <div className="content">
          <h2 className="heading">Report from Reactbot</h2>
          <img src="assets/robot.png" width="128" height="128" alt="Reactbot" />
          <p className="message">{message}</p>
          <p className="close-text">Click anywhere to close</p>
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
 