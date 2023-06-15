import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCoursesPartOne = [
  "Introduction to Graduate Algorithms",
];
const coreCoursesPartTwo = [
  "Machine Learning",
];
const electives = [
  "Introduction to Computer Vision",
  "AI, Ethics, and Society",
  "Network Science: Methods and Applications",
  "Reinforcement Learning and Decision Making",
  "Deep Learning",
  "Machine Learning for Trading",
  "Natural Language",
  "Data and Visual Analytics",
  "Big Data Analytics for Healthcare",
  "Introduction to Theory and Practice of Bayesian Statistics",
];

function MachineLearningPlanner({ courses, addToCourseList }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Electives</h2>
      <h3>Pick three (3) of:</h3>
      <h5>NOTE: <a href="https://omscs.gatech.edu/cs-7650-natural-language-processing" target="_blank" rel="noreferrer">Natural Language Processing</a> should also be on this list. It will be automatically appear here when it's added to OMSCentral.</h5>
      <BasicTable 
        rows={ courses.filter(course => electives.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Free Electives</h2>
      <h3>Pick five (5) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electives).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
    </div>
  );
}

export default MachineLearningPlanner;