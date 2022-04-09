import React from 'react'
import Navigation from './components/navigation'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Posts, About, Login } from './pages/'

function App () {
    return (
        <Router>
            <div>
                <Navigation />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/posts" component={Posts} />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={Login} />
                    {/* <Route page='/:page' component={PageRendered} />
            <Route page='/' render={() => <Redirect to="/home" />} />
            <Route component={() => 404} /> */}
                </Switch>
            </div>
        </Router>
    )
}

export default App
