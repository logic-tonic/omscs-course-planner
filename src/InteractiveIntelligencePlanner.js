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
  "Machine Learning"
];
const electivesPartOne = [
  "Introduction to Health Informatics",
  "Educational Technology: Conceptual Foundations",
  "AI, Ethics, and Society",
  "Human-Computer Interaction"
];
const electivesPartTwo = [
  "Introduction to Computer Vision",
  "Game Artificial Intelligence",
  "Deep Learning",
  "Natural Language Processing"
];
const electivesPartThree = [
    "Introduction to Cognitive Science",
];

function InteractiveIntelligencePlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h1>Interactive Intelligence</h1>
      <h2>Core Courses</h2>
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
      <h2>Electives</h2>
      <h3>Pick two (2) courses from the three (3) sections below:</h3>
      <br/>
      <h4>Interaction:</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartOne.includes(course.name)).length}</h5>
      <h4>AI Methods:</h4>
      <BasicTable
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartTwo.includes(course.name)).length}</h5>
      <h4>Cognition:</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartThree.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartThree.includes(course.name)).length}</h5>
      <h2>Free Electives</h2>
      <h3>Pick five (5) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electivesPartOne).concat(electivesPartTwo).concat(electivesPartThree).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electivesPartOne).concat(electivesPartTwo).concat(electivesPartThree).includes(course.name)).length}</h5>
    </div>
  );
}

export default InteractiveIntelligencePlanner;