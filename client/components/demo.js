import firebase from '../../server/firebase'
import React, {Component} from 'react'


export default class Demo extends Component {
  constructor(){
  super()
  this.state = {}
  this.handleMyClick = this.handleMyClick.bind(this)
  }
  handleMyClick(e){
    e.preventDefault();
    const playersRef = firebase.database().ref('players');
    playersRef.push({ 1: 'Jimmy'});

  }

  render(){
    return(
      <button onClick={this.handleMyClick}> Click Me!</button>
    )
  }
}
