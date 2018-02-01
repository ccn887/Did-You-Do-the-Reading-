import React, {Component} from 'react'
import history from '../history'

export default class Header extends Component {


  navigate(e){
    e.preventDefault();
    history.push('/')
  }

  render() {
    return(
      <div className="headerwithlogo">
        <img id="logo" src="/images/dydtrlogo.png" onClick={this.navigate} />
      </div>
    )
  }
}
