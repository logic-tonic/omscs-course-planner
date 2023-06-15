import React from "react";
import BasicTable from "./BasicTable.js";

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

function InteractiveIntelligencePlanner({ courses, addToCourseList }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h3>Pick two (2) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Electives</h2>
      <h3>Pick two (2) courses from the three (3) sections below:</h3>
      <br/>
      <h4>Interaction:</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h4>AI Methods:</h4>
      <h5>NOTE: <a href="https://omscs.gatech.edu/cs-7650-natural-language-processing" target="_blank" rel="noreferrer">Natural Language Processing</a> should also be on this list. It will automatically appear here when it's added to OMSCentral.</h5>
      <BasicTable
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h4>Cognition:</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartThree.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Free Electives</h2>
      <h3>Pick five (5) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
    </div>
  );
}

export default InteractiveIntelligencePlanner;