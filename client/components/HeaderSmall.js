import React, {Component} from 'react'
import history from '../history'

export default class HeaderSmall extends Component {


  navigate(e){
    e.preventDefault();
    history.push('/')
  }

  render() {
    return(
      <div className="headerwithlogo-small-version">
        <img id="logo-small" src="/images/dydtrlogo.png" onClick={this.navigate} />
      </div>
    )
  }
}
