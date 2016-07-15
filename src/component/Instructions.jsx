import React from 'react';
import t from '../util/translate';

export default class Instructions extends React.Component {
  render() {
    const { instructions, show, language } = this.props;

    return (
      <ul className="instructions">
        {
          show && instructions.map(instruction => {
            return (
              <li key={instruction.id}>
                {t(instruction.value, language)}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

Instructions.propTypes = {
  show: React.PropTypes.bool,
  instructions: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    value: React.PropTypes.string,
  })),
  language: React.PropTypes.string,
}
 