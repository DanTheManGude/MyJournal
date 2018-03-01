import React, { Component } from 'react';
import { NavBar } from './NavBar.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        {/*outershell for the modal created by any of the link in the nav bar*/}
        <div className="modal fade" id="NavModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
                <NavBar />
            </div>
          </div>
        </div>

        {/*main body of the page*/}
        <div className="container default">
          <div className="row">
            <div className="col-lg-12">
              <h2 id="title" className="mt-5">Welcome to MyJournal</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
