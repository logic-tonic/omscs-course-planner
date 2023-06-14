import React from "react";
import BasicTable from "./BasicTable.js";

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
  "Natural Language"
];
const electivesPartTwo = [
  "Artificial Intelligence Techniques for Robotics",
];

function ComputationalPerceptionRoboticsPlanner({ courses, addToCourseList }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h3>Pick one of:</h3>
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
      <h3>Pick three (3) courses from Perception and Robotics, with at least one (1) course from each.</h3>
      <h4>Perception</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h4>Robotics</h4>
      <BasicTable 
        rows={ courses.filter(course => electivesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
      <h2>Free Electives</h2>
      <h3>Pick five of:</h3>
      <BasicTable 
        rows={ courses.filter(course => !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electivesPartOne).concat(electivesPartTwo).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
      />
    </div>
  );
}

export default ComputationalPerceptionRoboticsPlanner;