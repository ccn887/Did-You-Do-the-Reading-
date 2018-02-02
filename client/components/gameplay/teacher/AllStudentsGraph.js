import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Container } from 'semantic-ui-react'
import { fetchAllStudentsWithScoreData } from '../../../store'


export class AllStudentsGraph extends Component {


  constructor(props){
    super(props)
  }

  // componentDidMount(){
  //   this.props.fetchAllStudentsWithScoreData()
  // }



  render(){


    const bigData = this.props.data

    const idArray = this.props.studentIds

    console.log('data one ', bigData[idArray[0]])
    console.log('data two ', bigData[idArray[1]])

    const dataOne = bigData[idArray[0]]

    const dataTwo = bigData[idArray[1]]

    const colors = [
      "#114B5F",
      "#88D498",
      "#C6DABF",
      "#008080",
      "#F3E9D2",
      "#FFA500",
      "#663399"
    ];

    return (
      <Container>
      <h1 className="graph-title">All Students Scores </h1>
          <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.grayscale}
          >
            <VictoryAxis label="Time (ms)" />
            <VictoryAxis dependentAxis/>
            <VictoryLine
            data={dataOne}
            x="time"
            y="score"
            />
            <VictoryLine
            data={dataTwo}
            x="time"
            y="score"
            />
          </VictoryChart>
      </Container>
    )
  }

}

// const mapDispatch = {fetchAllStudentsWithScoreData}
//
// const mapState = state => {
//   return {
//     allStudentsGraphData: state.allStudentsGraphData
//   }
// }


export default connect(null, null)(AllStudentsGraph)
