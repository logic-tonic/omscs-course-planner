import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCourses = [
  "Mobile and Ubiquitous Computing",
  "Human-Computer Interaction"
];
const electivesPartOne = [
  "Digital Health Equity",
  "Video Game Design and Programming",
  "Educational Technology: Conceptual Foundations",
  "Introduction to Cognitive Science"
];
const electivesPartTwo = [
  "Introduction to Health Informatics",
  "Game Artificial Intelligence"
];

function HCIPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h1>Core Courses</h1>
      <h3>Pick two (2) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCourses.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => coreCourses.includes(course.name)).length}</h5>
      <h1>Electives</h1>
      <h3>Pick three (3) courses from the two sub-areas below, including at least one from each sub-area:</h3>
      <h4>Sub-area: Design and evaluation concepts</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartOne.includes(course.name)).length}</h5>
      <h4>Sub-area: Interactive technology</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartTwo.includes(course.name)).length}</h5>
      <h1>Free Electives</h1>
      <h3>Pick five (5) free electives.</h3>
      <h4>Free electives may be any courses offered through the OMSCS program. If you take extra specialization core courses and/or extra specialization elective courses beyond what is required in your chosen specialization, the extra course(s) can be used only towards the "free" electives.</h4>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCourses.concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => freeElectives.includes(course.name) && !coreCourses.concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)).length}</h5>
    </div>
  );
}

export default HCIPlanner;