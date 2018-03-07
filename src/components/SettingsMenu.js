import React from 'react'
import SettingsModal from './SettingsModal';

class Menu extends React.Component{
  state = {
    active: false,
  };

  handleModal = () => this.setState((prevState) => ({active: !prevState.active}));

  render(){
    return(
      <div>
        { this.state.active ?
          <SettingsModal
            handleModal={this.handleModal}/>
          :
          <button
           onClick={this.handleModal}
           className="menu">
            Menu
          </button>
        }
      </div>
    )
  }
}

export default Menu;