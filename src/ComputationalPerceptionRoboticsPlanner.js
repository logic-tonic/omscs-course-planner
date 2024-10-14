import React from "react";
import BasicTable from "./BasicTable.js";
import { freeElectives } from "./utils.js";

const coreCoursesPartOne = [
  "Introduction to Graduate Algorithms"
];
const coreCoursesPartTwo = [
  "Artificial Intelligence",
  "Machine Learning"
];
const electivesPartOne = [
  "Computational Photography",
  "Introduction to Computer Vision",
  "Cyber Physical Design and Analysis",
  "Natural Language Processing"
];
const electivesPartTwo = [
  "Artificial Intelligence Techniques for Robotics",
];

function ComputationalPerceptionRoboticsPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h1>Core Courses</h1>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h4 className="count">Picked {selectedCourses.filter(course => coreCoursesPartOne.includes(course.name)).length}</h4>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => coreCoursesPartTwo.includes(course.name)).length}</h5>
      <h1>Electives</h1>
      <h3>Pick three (3) courses from Perception and Robotics, with at least one (1) course from each:</h3>
      <br />
      <h4>Perception</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartOne.includes(course.name)).length}</h5>
      <h4>Robotics</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electivesPartTwo.includes(course.name)).length}</h5>
      <h1>Free Electives</h1>
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

export default ComputationalPerceptionRoboticsPlanner;