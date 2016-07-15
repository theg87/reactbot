import React from 'react';

export default class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: 'square',
      size: 1,
      language: 'sv',
    };
  }

  handleChange(evt, type) {
    this.setState({ [type]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    const state = this.state;

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

          <button type="submit">Run instructions</button>
        </form>
      </div>
    );
  }
}
