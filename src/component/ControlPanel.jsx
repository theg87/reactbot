import React from 'react';
import _invert from 'lodash/invert';
import translate from '../util/translate';
import sv from '../../l10n/sv.json';
import es from '../../l10n/es.json';
import { SquareRoom, CircularRoom } from '../object/Room';
import Reactbot from '../object/Reactbot';
import ReportMessage from './ReportMessage.jsx';

// Create new instance of Reactbot
const reactbot = new Reactbot();

const DEFAULT_LANGUAGE = 'en';

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: 'square',
      size: 10,
      infinite: false,
      startPosX: 0,
      startPosY: 0,
      language: 'en',
      instructions: '',
      report: '',
      debug: false,
    };

    this.closeReportMessage = this.closeReportMessage.bind(this);
  }

  /**
   * Returns translated string
   * @param {String} string
   * @param {String} language
   * @return {String}
   */
  getTranslation(string, language) {
    if (language === DEFAULT_LANGUAGE) return string;
    const strings = { sv, es };
    return _invert(strings[language])[string];
  }

  /**
   * Handles input changes
   * @param {Object} evt
   * @param {String} type
   */
  handleChange(evt, type) {
    const value = type === 'debug' || type === 'infinite' ? evt.target.checked : evt.target.value;
    const state = { [type]: value };

    if (type === 'shape') {
      state.size = 10;
      state.startPosX = 0;
      state.startPosY = 0;
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
      infinite,
      startPosX,
      startPosY,
      language,
      instructions,
      debug,
    } = this.state;

    const size = infinite ? 'infinite' : this.state.size;

    const startPosition = {
      x: parseInt(startPosX, 10),
      y: parseInt(startPosY, 10),
    };

    let room;

    switch (shape) {
      case 'square':
        room = new SquareRoom(size, startPosition, debug);
        break;
      case 'circular':
        room = new CircularRoom(size, startPosition, debug);
        break;
      default:
        return;
    }

    reactbot.configure({
      room,
      translate: translate(language),
      debug,
    });

    const report = reactbot.execute(instructions);

    this.setState({
      report,
    }, () => {
      document.addEventListener('keyup', this.closeReportMessage);
      document.querySelector('.report-message').focus();
    });
  }

  /**
   * Clears the instructions string
   */
  resetInstructions() {
    this.setState({ instructions: '' });
  }

  /**
   * Sets state.report to empty string, which will close the report message
   */
  closeReportMessage() {
    this.setState({
      report: '',
    }, () => {
      document.removeEventListener('keyup', this.closeReportMessage);
    });
  }

  render() {
    const { shape, size, infinite, startPosX, startPosY, language, instructions, report } = this.state;
    const resetButtonDisplay = instructions !== '' ? 'block' : 'none';
    const f = this.getTranslation('F', language);
    const l = this.getTranslation('L', language);
    const r = this.getTranslation('R', language);

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
                disabled={infinite}
              />
              {
                shape === 'square' ?
                  <span className="text-small text-light">({size}x{size})</span>
                :
                  <span className="text-small text-light">(radius)</span>
              }
              <input id="infinite" type="checkbox" value={this.state.infinite} onChange={evt => this.handleChange(evt, 'infinite')} />
              <label htmlFor="infinite">Infinite</label>
            </div>

            <div className="start-position">
              <h2 className="heading">Start position</h2>

              <label htmlFor="x">x</label>
              <input
                id="x"
                type="number"
                value={startPosX}
                onChange={evt => this.handleChange(evt, 'startPosX')}
              />

              <label htmlFor="y">y</label>
              <input
                id="y"
                type="number"
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
              <option value="en">English</option>
              <option value="sv">Swedish</option>
              <option value="es">Spanish</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>Reactbot instructions</legend>

            <p>
              <b>{f}</b> = Go forward<br />
              <b>{l}</b> = Turn left<br />
              <b>{r}</b> = Turn right
            </p>

            <label htmlFor="instructions" className="structural">Enter instructions here</label>
            <input
              id="instructions"
              type="text"
              value={instructions}
              onChange={evt => this.handleChange(evt, 'instructions')}
              placeholder="Enter instructions here"
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
              <label htmlFor="debug">
                Debug mode <span className="text-small text-light">(Open the console in your browser to see debug messages)</span>
              </label>
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
