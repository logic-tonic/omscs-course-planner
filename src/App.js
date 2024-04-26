import './App.css';
import Planner from './Planner.js';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <div className="requirements">
          <p>Welcome! This site helps you plan your course list for the Online Masters of Science in Computer Science (OMSCS) from Georgia Tech.</p>
          <p>All data comes from <a href="https://www.omscentral.com/" target='blank' rel="noreferrer">OMSCentral</a> and the <a href="https://omscs.gatech.edu/current-courses" target="_blank" rel="noreferrer">Official OMSCS site</a>.
          The list of courses and specialization requirements was last updated on March 14, 2024.
          When you select a course, it appears in your constructed plan at the very bottom of the page.
          After selecting courses, you can check their availabilities at <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRyHrRhH2V52bsYFEtm-8oJDaFOlyGYz6AKXm8WwsthN3fNP3KGkEx7O7D9ZHV3j2iKnzU2XHqoh4pQ/pubhtml" target="_blank" rel="noreferrer">omscs.rocks</a>.</p>

          Check your orientation document for the most up-to-date information! For example, this is the <a href="http://doc.omscs.rocks/" target="_blank" rel="noreferrer">latest orientation document</a>.
          There are also degree worksheets provided <a href="https://www.cc.gatech.edu/graduate-forms-procedures" target="_blank" rel="noreferrer">here</a> and <a href="https://degreeaudit.gatech.edu/" target="_blank" rel="noreferrer">here</a>. 
          <h2>Degree requirements:</h2>
          <ul>
            <li>"The OMS CS degree requires 30 hours (10 courses).  Students must declare one specialization, which, depending on the specialization, is 15-18 hours (5-6 courses). The remaining 12-15 hours (4-5 courses) are 'free' electives and can be any courses offered through the OMS CS program." (<a href="https://omscs.gatech.edu/specializations" target="_blank" rel="noreferrer">Official OMSCS site</a>)</li>
            <li>"To be able to continue in the program after the first 12 months from your date of matriculation, you must complete a foundational coursework requirement of 2 courses with a grade of B or better." (<a href="https://omscs.gatech.edu/current-courses" target="_blank" rel="noreferrer">Official OMSCS site</a>)</li>
          </ul>
        </div>
        <Planner />
      </div>
    </div>
  );
}

export default App;
