import React from 'react'
import { NavBar } from './NavBar.js' // eslint-disable-line
import { APIStuff } from './APIStuff.js' // eslint-disable-line
import { Banner } from './Banner.js' // eslint-disable-line

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <NavBar />
        {/* outershell for the modal created by any of the link in the nav bar */}
        <div className="modal fade" id="NavModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <NavBar />
            </div>
          </div>
        </div>

        {/* main body of the page */}
        <div className="container default">
          <div className="row">
            <div className="col-lg-12">
              <h2 id="title" className="mt-5">My Journal</h2>
              <Banner />
              <APIStuff />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
