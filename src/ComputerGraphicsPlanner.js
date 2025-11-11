import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCoursesPartOne = [
  "Foundations of Computer Graphics",
  "Video Game Design and Programming",
  "Computer Animation",
];

const coreCoursesPartTwo = [
  "Introduction to Graduate Algorithms",
];

const electives = [
  "Video Game Design and Programming",
  "Computational Photography",
  "Introduction to Computer Vision",
  "Foundations of Computer Graphics",
  "Computer Animation",
]


function ComputerGraphicsPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h3>Pick one (1) of: </h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h4 className="count">Picked {selectedCourses.filter(course => coreCoursesPartOne.includes(course.name)).length}</h4>
      <h3>Pick one (1) of: </h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h4 className="count">Picked {selectedCourses.filter(course => coreCoursesPartTwo.includes(course.name)).length}</h4>
      <h2>Electives</h2>
      <h3>Pick three (3) of: </h3>
      <BasicTable 
        rows={ courses.filter(course => electives.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h4 className="count">Picked {selectedCourses.filter(course => electives.includes(course.name)).length}</h4>
      <h2>Free Electives</h2>
      <h3>Pick five (5) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electives).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electives).includes(course.name)).length}</h5>
    </div>
  );
}

export default ComputerGraphicsPlanner;