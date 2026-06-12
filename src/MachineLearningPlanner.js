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
  "Artificial Intelligence",
  "AI, Ethics, and Society",
  "Network Science: Methods and Applications",
  "Reinforcement Learning and Decision Making",
  "Deep Learning",
  "Game Artificial Intelligence",
  "Knowledge-Based AI",
  "Machine Learning for Trading",
  "Natural Language Processing",
  "Data and Visual Analytics",
  "Big Data Analytics for Healthcare",
  "Introduction to Theory and Practice of Bayesian Statistics",
];

function MachineLearningPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h2>Core Courses (6 hours)</h2>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <p className="count">Picked {selectedCourses.filter(course => coreCoursesPartOne.includes(course.name)).length}</p>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <p className="count">Picked {selectedCourses.filter(course => coreCoursesPartTwo.includes(course.name)).length}</p>
      <h2>Electives (9 hours)</h2>
      <p className="note">Note: Elective ML courses must have at least 1/3 of their graded content based on Machine Learning.</p>
      <h3>Pick three (3) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => electives.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <p className="count">Picked {selectedCourses.filter(course => electives.includes(course.name)).length}</p>
      <h2>Free Electives (15 hours)</h2>
      <h3>Pick five (5) free electives.</h3>
      <h4>Free electives may be any courses offered through the OMSCS program. If you take extra specialization core courses and/or extra specialization elective courses beyond what is required in your chosen specialization, the extra course(s) can be used only towards the "free" electives.</h4>
      <BasicTable 
        rows={ courses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electives).includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <p className="count">Picked {selectedCourses.filter(course => freeElectives.includes(course.name) && !coreCoursesPartOne.concat(coreCoursesPartTwo).concat(electives).includes(course.name)).length}</p>
    </div>
  );
}

export default MachineLearningPlanner;