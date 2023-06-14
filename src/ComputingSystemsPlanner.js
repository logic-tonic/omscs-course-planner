import React from "react";
import BasicTable from "./BasicTable.js";

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
  "Graduate Introduction to Operating Systems​",
  "Secure Computer Systems",
  "Applied Cryptography",
  "Network Security",
  "Intro to Cyber Physical Systems Security",
  "Embedded Systems Optimization​",
  "Software Architecture and Design",
  "Software Analysis and Testing",
  "Advanced Internet Computing Systems and Applications",
  "Distributed Computing",
  "Network Science",
  "High-Performance Computing",
  "Special Topics: Compilers - Theory and Practice",
  "Special Topics: Systems Issues in Cloud Computing",
  "Special Topics: Quantum Computing"
];

function ComputingSystemsPlanner({ courses, addToCourseList }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <p>Note: Any Core Courses in excess of the 9 hour (3 class) requirement may be used as Computing Systems Electives.</p>
      <h3>Pick two of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h3>Pick one of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Electives</h2>
      <h3>Pick three of:</h3>
      <BasicTable 
        rows={ courses.filter(course => electives.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Free Electives</h2>
      <h3>Pick four of:</h3>
      <BasicTable 
        rows={ courses.filter(course => !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electives).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
    </div>
  );
}

export default ComputingSystemsPlanner;