import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { NavLink } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'
import AllStudentsGraph from './AllStudentsGraph'
import SingleStudentGraph from './SingleStudentGraph'
import { fetchAllStudentsWithScoreData } from '../../../store'
import Navbar from '../../Navbar'
import  HeaderSmall  from '../../HeaderSmall'


export class TeacherGraphs extends Component {


  constructor(){
    super()
    this.state = {
      graphToRender: 'all',
      allStudentButtonActive: true
    }
  }

  componentDidMount(){
    this.props.fetchAllStudentsWithScoreData()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.allStudentsGraphData){
      const dataObj = nextProps.allStudentsGraphData;

      const studentIdArray = Object.keys(dataObj)

      this.setState({studentIds: studentIdArray})
    }

  }

  switchGraph = evt => {
    evt.preventDefault();
    this.setState({graphToRender: evt.target.value})
  }

  render(){
    const ids = this.state.studentIds
    const data = this.props.allStudentsGraphData
    const graphToRender = this.state.graphToRender

    return (
      <div>
        <HeaderSmall />
      <div className="Teacher-Navbar">
        <Navbar />
      </div>
      <Container id="graph-page-box">
        <Container id="graphsContainer">
          {
            ids && ids.length &&
            graphToRender === 'all' ?
            <AllStudentsGraph data={data} studentIds={ids} />
            : ids && ids.length && graphToRender !== 'all' &&
            <SingleStudentGraph data={data[graphToRender]} studentId={graphToRender} />
          }
        </Container>
        <div id="graph-menu">
          <Button
            onClick={this.switchGraph}
            active={graphToRender === 'all'}
            value="all">
            All Students
          </Button>
          <h2>Individual Student Graphs:</h2>
          {
            ids && ids.length && ids.map(id => {
              return (
                <Button
                  onClick={this.switchGraph}
                  key={id} value={id}
                  active={graphToRender === id}>
                  {id}
                </Button>
              )
            })
          }
        </div>
      </Container>
      </div>
    )
  }

}

const mapDispatch = {fetchAllStudentsWithScoreData}

const mapState = state => {
  return {
    allStudentsGraphData: state.allStudentsGraphData
  }
}


export default connect(mapState, mapDispatch)(TeacherGraphs)
