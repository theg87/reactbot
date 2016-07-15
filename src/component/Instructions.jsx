import React from 'react';
import t from '../util/translate';

export default class Instructions extends React.Component {
  render() {
    const { instructions, show, language } = this.props;

    return (
      <div>
        {
          show &&
            <ul className="instructions">
              {
                instructions.map(instruction => {
                  return (
                    <li key={instruction.id}>
                      {t(instruction.value, language)}
                    </li>
                  );
                })
              }
            </ul>
        }
      </div>
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
 