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
import {LocalStorageKeys, Specialization, writeToLocalStorage, readFromLocalStorage} from './utils.js'


function Planner() {
  const [reviews, setReviews] = useState([])
  const [chosenSpecialization, setChosenSpecialization] = useState('')
  const [chosenCourseList, setChosenCourseList] = useState([]);
  const [copied, setCopied] = useState(false);

  const addToCourseList = (row) => {
    let newChosenCourseList;
    if (chosenCourseList.find(course => course.id === row.id)) {
      newChosenCourseList = chosenCourseList.filter(course => course.id !== row.id)
    } else {
      newChosenCourseList = chosenCourseList.concat(row)
    }
    setChosenCourseList(newChosenCourseList)
    writeToLocalStorage(LocalStorageKeys.SelectedCourses, JSON.stringify(newChosenCourseList))
  }

  const handleReset = () => {
    setChosenCourseList([])
    setChosenSpecialization('')
    writeToLocalStorage(LocalStorageKeys.Specialization, '')
    writeToLocalStorage(LocalStorageKeys.SelectedCourses, [])
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
    setCopied(true)
  }

  const cleanData = (data) => {
    const reviews = data?.pageProps?.courses;
    const cleanedReviews = reviews.map(review => {
      if (review.name === "Mobile and Ubiquitous Computing") { return Object.assign(review, { isFoundational: true }) }
      else { return review }
    })
    return cleanedReviews.concat({
      "codes": [
          "CS-7650"
      ],
      "creditHours": 3,
      "description": "This course gives an overview of modern data-driven techniques for natural language processing.",
      "id": "external-import-CS-7650",
      "isDeprecated": false,
      "isFoundational": true,
      "name": "Natural Language Processing",
      "officialURL": "https://omscs.gatech.edu/cs-7650-natural-language-processing",
      "reviewCount": 0,
    }).concat({
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
  
  const fetchReviews = async () => {
    fetch("https://www.omscentral.com/_next/data/RbJpKU_7gp7Gm26pP9748/index.json")
    .then(response => response.json())
    .then(data => cleanData(data))
    .then(cleanedData => setReviews(cleanedData))
  }

  const handleSpecializationChange = (event) => {
    setChosenCourseList([])
    setChosenSpecialization(event.target.value)
    writeToLocalStorage(LocalStorageKeys.Specialization, event.target.value)
    writeToLocalStorage(LocalStorageKeys.SelectedCourses, [])
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    const specializationFromStorage = readFromLocalStorage(LocalStorageKeys.Specialization);
    const coursesFromStorage = readFromLocalStorage(LocalStorageKeys.SelectedCourses)
    if (Object.values(Specialization).includes(specializationFromStorage)) {
      setChosenSpecialization(specializationFromStorage)
      if(coursesFromStorage) {
        const listCourses = JSON.parse(coursesFromStorage)
        setChosenCourseList(listCourses.filter(course => reviews.find(row => row.id === course.id)))
      }
    }
  }, [reviews])

  return (
    <div className="Planner">
    <Button variant="primary" onClick={ handleReset }>Reset</Button>
      <h2>Pick a specialization to begin:</h2>
      <Form.Select size="lg" onChange={ handleSpecializationChange } value={chosenSpecialization}>
        <option>Choose your specialization</option>
        {Object.values(Specialization).map(spec => <option value={spec} key={spec} >{spec}</option>)}
      </Form.Select>
      { chosenSpecialization === Specialization.ComputingSystems && <ComputingSystemsPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.HumanComputerInteraction && <HCIPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.ComputationalPerceptionAndRobotics && <ComputationalPerceptionRoboticsPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.InteractiveIntelligence && <InteractiveIntelligencePlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.MachineLearning && <MachineLearningPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      <h1>Chosen Course Plan:</h1>
      <Button variant="primary" onClick={ handleCopy }>{ copied ? "✓" : "Copy" }</Button>
      <BasicTable tableId="chosenCourses" rows={ chosenCourseList } initiallySorted={ false } />
    </div>
  );
}

export default Planner;
