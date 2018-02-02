import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Container } from 'semantic-ui-react'
import AllStudentsGraph from './AllStudentsGraph'
import { fetchAllStudentsWithScoreData } from '../../../store'


export class TeacherGraphs extends Component {


  constructor(){
    super()
    this.state = {
      studentIds: []
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

  render(){
    this.props.allStudentsGraphData && console.log(Object.keys(this.props.allStudentsGraphData))
    const ids = this.state.studentIds
    const data = this.props.allStudentsGraphData
    console.log('IDS', ids)
    return (
      <Container id="graph-page-box">
        <Container id="graphsContainer">

          <AllStudentsGraph data={data} studentIds={ids} />

        </Container>
        <div id="graph-menu">
          <h2>Individual Student Graphs:</h2>
          {
            ids.length && ids.map(id => {
              return (
                <h2 key={id}>{id}</h2>
              )
            })
          }
        </div>
      </Container>
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
