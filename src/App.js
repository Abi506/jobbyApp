import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './component/LoginForm'
import ProtectedRoute from './component/ProtectedRoute'
import Home from './component/Home'
import Jobs from './component/Jobs'
import JobItem from './component/JobItem'
import NotFound from './component/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
