import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCourses = [
  "Foundations of Computer Graphics",
  "Video Game Design and Programming",
  "Introduction to Graduate Algorithms",
  "Computational Photography",
  "Introduction to Computer Vision",
];

function ComputerGraphicsPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h1>Core Courses + Electives</h1>
      <h4>This is a simplified view of the information on the <a href="https://omscs.gatech.edu/specialization-computer-graphics" target="_blank" rel="noreferrer">CG specialization page</a>.</h4>
      <h3>Pick five (5) of: </h3>
      <BasicTable 
        rows={ courses.filter(course => coreCourses.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h4 className="count">Picked {selectedCourses.filter(course => coreCourses.includes(course.name)).length}</h4>
      <h1>Free Electives</h1>
      <h3>Pick five (5) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCourses.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => freeElectives.includes(course.name) && !coreCourses.includes(course.name)).length}</h5>
    </div>
  );
}

export default ComputerGraphicsPlanner;