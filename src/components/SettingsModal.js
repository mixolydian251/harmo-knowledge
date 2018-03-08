import React from 'react';
import { setPreferences } from "../actions/preferences"
import { connect } from 'react-redux'

class SettingsModal extends React.Component {
  state = {
    maj: this.props.preferences.maj,
    min: this.props.preferences.min,
    dim: this.props.preferences.dim,
    maj7: this.props.preferences.maj7,
    '7': this.props.preferences['7'],
    min7: this.props.preferences.min7,
    m7b5: this.props.preferences.m7b5,
  };

  handleModal = () => {
    this.props.handleModal();
  };

  handleMaj = () => {
    this.setState((prevState) => ({maj: !prevState.maj}),
      () => {this.props.setPreferences(this.state)});
  };

  handleMin = () => {
    this.setState((prevState) => ({min: !prevState.min}),
      () => {this.props.setPreferences(this.state)});
  };

  handleDim = () => {
    this.setState((prevState) => ({dim: !prevState.dim}),
      () => {this.props.setPreferences(this.state)});
  };

  handleMaj7 = () => {
    this.setState((prevState) => ({maj7 : !prevState.maj7}),
      () => {this.props.setPreferences(this.state)});
  };

  handle7 = () => {
    this.setState((prevState) => ({'7': !prevState['7']}),
      () => {this.props.setPreferences(this.state)});
  };

  handleMin7 = () => {
    this.setState((prevState) => ({min7: !prevState.min7}),
      () => {this.props.setPreferences(this.state)});
  };

  handlem7b5 = () => {
    this.setState((prevState) => ({m7b5: !prevState.m7b5}),
      () => {this.props.setPreferences(this.state)});
  };

  render() {
    return (
      <div className="modal">
        <div className="chordSettings">
          <button className="chordSettings__option"
                  style={borderStyle(this.state.maj)}
                  onClick={this.handleMaj}>
            <h2 className="chordSettings__title">Major</h2>
            <p className="chordSettings__description">{'( 1, 3, 5 )'}</p>
          </button>

          <button className="chordSettings__option"
                  style={borderStyle(this.state.min)}
                  onClick={this.handleMin}>
            <h2 className="chordSettings__title">Minor</h2>
            <p className="chordSettings__description">{'( 1, \u266d3, 5 )'}</p>
          </button>

          <button className="chordSettings__option"
                  style={borderStyle(this.state.dim)}
                  onClick={this.handleDim}>
            <h2 className="chordSettings__title">Diminished</h2>
            <p className="chordSettings__description">{'( 1, \u266d3, \u266d5 )'}</p>
          </button>

          <button className="chordSettings__option"
                  style={borderStyle(this.state.maj7)}
                  onClick={this.handleMaj7}>
            <h2 className="chordSettings__title">Major 7</h2>
            <p className="chordSettings__description">{'( 1, 3, 5, 7 )'}</p>
          </button>

          <button className="chordSettings__option"
                  style={borderStyle(this.state['7'])}
                  onClick={this.handle7}>
            <h2 className="chordSettings__title">Dominant 7</h2>
            <p className="chordSettings__description">{'( 1, 3, 5, \u266d7 )'}</p>
          </button>

          <button className="chordSettings__option"
                  style={borderStyle(this.state.min7)}
                  onClick={this.handleMin7}>
            <h2 className="chordSettings__title">Minor 7</h2>
            <p className="chordSettings__description">{'( 1, \u266d3, 5, \u266d7 )'}</p>
          </button>

          <button className="chordSettings__option"
                  style={borderStyle(this.state.m7b5)}
                  onClick={this.handlem7b5}>
            <h2 className="chordSettings__title">{'Minor 7\u266d5'}</h2>
            <p className="chordSettings__description">{'( 1, \u266d3, \u266d5, \u266d7 )'}</p>
          </button>

        </div>
        <button className="modal__button"
          onClick={this.handleModal}>Close</button>
      </div>
    )
  }
}

const borderStyle = (chord) => {
  return chord ?
    {
      border: 'solid 8px #53c8d6',
    } : {
      border: 'none'
    }
};

const mapDispatchToProps = dispatch => ({
  setPreferences: (obj) => dispatch(setPreferences(obj))
});

const mapStateToProps = state => ({
  preferences: state.preferences
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);