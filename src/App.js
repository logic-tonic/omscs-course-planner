import './App.css';
import Planner from './Planner.js';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <div className="requirements">
          <h2>Degree requirements:</h2>
          <ul>
            <li>"The OMS CS degree requires 30 hours (10 courses).  Students must declare one specialization, which, depending on the specialization, is 15-18 hours (5-6 courses). The remaining 12-15 hours (4-5 courses) are “free” electives and can be any courses offered through the OMS CS program." (<a href="https://omscs.gatech.edu/program-info/specializations" target="_blank" rel="noreferrer">Official OMSCS site</a>)</li>
            <li>"To be able to continue in the program after the first 12 months from your date of matriculation, you must complete a foundational coursework requirement of 2 courses with a grade of B or better." (<a href="https://omscs.gatech.edu/current-courses" target="_blank" rel="noreferrer">Official OMSCS site</a>)</li>
          </ul>
          <p>All data comes from <a href="https://www.omscentral.com/" target='blank' rel="noreferrer">OMSCentral</a> and the <a href="https://omscs.gatech.edu/program-info/specializations" target="_blank" rel="noreferrer">Official OMSCS site</a>. Set of classes last updated June 2023.</p>
        </div>
        <Planner />
      </div>
    </div>
  );
}

export default App;
