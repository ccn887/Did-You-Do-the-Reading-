/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as MakeQuiz} from './MakeQuiz';
export {default as AllQuestions} from './AllQuestions';
export {default as TeacherWaitingRoom} from './gameplay/teacher/Teacher_WaitingRoom';
export {default as TeacherDashboard} from './gameplay/teacher/Teacher_Dashboard';
export {default as StudentJoinGame} from './gameplay/student/Student_JoinGame';
export {default as StudentWaitingRoom} from './gameplay/student/Student_WaitingRoom';
export {default as TeacherSingleQuestion} from './gameplay/teacher/Teacher_SingleQuestion';
export {default as TeacherAnswerReveal} from './gameplay/teacher/Teacher_AnswerReveal';
export {default as StudentSingleQuestion} from './gameplay/student/Student_SingleQuestion';
export {default as StudentAnswerReveal} from './gameplay/student/Student_AnswerReveal';
export {default as Leaderboard} from './Leaderboard'
export {default as Home} from './Home';
