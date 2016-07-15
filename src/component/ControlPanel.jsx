import React from 'react';
import cx from 'classnames';
import t from '../util/translate';
import Instructions from './Instructions.jsx';

let instructionId = 0;

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: 'square',
      size: 1,
      language: 'sv',
      instructions: [],
    };
  }

  handleChange(evt, type) {
    this.setState({ [type]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let instructions = '';
    this.state.instructions.forEach(i => instructions += t(i.value, this.state.language));
    console.log(this.state, instructions);
  }

  addInstruction(value) {
    this.setState(state => ({
      instructions: state.instructions.concat([{ 
        id: instructionId++, 
        value,
      }]),
    }));
  }

  resetInstructions() {
    this.setState({ instructions: [] });
  }

  render() {
    const { state } = this;

    return (
      <div>
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <fieldset>
            <legend>Configure room</legend>

            <label htmlFor="shape">Shape</label>
            <select
              id="shape"
              value={state.shape}
              onChange={evt => this.handleChange(evt, 'shape')}
            >
              <option value="square">Square</option>
              <option value="circular">Circular</option>
            </select>

            <label htmlFor="size">Size</label>
            <input
              type="number"
              min="1"
              max="100"
              value={state.size}
              onChange={evt => this.handleChange(evt, 'size')}
            />
          </fieldset>

          <fieldset>
            <legend>Configure Reactbot</legend>

            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={state.language}
              onChange={evt => this.handleChange(evt, 'language')}
            >
              <option value="sv">Swedish</option>
              <option value="en">English</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>Reactbot instructions</legend>

            <button type="button" onClick={() => this.addInstruction('F')}>
              {t('F', state.language)}
            </button>

            <button type="button" onClick={() => this.addInstruction('L')}>
              {t('L', state.language)}
            </button>

            <button type="button" onClick={() => this.addInstruction('R')}>
              {t('R', state.language)}
            </button>

            <Instructions
              instructions={state.instructions}
              show={state.instructions.length > 0}
              language={state.language}
            />

            <button 
              type="button"
              onClick={() => this.resetInstructions()}
              className={cx('reset-button', { 'is-visible': state.instructions.length })}
            >
              Reset instructions
            </button>
          </fieldset>

          <button type="submit">Run instructions</button>
        </form>
      </div>
    );
  }
}
