import './App.css';
import Planner from './Planner.js';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <details className="section-intro">
          <summary>Program Info & Degree Requirements</summary>
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
          <h2>Degree requirements</h2>
          <p>All requirements below are from either the official <a href="https://omscs.gatech.edu/degree-requirements" target="_blank" rel="noreferrer">degree requirements</a> or the official <a href="https://omscs.gatech.edu/admission-criteria" target="_blank" rel="noreferrer">admission criteria</a>.</p>
          <ul>
            <li>The OMSCS degree requires students to complete the requirements of one <a href="https://omscs.gatech.edu/specializations" target="_blank" rel="noreferrer">specialization</a>. Specializations each require 15 to 18 credit hours, and a grade of B or above is required for all courses fulfilling specialization requirements. The remaining 12-15 hours (4-5 courses) are "free" electives and can be any courses offered through the OMSCS program. A grade of C or above is required for free electives.</li>
            <li>The OMSCS degree requires students to complete 30 total credit hours (10 courses). A maximum of 6 credit hours may be taken at the 4000-level and/or with a subject code other than CS or CSE.</li>
            <li>A cumulative GPA of 3.0 is required to graduate.</li>
            <li>To be able to continue in the program after the first 12 months (3 consecutive semesters) from your date of matriculation, you must complete a foundational coursework requirement of 2 courses with a grade of B or better. New students are restricted to foundational courses only until this requirement is met.</li>
            <li>Students must complete the degree within 6 years of matriculation.</li>
            <li>New students are strongly recommended to start with only one class. Maximum enrollment is 7 credit hours in Fall/Spring and 5 credit hours in Summer.</li>
            <li>Students may take up to 2 consecutive semesters off (summer counts as a semester). Sitting out 3 or more consecutive semesters requires applying for readmission with no guarantee of being readmitted. Note: withdrawing (receiving a "W") counts as enrollment for that semester, but dropping a course does not.</li>
          </ul>


          <p><b>Note:</b> OMSCS periodically offers seminars as CS8001 sections. They are one credit hour, graded pass/fail or audit, and do not count toward foundational or graduation requirements. Registration follows the standard process (time tickets, priority, and wait lists), and specific offerings for each semester are announced to the omscs-official email list during Phase II registration. For a history of past seminars, see the <a href="https://omscs.gatech.edu/cs-8001-seminars" target="_blank" rel="noreferrer">Seminars page</a>. Note that seminars are not included in the course list below. After a trial of non-credit seminars through Georgia Tech Professional Education, the program has returned to CS8001 seminars; GTPE may still be used for other non-credit offerings in the future.</p>

          <p><b>Note:</b> OMSCS students can pursue <a href="https://omscs.gatech.edu/research-opportunities" target="_blank" rel="noreferrer">research opportunities</a> beyond the standard course list. <a href="https://vip.gatech.edu/" target="_blank" rel="noreferrer">Vertically Integrated Projects (VIP)</a> courses count as free electives only—they cannot fulfill specialization or foundational requirements, and because they use the "VIP" subject code, they count toward the 6-hour non-CS/CSE and/or 4000-level limit. Contact the <a href="https://vip.gatech.edu/contact" target="_blank" rel="noreferrer">VIP program directly</a> for more info. CS 8903 is a faculty-approved, letter-graded, typically 3-credit independent project that counts as a free elective (not foundational, not non-CS/CSE). Research projects are emailed out before each semester, and you can apply via <a href="https://buzzme.cc.gatech.edu/" target="_blank" rel="noreferrer">Buzzme</a>.</p>

        </details>
        <Planner />
      </div>
    </div>
  );
}

export default App;
