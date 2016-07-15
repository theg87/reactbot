import React from 'react';
import cx from 'classnames';
import _reduce from 'lodash/reduce';
import t from '../util/translate';
import room from '../object/room';
import reactbot from '../object/reactbot';
import Instructions from './Instructions.jsx';

let instructionId = 0;

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: 'square',
      size: 5,
      startPosX: 1,
      startPosY: 1,
      language: 'sv',
      instructions: [],
      report: '',
      debug: false,
    };
  }

  handleChange(evt, type) {
    const value = type === 'debug' ? evt.target.checked : evt.target.value;
    this.setState({ [type]: value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { 
      shape,
      size,
      startPosX,
      startPosY,
      language,
      instructions,
      debug,
    } = this.state;

    const instructionString = _reduce(instructions, (result, instruction) => {
      return result + t(instruction.value, language);
    }, '');

    room.init({
      shape,
      size,
      startPosition: {
        x: parseInt(startPosX, 10),
        y: parseInt(startPosY, 10),
      },
    });

    const report = reactbot.init({
      language,
      instructions: instructionString,
      debug,
    });

    this.setState({ report });
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
    const {
      shape,
      size,
      startPosX,
      startPosY,
      language,
      instructions,
      report,
      debug,
    } = this.state;

    const f = t('F', language);
    const l = t('L', language);
    const r = t('R', language);

    return (
      <div className="control-panel">
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <fieldset>
            <legend>Configure room</legend>

            <label htmlFor="shape">Shape</label>
            <select
              id="shape"
              value={shape}
              onChange={evt => this.handleChange(evt, 'shape')}
            >
              <option value="square">Square</option>
              <option value="circular">Circular</option>
            </select>

            <label htmlFor="size">Size</label>
            <input
              id="size"
              type="number"
              min="1"
              max="100"
              value={size}
              onChange={evt => this.handleChange(evt, 'size')}
            />

            <h2>Start position</h2>

            <label htmlFor="x">x</label>
            <input
              id="x"
              type="number"
              min="0"
              value={startPosX}
              onChange={evt => this.handleChange(evt, 'startPosX')}
            />

            <label htmlFor="y">y</label>
            <input
              id="y"
              type="number"
              min="0"
              value={startPosY}
              onChange={evt => this.handleChange(evt, 'startPosY')}
            />
          </fieldset>

          <fieldset>
            <legend>Configure Reactbot</legend>

            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={language}
              onChange={evt => this.handleChange(evt, 'language')}
            >
              <option value="sv">Swedish</option>
              <option value="en">English</option>
            </select>
          </fieldset>

          <fieldset className="instructions">
            <legend>Reactbot instructions</legend>

            <p>Click the buttons below to add instructions</p>
            <p>
              {f} = Go forward<br />
              {l} = Turn left<br />
              {r} = Turn right
            </p>

            <button type="button" onClick={() => this.addInstruction('F')}>{f}</button>
            <button type="button" onClick={() => this.addInstruction('L')}>{l}</button>
            <button type="button" onClick={() => this.addInstruction('R')}>{r}</button>

            <Instructions
              instructions={instructions}
              show={instructions.length > 0}
              language={language}
            />

            <button
              type="button"
              onClick={() => this.resetInstructions()}
              className={cx('reset-button', { 'is-visible': instructions.length })}
            >
              Reset
            </button>
          </fieldset>

          <label htmlFor="debug">Debug mode</label>
          <input
            id="debug"
            type="checkbox"
            value={this.state.debug}
            onChange={(evt) => this.handleChange(evt, 'debug')}
          />

          {
            debug &&
              <p>Open the console in your browser to see log messages</p>
          }

          <button type="submit">Run instructions</button>

          {
            report &&
              <p>{report}</p>
          }
        </form>
      </div>
    );
  }
}
