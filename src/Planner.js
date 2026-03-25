import React, { useEffect, useState } from "react";
import { Tab, Tabs, Button, Form } from 'react-bootstrap';
import ComputingSystemsPlanner from "./ComputingSystemsPlanner"
import HCIPlanner from "./HCIPlanner"
import BasicTable from "./BasicTable";
import ComputationalPerceptionRoboticsPlanner from "./ComputationalPerceptionRoboticsPlanner";
import ArtificialIntelligencePlanner from "./ArtificialIntelligencePlanner";
import MachineLearningPlanner from "./MachineLearningPlanner";
import ComputerGraphicsPlanner from "./ComputerGraphicsPlanner.js";
import Stats from "./Stats";
import CourseScatterPlot from "./CourseScatterPlot";
import './Planner.css';
import data from "./data.json";
import {LocalStorageKeys, Specialization, writeToLocalStorage, readFromLocalStorage} from './utils.js'


function Planner() {
  const [reviews, setReviews] = useState([])
  const [chosenSpecialization, setChosenSpecialization] = useState('')
  const [chosenCourseList, setChosenCourseList] = useState([]);

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
      if (review.name === "Statistical Modeling and Regression Analysis") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/isye-6414-regression-analysis" }) }
      if (review.name === "High Performance Computing") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cse-6220-intro-high-performance-computing" }) }
      if (review.name === "Introduction to Cyber-Physical Systems Security") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6263-intro-cyber-physical-systems-security" }) }
      if (review.name === "Introduction to Information Security") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6035-introduction-information-security" }) }
      if (review.name === "Software Architecture and Design") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6310-software-architecture-and-design" }) }
      if (review.name === "Special Topics: Systems Design for Cloud Computing") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6211-system-design-cloud-computing" }) }
      if (review.name === "Security Incident Response") { return Object.assign(review, { officialURL: "https://omscs.gatech.edu/cs-6261-security-incident-response" }) }
      else { return review }
    })
    return cleanedReviews.concat([
      {
        "codes": [
          "CS-8803-O23"
        ],
        "creditHours": 3,
        "description": "This is a research oriented course that covers new developments in Internet measurement techniques, with an emphasis on topics related to reliability, freedom and security of modern Internet platforms.",
        "id": "external-import-CS-8803-O23",
        "isDeprecated": false,
        "isFoundational": false,
        "name": "Modern Internet Research Methods",
        "officialURL": "https://omscs.gatech.edu/cs-8803-o23-modern-internet-research-methods",
        "reviewCount": 0,
      },
      {
        "codes": [
          "CS-8803-O20"
        ],
        "creditHours": 3,
        "description": "Quantum computing promises exponential speedups for a class of important problems.",
        "id": "external-import-CS-8803-O20",
        "isDeprecated": false,
        "isFoundational": false,
        "name": "Quantum Hardware",
        "officialURL": "https://omscs.gatech.edu/cs-8803-o20-quantum-hardware",
        "reviewCount": 0,
      },
      {
        "codes": [
          "CS-8803-O27"
        ],
        "creditHours": 3,
        "description": "The CGAI course offers a comprehensive introduction to modern computer graphics, focusing on techniques that have emerged over the past decade, with a particular emphasis on AI-powered advancements in modeling, rendering, simulation, and animation.",
        "id": "external-import-CS-8803-O27",
        "isDeprecated": false,
        "isFoundational": false,
        "name": "Computer Graphics in the AI Era",
        "officialURL": "https://omscs.gatech.edu/cs-8803-o27-computer-graphics-ai-era",
        "reviewCount": 0,
      },
      {
        "codes": [
          "CS-8803-O29"
        ],
        "creditHours": 3,
        "description": "Health sensing and interventions (HSI) aims to bridge the gap between the medical sciences and computing.",
        "isDeprecated": false,
        "isFoundational": false,
        "name": "Health Sensing and Interventions",
        "officialURL": "https://omscs.gatech.edu/cs-8803-o29-health-sensing-and-interventions",
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
        // Merge stored course selections with fresh course data from reviews
        const updatedCourseList = listCourses.map(storedCourse => {
          const freshCourse = reviews.find(row => row.id === storedCourse.id)
          return freshCourse || storedCourse // Use fresh data if available, fallback to stored data
        }).filter(course => reviews.find(row => row.id === course.id)) // Only keep courses that still exist
        setChosenCourseList(updatedCourseList)
        
        // Only update localStorage if the data has actually changed
        const hasDataChanged = listCourses.some(storedCourse => {
          const freshCourse = reviews.find(row => row.id === storedCourse.id)
          return freshCourse && (
            freshCourse.rating !== storedCourse.rating ||
            freshCourse.difficulty !== storedCourse.difficulty ||
            freshCourse.workload !== storedCourse.workload ||
            freshCourse.reviewCount !== storedCourse.reviewCount
          )
        })
        
        if (hasDataChanged) {
          writeToLocalStorage(LocalStorageKeys.SelectedCourses, JSON.stringify(updatedCourseList))
        }
      }
    }
  }, [reviews])

  return (
    <div className="Planner">
      <h2>Pick a specialization to begin:</h2>
      <div className="button-container">
        <Form.Select size="lg" onChange={ handleSpecializationChange } value={chosenSpecialization} className="specialization">
          <option>Choose your specialization</option>
          <option value="Computational Perception & Robotics">Computational Perception & Robotics</option>
          <option value="Computing Systems">Computing Systems</option>
          <option value="Human-Computer Interaction">Human-Computer Interaction</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Computer Graphics">Computer Graphics</option>
        </Form.Select>
        {chosenSpecialization && <Button variant="danger" className="danger" onClick={ handleReset }>Clear all choices</Button> }
      </div>
      { chosenSpecialization === Specialization.ComputingSystems && <ComputingSystemsPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.HumanComputerInteraction && <HCIPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.ComputationalPerceptionAndRobotics && <ComputationalPerceptionRoboticsPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.ArtificialIntelligence && <ArtificialIntelligencePlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.MachineLearning && <MachineLearningPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      { chosenSpecialization === Specialization.ComputerGraphicsPlanner && <ComputerGraphicsPlanner courses={reviews} addToCourseList={ addToCourseList } selectedCourses={ chosenCourseList } /> }
      
      {chosenCourseList.length > 0 && <Stats selectedCourses={chosenCourseList} />}

      <CourseScatterPlot allCourses={reviews} selectedCourses={chosenCourseList} />

      <h2>Chosen Course Plan:</h2>
      <h3 className="count">{chosenCourseList.length}/10 classes selected</h3>
      <Tabs defaultActiveKey="simple" id="course-plan-tabs" className="mb-3">
        <Tab eventKey="simple" title="Simple view">
          {
            chosenCourseList.length === 0 ? (
              <div>There's nothing here yet. Pick a specialization and add some classes to populate your course list!</div>
            ) : (
              <ol>
                {chosenCourseList.map(x => <li key={x.id}>{x.codes.join(', ')} {x.name}</li>)}
              </ol>
            )
          }
        </Tab>
        <Tab eventKey="full" title="Full view">
          <BasicTable tableId="chosenCourses" rows={chosenCourseList} initiallySorted={false} showIndex={ true } />
        </Tab>
      </Tabs>
      { chosenCourseList.length !== 0 && <h4>Check <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRyHrRhH2V52bsYFEtm-8oJDaFOlyGYz6AKXm8WwsthN3fNP3KGkEx7O7D9ZHV3j2iKnzU2XHqoh4pQ/pubhtml" target="_blank" rel="noreferrer">omscs.rocks</a> for course availability.</h4>}
      {chosenCourseList.length > 0 && (
        <div className="footer-buttons">
          <Button 
            href="https://eatstash.com/" 
            target="_blank" 
            rel="noopener"
            className="eatstash-button"
          >
            <span className="eatstash-desktop-text">Try my recipe app, EatStash!</span>
            <span className="eatstash-mobile-text">Try my recipe app!</span>
          </Button>
          <a 
            href="https://www.buymeacoffee.com/logictonic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="coffee-button"
          >
            <img 
              src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" 
              alt="Buy Me A Coffee" 
            />
          </a>
        </div>
      )}
    </div>
  );
}

export default Planner;
