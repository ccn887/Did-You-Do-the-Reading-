import React from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Container, Message } from 'semantic-ui-react'



export default function SingleStudentGraph(props){
  const data = props.data.data.sort((a, b) => {
    return a.date < b.date ? -1 : 1
  })

  console.log(data)

  const studentId = props.studentId


  return (
    <Container className="inner-graph-container">
    <h1 className="graph-title">Scores for {props.data.email}</h1>
      {
        data.length > 1 ?
        <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.grayscale}
        >
          <VictoryAxis label="quizzes in chronological order"
            tickFormat={(t) => `#${t}`}/>
          <VictoryAxis dependentAxis
          tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}/>
          <VictoryLine
          data={data}
          x="game"
          y="score"
          />
        </VictoryChart>
        :
        <Message color="teal">
          <h2 id="not-enough-data-warning">not enough data to show a graph for this student</h2>
        </Message>
      }

    </Container>
  )
}
