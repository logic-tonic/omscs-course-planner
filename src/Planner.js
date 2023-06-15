import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ComputingSystemsPlanner from "./ComputingSystemsPlanner"
import HCIPlanner from "./HCIPlanner"
import BasicTable from "./BasicTable";
import ComputationalPerceptionRoboticsPlanner from "./ComputationalPerceptionRoboticsPlanner";
import InteractiveIntelligencePlanner from "./InteractiveIntelligencePlanner";
import MachineLearningPlanner from "./MachineLearningPlanner";
import './Planner.css'

function Planner() {
  const [reviews, setReviews] = useState([])
  const [specialization, setSpecialization] = useState('')
  const [chosenCourseList, setChosenCourseList] = useState([]);

  const addToCourseList = (row) => {
    if (chosenCourseList.find(course => course.id === row.id)) {
      setChosenCourseList(chosenCourseList.filter(course => course.id !== row.id))
    } else {
      setChosenCourseList(chosenCourseList.concat(row))
    }
  }

  const handleCopy = () => {
    const el = document.getElementById('chosenCourses')

    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        console.log(el)
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand("copy");
  }
  
  const fetchReviews = () => {
    fetch("https://www.omscentral.com/_next/data/RbJpKU_7gp7Gm26pP9748/index.json")
    .then(response => response.json())
    .then(data => setReviews(data?.pageProps?.courses))
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <div className="Planner">
      <h2>Pick a specialization to begin:</h2>
      <Form.Select size="lg" onChange={(event) => setSpecialization(event.target.value)}>
        <option>Choose your specialization</option>
        <option value="Computation Perception & Robotics">Computation Perception & Robotics</option>
        <option value="Computing Systems">Computing Systems</option>
        <option value="Human-Computer Interaction">Human-Computer Interaction</option>
        <option value="Interactive Intelligence">Interactive Intelligence</option>
        <option value="Machine Learning">Machine Learning</option>
      </Form.Select>
      { specialization === "Computing Systems" && <ComputingSystemsPlanner courses={reviews} addToCourseList={ addToCourseList } /> }
      { specialization === "Human-Computer Interaction" && <HCIPlanner courses={reviews} addToCourseList={ addToCourseList } /> }
      { specialization === "Computation Perception & Robotics" && <ComputationalPerceptionRoboticsPlanner courses={reviews} addToCourseList={ addToCourseList } /> }
      { specialization === "Interactive Intelligence" && <InteractiveIntelligencePlanner courses={reviews} addToCourseList={ addToCourseList } /> }
      { specialization === "Machine Learning" && <MachineLearningPlanner courses={reviews} addToCourseList={ addToCourseList } /> }
      <h1>Chosen Course Plan:</h1>
      <Button variant="primary" onClick={ handleCopy }>Copy</Button>
      <BasicTable tableId="chosenCourses" rows={ chosenCourseList } initiallySorted={ false } />
    </div>
  );
}

export default Planner;
