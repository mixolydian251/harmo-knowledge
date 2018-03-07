import React from 'react';

class SettingsModal extends React.Component {

  handleModal = () => {
    this.props.handleModal();
  };

  render() {
    return (
      <div className="modal">
        {/*<form>*/}
          {/*<p>Triads</p>*/}
          {/*<input type="checkbox" name="Major" value="Major"> Major </input>*/}
          {/*<input type="checkbox" name="Minor" value="Minor"> Minor </input>*/}
          {/*<input type="checkbox" name="Diminished" value="Diminished"> Diminished </input>*/}
          {/*<p>Seventh Cords</p>*/}
          {/*<input type="checkbox" name="Major7" value="Major7"> Major 7 </input>*/}
          {/*<input type="checkbox" name="Minor7" value="Minor7"> Minor 7 </input>*/}
          {/*<input type="checkbox" name="Dominant" value="Dominant"> Dominant 7 </input>*/}
          {/*<input type="checkbox" name="Minor7b5" value="Minor7b5"> Minor 7b5 </input>*/}
        {/*</form>*/}
        <button className="modal__button"
          onClick={this.handleModal}>Close</button>
      </div>
    )
  }
}

export default SettingsModal