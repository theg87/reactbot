import React from 'react';
import t from '../util/translate';

export default class Instructions extends React.Component {
  render() {
    const { instructions, language } = this.props;

    return (
      <div className="instructions">
        <h2 className="heading">Added instructions</h2>
        <div className="added-instructions">
          {
            instructions.length > 0 ?
              <ul>
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
            :
              <p>No instructions added. Click the buttons above to add instructions.</p>
          }
        </div>
      </div>
    );
  }
}

Instructions.propTypes = {
  instructions: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    value: React.PropTypes.string,
  })),
  language: React.PropTypes.string,
};
 