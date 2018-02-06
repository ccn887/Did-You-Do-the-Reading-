import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import history from '../history'
import { Button } from 'semantic-ui-react'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Navbar = (props) => {
  const {handleClick, isLoggedIn} = props

  return (
    <div className="Nav-style">
      <nav>
        {
            history.location.pathname === '/' || history.location.pathname === '/home' ?
            <a href="#" onClick={handleClick}><Button color="black">Logout</Button></a>
            :
            <div>
            <Link to="/home"><Button color="black">Home</Button></Link>
            <a href="#" onClick={handleClick}><Button color="black">Logout</Button></a>
            </div>
        }
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
