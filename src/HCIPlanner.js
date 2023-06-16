import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCourses = [
  "Mobile and Ubiquitous Computing",
  "Human-Computer Interaction"
];
const electivesPartOne = [
  "Video Game Design and Programming",
  "Educational Technology: Conceptual Foundations",
  "Introduction to Cognitive Science"
];
const electivesPartTwo = [
  "Introduction to Health Informatics",
];

function HCIPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h3>Pick two (2) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCourses.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h2>Electives</h2>
      <h3>Pick three (3) courses from the two sub-areas below, including at least one from each sub-area:</h3>
      <h4>Sub-area: Design and evaluation concepts</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h4>Sub-area: Interactive technology</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h2>Free Electives</h2>
      <h3>Pick five (5) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCourses.concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
    </div>
  );
}

export default HCIPlanner;