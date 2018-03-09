import React from 'react';

class AttemptChord extends React.Component{
  state = {
    root: '',
    tonality: ''
  };

  rootChange = (e) => {
    const root = e.target.value;
    this.setState({root})
  };

  tonalityChange = (e) => {
    const tonality = e.target.value;
    this.setState({tonality})
  };

  checkAnswer = () => {
    this.props.checkAnswer(this.state)
  };

  nextChord = () => {
    this.setState({
      root: '',
      tonality: ''
    });
    this.props.nextChord()
  };

  render(){

    return(
      <div className="attempt">
        <div className="attempt__chordContainer">

          <div className="attempt__chordContainer--select">
            <select className="attempt__select"
                    value={this.state.root}
                    onChange={this.rootChange}>
              <option value="">Select a Root</option>
              <option value="A">{'A'}</option>
              <option value="Bb">{'A\u266f / B\u266d'}</option>
              <option value="B">{'B'}</option>
              <option value="C">{'C'}</option>
              <option value="Db">{'C\u266f / D\u266d'}</option>
              <option value="D">{'D'}</option>
              <option value="Eb">{'D\u266f / E\u266d'}</option>
              <option value="E">{'E'}</option>
              <option value="F">{'F'}</option>
              <option value="F#">{'F\u266f / G\u266d'}</option>
              <option value="G">{'G'}</option>
              <option value="Ab">{'G\u266f / A\u266d'}</option>
            </select>


            <select className="attempt__select"
                    value={this.state.tonality}
                    onChange={this.tonalityChange}>
              <option value="">Select a Tonality</option>
              <option value="maj">Major</option>
              <option value="min">Minor</option>
              <option value="dim">Diminished</option>
              <option value="maj7">Major 7</option>
              <option value="7">Dominant 7</option>
              <option value="min7">Minor 7</option>
              <option value="m7b5">{'Minor 7\u266d5'}</option>
            </select>
          </div>

          {
            this.props.feedback &&
            <div className="attempt__feedback" style={feedbackColor(this.props.feedback.chord)}>
              <h2 className="attempt__feedback--text">{this.props.feedback.chord}</h2>
              <h1 className="attempt__feedback--chord">{`${this.props.unicode(this.props.answer.root)} ${this.props.answer.tonality}`}</h1>
            </div>
          }

        </div>



        <div className="attempt__buttonContainer">
          <button onClick={this.checkAnswer} className="attempt__button attempt__button__check">
            Check Answer
          </button>

          <button onClick={this.nextChord} className="attempt__button attempt__button__next">
            Next Chord
          </button>
        </div>

      </div>
    )
  }
}

export default AttemptChord;

const feedbackColor = (attempt) => {
  return {
    color: attempt === 'Great Job!' ? '#16c000' : '#FF585F'
  }
};