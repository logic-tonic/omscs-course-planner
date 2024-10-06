import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ComputingSystemsPlanner from "./ComputingSystemsPlanner"
import HCIPlanner from "./HCIPlanner"
import BasicTable from "./BasicTable";
import ComputationalPerceptionRoboticsPlanner from "./ComputationalPerceptionRoboticsPlanner";
import InteractiveIntelligencePlanner from "./InteractiveIntelligencePlanner";
import MachineLearningPlanner from "./MachineLearningPlanner";
import './Planner.css';
import data from "./data.json";
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
      if (review.name === "Video Game Design and Programming") { return Object.assign(review, { isFoundational: true }) }
      if (review.name === "Artificial Intelligence Techniques for Robotics") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-7638-robotics-ai-techniques" }) }
      if (review.name === "AI, Ethics, and Society") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6603-ai-ethic-and-society" }) }
      if (review.name === "Big Data Analytics for Healthcare") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cse-6250-big-data-health-informatics" }) }
      if (review.name === "Data and Visual Analytics") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cse-6242-data-and-visual-analytics" }) }
      if (review.name === "Deterministic Optimization") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/isye-6669-deterministic-optimization" }) }
      if (review.name === "High Performance Computing") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cse-6220-intro-high-performance-computing" }) }
      if (review.name === "Introduction to Cyber-Physical Systems Security") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6263-intro-cyber-physical-systems-security" }) }
      if (review.name === "Introduction to Information Security") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6035-introduction-information-security" }) }
      if (review.name === "Software Architecture and Design") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6310-software-architecture-and-design" }) }
      if (review.name === "Special Topics: Systems Design for Cloud Computing") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6211-system-design-cloud-computing" }) }
      else { return review }
    })
    return cleanedReviews.concat([{
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
    },
    {
      "codes": [
        "CS-8803-O21"
      ],
      "creditHours": 3,
      "description": "This course explores the software and hardware aspects of GPU development.",
      "id": "external-import-CS-8803-O21",
      "isDeprecated": false,
      "isFoundational": true,
      "name": "Special Topics: GPU Hardware and Software",
      "officialURL": "https://omscs.gatech.edu/cs-8803-o21-gpu-hardware-and-software",
      "reviewCount": 0,
    },
    {
      "codes": [
        "CS-8803-O22"
      ],
      "creditHours": 3,
      "description": "This course provides students with the background information and skill sets necessary to participate in and lead a cyber security incident response effort.",
      "id": "external-import-CS-8803-O22",
      "isDeprecated": false,
      "isFoundational": false,
      "name": "Special Topics: Security Incident Response",
      "officialURL": "https://omscs.gatech.edu/cs-8803-o22-security-incident-response",
      "reviewCount": 0,
    }
    ])
  }
  
  const fetchReviews = () => {
    const cleanedData = cleanData(data);
    setReviews(cleanedData)
  }

  // Don't use live data until the CORS error from omscentral has been fixed 
  // const fetchReviews = () => {
  //   fetch("https://www.omscentral.com/_next/data/eyTae--QRrk_jJoacM79D/index.json")
  //   .then(response => response.json())
  //   .then(data => cleanData(data))
  //   .then(cleanedData => setReviews(cleanedData))
  // }

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
      <h2>Pick a specialization to begin:</h2>
      <Form.Select size="lg" onChange={ handleSpecializationChange } value={chosenSpecialization}>
        <option>Choose your specialization</option>
        <option value="Computational Perception & Robotics">Computational Perception & Robotics</option>
        <option value="Computing Systems">Computing Systems</option>
        <option value="Human-Computer Interaction">Human-Computer Interaction</option>
        <option value="Interactive Intelligence">Interactive Intelligence</option>
        <option value="Machine Learning">Machine Learning</option>
      </Form.Select>
      { chosenSpecialization === Specialization.ComputingSystems && <ComputingSystemsPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.HumanComputerInteraction && <HCIPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.ComputationalPerceptionAndRobotics && <ComputationalPerceptionRoboticsPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.InteractiveIntelligence && <InteractiveIntelligencePlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.MachineLearning && <MachineLearningPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      <h1>Chosen Course Plan:</h1>
      <Button variant="primary" onClick={ handleCopy }>{ copied ? "✓" : "Copy" }</Button>
      <BasicTable tableId="chosenCourses" rows={ chosenCourseList } initiallySorted={ false } />
      <Button variant="danger" onClick={ handleReset }>Reset</Button>
    </div>
  );
}

export default Planner;
