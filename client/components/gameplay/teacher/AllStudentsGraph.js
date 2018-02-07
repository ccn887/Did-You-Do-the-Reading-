import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Container } from 'semantic-ui-react'
import  HeaderSmall  from '../../HeaderSmall'


export default function AllStudentsGraph(props){
  const bigData = props.data

  const idArray = props.studentIds
  let counter = 0;


  console.log("from all student graphs: ", bigData)

  return (
    <Container className="inner-graph-container">
    <h1 className="graph-title">All Students Scores </h1>
        <VictoryChart domainPadding={20} theme={VictoryTheme.grayscale}>
          <VictoryAxis label="time"
            tickFormat={(t) => ``}/>
          <VictoryAxis dependentAxis
            tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />

          {
            idArray && idArray.map(studentId => {
              return (
                <VictoryLine
                key={studentId}
                data={bigData[studentId].data.sort((a, b) => {
                  return a.date < b.date ? -1 : 1
                })}
                x="game"
                y="score"
                />
              )
            })
          }
        </VictoryChart>
    </Container>
  )
}
