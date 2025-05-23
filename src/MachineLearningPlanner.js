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
  "Natural Language Processing",
  "Data and Visual Analytics",
  "Big Data Analytics for Healthcare",
  "Introduction to Theory and Practice of Bayesian Statistics",
];

function MachineLearningPlanner({ courses, addToCourseList, selectedCourses }) {
  return (
    <div>
      <h2>Core Courses</h2>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartOne.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => coreCoursesPartOne.includes(course.name)).length}</h5>
      <h3>Pick one (1) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => coreCoursesPartTwo.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => coreCoursesPartTwo.includes(course.name)).length}</h5>
      <h2>Electives</h2>
      <h3>Pick three (3) of:</h3>
      <BasicTable 
        rows={ courses.filter(course => electives.includes(course.name)) }
        addToCourseList={ addToCourseList }
        showCheckbox
        selectedCourses={ selectedCourses }
      />
      <h5 className="count">Picked {selectedCourses.filter(course => electives.includes(course.name)).length}</h5>
      <h2>Free Electives</h2>
      <h3>Pick five (5) free electives.</h3>
      <h4>Free electives may be any courses offered through the OMSCS program. If you take extra specialization core courses and/or extra specialization elective courses beyond what is required in your chosen specialization, the extra course(s) can be used only towards the "free" electives.</h4>
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

export default MachineLearningPlanner;