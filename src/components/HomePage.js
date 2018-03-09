import React from 'react';
import { connect } from 'react-redux';

import ChordHarmonies from './ChordHarmonies';
import DisplayQuestion from './DisplayQuestion';
import AttemptNotes from './AttemptNotes';
import AttemptChord from './AttemptChord';
import SettingsMenu from './SettingsMenu';

class HomePage extends React.Component{

  state = {
    harmony: new ChordHarmonies(),
    root: undefined,
    tonality: undefined,
    notes: {
      root: undefined,
      third: undefined,
      fifth: undefined,
      seventh: undefined,
      chord: undefined
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

  unicode = (input) => {
    if (input[1] && input[1] === 'b') {
      return input[0].toUpperCase() + '\u266d'
    } else if (input[1] && input[1] === '#' || input[1] === 's') {
      return input[0].toUpperCase() + '\u266f'
    } else {
      return input[0] ? input[0].toUpperCase() : input
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
    const notes = this.state.harmony.chordScale(this.state.root, this.state.tonality);
    this.setState({
      notes: {
        root: notes.root,
        third: notes.third,
        fifth: notes.fifth,
        seventh: notes.seventh && notes.seventh,
      }
    })
  };

  checkNotes = (attempt) => {
    const root = this.unicode(this.state.notes.root);
    const third = this.unicode(this.state.notes.third);
    const fifth = this.unicode(this.state.notes.fifth);
    const seventh = this.state.seventh ? this.unicode(this.state.notes.seventh) : undefined;
    this.setState({
      feedback: {
        root: root === attempt.root ? 'Nice!': 'Nope.',
        third: third === attempt.third ? 'Nice!': 'Nope.',
        fifth: fifth === attempt.fifth ? 'Nice!': 'Nope.',
        seventh: seventh === attempt.seventh ? 'Nice!': 'Nope.',
      },
    })
  };

  checkChord = (attempt) => {
    this.setState({
      feedback: {
        chord: this.state.root === attempt.root && this.state.tonality === attempt.tonality ? 'Great Job!': 'Nope.'
      }
    });
  };

  nextChord = () => {
    this.setChord();
    this.setState({
      notes: {
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

  componentWillMount() {
    this.setChord();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      root: undefined,
      tonality: undefined,
      notes: {
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
        <DisplayQuestion
          unicode={this.unicode}
          mode={this.props.preferences.mode}
          root={this.state.root}
          tonality={this.state.tonality}
          semitone={this.state.semitone}
          notes={this.state.notes}/>

        { this.props.preferences.mode === 'chord'
          ?
          <AttemptNotes
            unicode={this.unicode}
            checkAnswer={this.checkNotes}
            nextChord={this.nextChord}
            feedback={this.state.feedback}
            answer={this.state.notes}/>
          :
          <AttemptChord
            unicode={this.unicode}
            checkAnswer={this.checkChord}
            nextChord={this.nextChord}
            feedback={this.state.feedback}
            answer={{root: this.state.root, tonality: this.state.tonality}}/>
        }
      </div>
    )
  }
}

const MapStateToProps = state => ({
  preferences: state.preferences
});

export default connect(MapStateToProps)(HomePage);