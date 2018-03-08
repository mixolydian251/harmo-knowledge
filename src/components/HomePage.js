import React from 'react';
import { connect } from 'react-redux';

import ChordHarmonies from './ChordHarmonies';
import AttemptNotes from './AttemptNotes';
import SettingsMenu from './SettingsMenu';

class HomePage extends React.Component{

  state = {
    harmony: new ChordHarmonies(),
    root: undefined,
    tonality: undefined,
    answer: {
      root: undefined,
      third: undefined,
      fifth: undefined,
      seventh: undefined
    },
    feedback: undefined,
    semitone: undefined,
    preferences: {
      maj: this.props.preferences.maj,
      min: this.props.preferences.min,
      dim: this.props.preferences.dim,
      maj7: this.props.preferences.maj7,
      min7: this.props.preferences.min7,
      '7': this.props.preferences['7'],
      m7b5: this.props.preferences.m7b5,
    }
  };

  formatAnswer = (answer) => this.state.harmony.formatInput(answer);

  unicode = (input) => {
    if (input[1] && input[1] === 'b'){
      return input[0] + '\u266d'
    } else if (input[1] && input[1] === '#'){
      return input[0] + '\u266f'
    } else {
      return input
    }
  };

  determineValidTonality = () => {
    const keys = Object.keys(this.state.preferences);
    const values = Object.values(this.state.preferences);
    return keys.filter((key, i) => values[i] === true && key)
  };

  setChord = () => {
    const validTonalities = this.determineValidTonality();
    const root = this.state.harmony.keys[Math.floor(Math.random() * 12)];
    const tonality = validTonalities[Math.floor(Math.random() * validTonalities.length)];
    const semitone = this.state.harmony.isSharp(root) ? 'sharps' : 'flats';
    this.setState({
      root,
      tonality,
      semitone,
    }, () => {
      this.setAnswer();
    })
  };

  setAnswer = () => {
    const answer = this.state.harmony.chordScale(this.state.root, this.state.tonality);
    this.setState({
      answer: {
        root: answer.root,
        third: answer.third,
        fifth: answer.fifth,
        seventh: answer.seventh,
      }
    })
  };

  checkAnswer = (attempt) => {
    this.setState({
      feedback: {
        root: this.state.answer.root === this.formatAnswer(attempt.root) ? 'Nice!': 'Nope.',
        third: this.state.answer.third === this.formatAnswer(attempt.third) ? 'Nice!': 'Nope.',
        fifth: this.state.answer.fifth === this.formatAnswer(attempt.fifth) ? 'Nice!': 'Nope.',
        seventh: this.state.answer.seventh === this.formatAnswer(attempt.seventh) ? 'Nice!': 'Nope.',
      },
    })
  };

  nextChord = () => {
    this.setChord();
    this.setState({
      answer: {
        root: undefined,
        third: undefined,
        fifth: undefined,
        seventh: undefined,
      },
      feedback: undefined,
    })
  };

  setPreferences = (preferences) => {
    this.setState({settings: {
      ...preferences
    }})
  };

  componentDidMount() {
    this.setChord();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      root: undefined,
      tonality: undefined,
      answer: {
        root: undefined,
        third: undefined,
        fifth: undefined,
        seventh: undefined
      },
      feedback: undefined,
      semitone: undefined,
      preferences: {
        maj: nextProps.preferences.maj,
        min: nextProps.preferences.min,
        dim: nextProps.preferences.dim,
        maj7: nextProps.preferences.maj7,
        min7: nextProps.preferences.min7,
        '7': nextProps.preferences['7'],
        m7b5: nextProps.preferences.m7b5,
      }
    }, () => {
      this.setChord();
    })
  }


  render () {
    return(
      <div className="layout">
        <SettingsMenu/>
        <div className="chord">
          <h1 className="chord__text">
            {this.state.root} {this.state.tonality}
          </h1>
          <p className="chord__subtext">(Answer in {this.state.semitone} .)</p>
        </div>
        <AttemptNotes
          checkAnswer={this.checkAnswer}
          nextChord={this.nextChord}
          feedback={this.state.feedback}
          answer={this.state.answer}/>
      </div>
    )
  }
}

const MapStateToProps = state => ({
  preferences: state.preferences
});

export default connect(MapStateToProps)(HomePage);