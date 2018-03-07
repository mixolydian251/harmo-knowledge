import React from 'react'

class AttemptNotes extends React.Component{
  state = {
    root: '',
    third: '',
    fifth: '',
    seventh: '',
  };

  handleRoot = (e) => {
    e.preventDefault();
    let text = e.target.value;
    this.setState({root: text})
  };

  handleThird = (e) => {
    e.preventDefault();
    let text = e.target.value;
    this.setState({third: text})
  };

  handleFifth = (e) => {
    e.preventDefault();
    let text = e.target.value;
    this.setState({fifth: text})
  };

  handleSeventh = (e) => {
    e.preventDefault();
    let text = e.target.value;
    this.setState({seventh: text})
  };

  checkAnswer = () => {
    this.props.checkAnswer(this.state)
  };

  nextChord = () => {
    this.setState({
      root: '',
      third: '',
      fifth: '',
      seventh: '',
    });
    this.props.nextChord()
  };

  render(){
    return(
      <div className="attempt">
        <div className="attempt__inputContainer">

          <div className="attempt__input">
            <p className="attempt__input--label">Root</p>
            <input
              className="attempt__area"
              placeholder="1"
              value={this.state.root}
              onChange={this.handleRoot}/>
            {this.props.feedback &&
            <div style={feedbackColor(this.props.feedback.root)}>
              <p className="attempt__input--answer">
                {this.props.answer.root}
              </p>
              <p className="attempt__input--feedback">
                {this.props.feedback.root}
              </p>
            </div>
            }
          </div>

          <div className="attempt__input">
            <p className="attempt__input--label">Third</p>
            <input
              className="attempt__area"
              placeholder="3"
              value={this.state.third}
              onChange={this.handleThird}/>
            {this.props.feedback &&
            <div style={feedbackColor(this.props.feedback.third)}>
              <p className="attempt__input--answer">
                {this.props.answer.third}
              </p>
              <p className="attempt__input--feedback">
                {this.props.feedback.third}
              </p>
            </div>
            }
          </div>

          <div className="attempt__input">
            <p className="attempt__input--label">Fifth</p>
            <input
              className="attempt__area"
              placeholder="5"
              value={this.state.fifth}
              onChange={this.handleFifth}/>
            {this.props.feedback &&
            <div style={feedbackColor(this.props.feedback.fifth)}>
              <p className="attempt__input--answer">
                {this.props.answer.fifth}
              </p>
              <p className="attempt__input--feedback">
                {this.props.feedback.fifth}
              </p>
            </div>
            }
          </div>

          {this.props.answer.seventh &&
          <div className="attempt__input">
            <p className="attempt__input--label">Seventh</p>
            <input
              className="attempt__area"
              placeholder="7"
              value={this.state.seventh}
              onChange={this.handleSeventh}/>
            {this.props.feedback &&
            <div style={feedbackColor(this.props.feedback.seventh)}>
              <p className="attempt__input--answer">
                {this.props.answer.seventh}
              </p>
              <p className="attempt__input--feedback">
                {this.props.feedback.seventh}
              </p>
            </div>
            }
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

export default AttemptNotes;

const feedbackColor = (attempt) => {
  return {
    color: attempt === 'Nice!' ? '#16c000' : '#FF585F'
  }
};

