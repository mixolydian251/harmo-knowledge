import React from 'react';

const DisplayQuestion = (props) => {
  return (
  <div>
    {props.mode === 'chord' ?
      <div className="chord">
        <h1 className="chord__text">
          {props.unicode(props.root)} {props.tonality}
        </h1>
        <p className="chord__subtext">( Answer in {props.semitone} )</p>
      </div>
      :
      <div className="notes">
        <h1 className="notes__note">{props.notes.root && props.unicode(props.notes.root)}</h1>
        <h1 className="notes__note">{props.notes.third && props.unicode(props.notes.third)}</h1>
        <h1 className="notes__note">{props.notes.fifth && props.unicode(props.notes.fifth)}</h1>
        {props.notes.seventh &&
        <h1 className="notes__note">{props.notes.seventh && props.unicode(props.notes.seventh)}</h1>
        }
      </div>
    }
  </div>
  )
};


export default DisplayQuestion