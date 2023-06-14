import React from "react";
import BasicTable from "./BasicTable.js";

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
  "Mobile and Ubiquitous Computing",
];

function HCIPlanner({ courses, addToCourseList }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h3>Pick two of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCourses.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Electives</h2>
      <h3>Pick three (3) courses from the two sub-areas below, including at least one from each sub-area:</h3>
      <h4>Sub-area: Design and evaluation concepts</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h4>Sub-area: Interactive technology</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Free Electives</h2>
      <h3>Pick five of:</h3>
      <BasicTable 
        rows={ courses.filter(course => !coreCourses.concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
    </div>
  );
}

export default HCIPlanner;