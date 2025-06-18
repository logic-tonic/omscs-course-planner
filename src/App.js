import './App.css';
import Planner from './Planner.js';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <div className="requirements">
          <h2>Overview</h2>
          <p>Welcome! This site helps you plan your course list for Georgia Tech's Online Masters of Science in Computer Science (OMSCS). Data is from the <a href="https://omscs.gatech.edu/current-courses" target="_blank" rel="noreferrer">official OMSCS site</a> and <a href="https://www.omscentral.com/" target='blank' rel="noreferrer">OMSCentral</a> and is regularly updated.
          </p>

          <h2>Important Resources</h2>
          <ul>
            <li><a href="https://omscs.gatech.edu/orientation-documents" target="_blank" rel="noreferrer">Orientation document</a> - Most up-to-date program information</li>
            <li><a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRyHrRhH2V52bsYFEtm-8oJDaFOlyGYz6AKXm8WwsthN3fNP3KGkEx7O7D9ZHV3j2iKnzU2XHqoh4pQ/pubhtml" target="_blank" rel="noreferrer">Course availability</a></li>
            <li><a href="https://really.omscs.rocks/" target="_blank" rel="noreferrer">Course availability with frozen headers</a></li>
            <li><a href="https://registrar.gatech.edu/current-students/calendars" target="_blank" rel="noreferrer">Academic calendar</a></li>
            <li>The degree worksheets <a href="https://www.cc.gatech.edu/graduate-forms-procedures" target="_blank" rel="noreferrer">here</a> and <a href="https://degreeaudit.gatech.edu/" target="_blank" rel="noreferrer">here</a></li>
          </ul>

          <p><b>Note:</b> OMSCS offers one credit-hour <a href="https://omscs.gatech.edu/cs-8001-seminars" target="_blank" rel="noreferrer">seminars</a> that don't count towards graduation requirements. These are not listed below but instead emailed to you during registration.</p>

          <h2>Degree requirements</h2>
          <p>All requirements below are from either the official <a href="https://omscs.gatech.edu/degree-requirements" target="_blank" rel="noreferrer">degree requirements</a> or the official <a href="https://omscs.gatech.edu/admission-criteria" target="_blank" rel="noreferrer">admission criteria</a>.</p>
          <ul>
            <li>The OMSCS degree requires students to complete the requirements of one <a href="https://omscs.gatech.edu/specializations" target="_blank" rel="noreferrer">specialization</a>. Specializations each require 15 to 18 credit hours, and a grade of B or above is required for all courses fulfilling specialization requirements. The remaining 12-15 hours (4-5 courses) are “free” electives and can be any courses offered through the OMSCS program. </li>
            <li>The OMSCS degree requires students to complete 30 total credit hours (10 courses). A grade of C or above is required for a course to count toward this 30 credit-hour requirement. Students may take any free elective courses offered through the OMSCS program to complete the 30 credit-hour requirement beyond the requirements of their specialization. A maximum of 6 credit hours may be taken with a subject code other than CS or CSE.</li>
            <li>A cumulative GPA of 3.0 is required to graduate.</li>
            <li>To be able to continue in the program after the first 12 months from your date of matriculation, you must complete a foundational coursework requirement of 2 courses with a grade of B or better.</li>
          </ul>
        </div>
        <Planner />
      </div>
    </div>
  );
}

export default App;
