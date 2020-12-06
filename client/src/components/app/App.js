import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import Header from './components/header/Header'

export default class App extends Component {
  render() {

    return (
      <ForumServiceProvider value={this.state.swapiService} >
        <Router>
          <div className="forum-app">
            <Header />

            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/user/:id" component={UserPage} />
              <Route path="/post/:id" component={PostPage} />

              <Route render={() => <h2>Page not found</h2>} />
            </Switch>

          </div>
        </Router>
      </ForumServiceProvider>
    );
  }
}

export default App;
