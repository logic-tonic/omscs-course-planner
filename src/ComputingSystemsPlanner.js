import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCoursesPartOne = [
  "Advanced Operating Systems",
  "Computer Networks",
  "High-Performance Computer Architecture",
  "Software Development Process",
  "Database Systems Concepts and Design"
];
const coreCoursesPartTwo = [
  "Introduction to Graduate Algorithms"
];
const electives = [
  "Introduction to Information Security",
  "Graduate Introduction to Operating Systems",
  "Secure Computer Systems",
  "Applied Cryptography",
  "Network Security",
  "Introduction to Cyber-Physical Systems Security",
  "Embedded Systems Optimization",
  "Software Architecture and Design",
  "Advanced Topics in Software Analysis and Testing",
  "Advanced Internet Computing Systems and Applications",
  "Distributed Computing",
  "Network Science: Methods and Applications",
  "High Performance Computing",
  "Special Topics: Compilers - Theory and Practice",
  "Special Topics: Systems Design for Cloud Computing",
  "Special Topics: Quantum Computing",
  "Special Topics: GPU Hardware and Software"
];

function ComputingSystemsPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h5>Note: Any Core Courses in excess of the 9 hour (3 class) requirement may be used as Computing Systems Electives.</h5>
      <h3>Pick two (2) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h2>Electives</h2>
      <h3>Pick three (3) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => electives.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h2>Free Electives</h2>
      <h3>Pick four (4) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electives).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
    </div>
  );
}

export default ComputingSystemsPlanner;