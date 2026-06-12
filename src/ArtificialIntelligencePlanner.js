import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCoursesPartOne = [
  "Software Development Process",
  "Introduction to Graduate Algorithms"
];
const coreCoursesPartTwo = [
  "Artificial Intelligence",
  "Knowledge-Based AI",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Introduction to Computer Vision"
];
const electivesPartOne = [
  "Game Artificial Intelligence"
];
const electivesPartTwo = [
  "Introduction to Cognitive Science",
  "AI, Ethics, and Society",
  "Educational Technology: Conceptual Foundations",
  "Human-Computer Interaction",
  "Introduction to Health Informatics"
];

function ArtificialIntelligencePlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h2>Core Courses (9 hours)</h2>
      <h5>Note: Any core courses in excess of the 9 hour requirement may be used as electives.</h5>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => coreCoursesPartOne.includes(course.name)).length}</h5>
      <h3>Pick two (2) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => coreCoursesPartTwo.includes(course.name)).length}</h5>
      <h2>Electives (6 hours)</h2>
      <h3>Pick two (2) courses from the two (2) sections below:</h3>
      <h4>AI Methods:</h4>
      <BasicTable
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartOne.includes(course.name)).length}</h5>
      <h4>Cognition, Ethics, and Human-Centered AI:</h4>
      <BasicTable
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartTwo.includes(course.name)).length}</h5>
      <h2>Free Electives (15 hours)</h2>
      <h3>Pick five (5) free electives.</h3>
      <h4>Free electives may be any courses offered through the OMSCS program. If you take extra specialization core courses and/or extra specialization elective courses beyond what is required in your chosen specialization, the extra course(s) can be used only towards the "free" electives.</h4>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)).length}</h5>
    </div>
  );
}

export default ArtificialIntelligencePlanner;