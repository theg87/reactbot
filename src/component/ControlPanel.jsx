import React from 'react';
import _reduce from 'lodash/reduce';
import t from '../util/translate';
import Room from '../object/Room';
import Reactbot from '../object/Reactbot';
import Instructions from './Instructions.jsx';
import ReportMessage from './ReportMessage.jsx';

// Create new instance of Reactbot
const reactbot = new Reactbot();

// Counter used for React keys
let instructionId = 0;

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: 'square',
      size: 10,
      startPosX: 1,
      startPosY: 1,
      language: 'sv',
      instructions: [],
      report: '',
      debug: false,
    };
  }

  /**
   * Handles input changes
   * @param {Object} evt
   * @param {String} type
   */
  handleChange(evt, type) {
    const value = type === 'debug' ? evt.target.checked : evt.target.value;
    const state = { [type]: value };

    if (type === 'shape') {
      state.size = 10;
      state.startPosX =  value === 'square' ? 1 : 0;
      state.startPosY = state.startPosX;
    }

    this.setState(state);
  }

  /**
   * Handles form submission
   * @param {Object} evt
   */
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

    const startPosition = {
      x: parseInt(startPosX, 10),
      y: parseInt(startPosY, 10),
    };

    const room = new Room(shape, size, startPosition, debug);

    reactbot.configure({
      language,
      room,
      debug,
    });

    const report = reactbot.execute(instructionString);
    this.setState({ report });
  }

  /**
   * Adds instruction to the instructions array
   * @param {String} value
   */
  addInstruction(value) {
    this.setState(state => ({
      instructions: state.instructions.concat([{ 
        id: instructionId++, 
        value,
      }]),
    }));
  }

  /**
   * Clears the instructions array
   */
  resetInstructions() {
    this.setState({ instructions: [] });
  }

  /**
   * Sets report to empty string, which will close the report message
   */
  closeReportMessage() {
    this.setState({ report: '' });
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

    const instructionButton = (instruction, translation) => {
      return (
        <button
          type="button"
          className="button instruction-button"
          onClick={() => this.addInstruction(instruction)}
        >
          {translation}
        </button>
      );
    };

    const resetButtonDisplay = instructions.length ? 'block' : 'none';

    return (
      <div className="control-panel">
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <fieldset>
            <legend>Configure room</legend>

            <div className="shape">
              <label htmlFor="shape">Shape</label>
              <select
                id="shape"
                value={shape}
                onChange={evt => this.handleChange(evt, 'shape')}
              >
                <option value="square">Square</option>
                <option value="circular">Circular</option>
              </select>
            </div>

            <div className="size">
              <label htmlFor="size">Size</label>
              <input
                id="size"
                type="number"
                min="1"
                max="100"
                value={size}
                onChange={evt => this.handleChange(evt, 'size')}
              />
            </div>

            <div className="start-position">
              <h2 className="heading">Start position</h2>

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
            </div>
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

          <fieldset>
            <legend>Reactbot instructions</legend>

            <p>
              <b>{f}</b> = Go forward<br />
              <b>{l}</b> = Turn left<br />
              <b>{r}</b> = Turn right
            </p>

            {instructionButton('F', f)}
            {instructionButton('L', l)}
            {instructionButton('R', r)}

            <Instructions
              instructions={instructions}
              language={language}
            />

            <button
              type="button"
              onClick={() => this.resetInstructions()}
              className="reset-button"
              style={{ display: resetButtonDisplay }}
            >
              Reset
            </button>
          </fieldset>

          <div className="submit-area">
            <div className="debug-input">
              <input
                id="debug"
                type="checkbox"
                value={this.state.debug}
                onChange={(evt) => this.handleChange(evt, 'debug')}
              />
              <label htmlFor="debug">Debug mode <span className="text-small text-light">(Open the console in your browser to see debug messages)</span></label>
            </div>

            <button type="submit" className="button">Execute</button>
          </div>

          <ReportMessage
            message={report} show={report !== ''}
            onClick={() => this.closeReportMessage()}
          />
        </form>
      </div>
    );
  }
}
