import React from 'react';

import ChordHarmonies from './ChordHarmonies';
import AttemptNotes from './AttemptNotes';

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
    semitone: undefined
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

  setChord = () => {
    const root = this.state.harmony.keys[Math.floor(Math.random() * 12)];
    const tonality = this.state.harmony.tonality[Math.floor(Math.random() * 7)];
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

  componentDidMount() {
    this.setChord();
  }

  render () {
    return(
      <div className="layout">
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

export default HomePage;