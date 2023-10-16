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
  const [copied, setCopied] = useState(false);

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
    setCopied(true)
  }

  const cleanData = (data) => {
    const reviews = data?.pageProps?.courses;
    const cleanedReviews = reviews.map(review => {
      if (review.name === "Mobile and Ubiquitous Computing") { return Object.assign(review, { isFoundational: true }) }
      if (review.name === "Video Game Design and Programming") { return Object.assign(review, { isFoundational: true }) }
      else { return review }
    })
    return cleanedReviews.concat({
      "codes": [
        "CS-8803-O16"
      ],
      "creditHours": 3,
      "description": "Digital Health Equity introduces individual, interpersonal, and societal influences on health, and how such influences create health disparities.",
      "id": "external-import-CS-8803-O16",
      "isDeprecated": false,
      "isFoundational": false,
      "name": "Digital Health Equity",
      "officialURL": "https://omscs.gatech.edu/cs-8803-o16-digital-health-equity",
      "reviewCount": 0,
    })
  }
  
  const fetchReviews = () => {
    fetch("https://www.omscentral.com/_next/data/eyTae--QRrk_jJoacM79D/index.json")
    .then(response => response.json())
    .then(data => cleanData(data))
    .then(cleanedData => setReviews(cleanedData))
  }

  const handleSpecializationChange = (event) => {
    setChosenCourseList([])
    setSpecialization(event.target.value)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <div className="Planner">
      <h2>Pick a specialization to begin:</h2>
      <Form.Select size="lg" onChange={ handleSpecializationChange }>
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
      <Button variant="primary" onClick={ handleCopy }>{ copied ? "✓" : "Copy" }</Button>
      <BasicTable tableId="chosenCourses" rows={ chosenCourseList } initiallySorted={ false } />
    </div>
  );
}

export default Planner;
