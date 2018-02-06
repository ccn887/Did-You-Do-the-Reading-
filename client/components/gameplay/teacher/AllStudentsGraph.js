import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Container } from 'semantic-ui-react'


export default function AllStudentsGraph(props){
  const bigData = props.data

  const idArray = props.studentIds


  console.log("from all student graphs: ", bigData)

  return (
    <Container>
    <h1 className="graph-title">All Students Scores </h1>
        <VictoryChart domainPadding={20} theme={VictoryTheme.grayscale}>
          <VictoryAxis label="days"
            tickValues={[43, 44, 45, 46, 47, 48, 49, 50]} />
          <VictoryAxis dependentAxis
            tickValues={[0, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />

          {
            idArray && idArray.map(studentId => {
              return (
                <VictoryLine
                key={studentId}
                data={bigData[studentId].data}
                x="date"
                y="score"
                />
              )
            })
          }
        </VictoryChart>
    </Container>
  )
}
