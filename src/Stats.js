import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './Stats.css';

const Stats = ({ selectedCourses }) => {
  if (!selectedCourses || selectedCourses.length === 0) {
    return null;
  }

  const totalCredits = selectedCourses.reduce((sum, course) => sum + (course.creditHours || 0), 0);
  
  const averageRating = (selectedCourses.reduce((sum, course) => sum + (course.rating || 0), 0) / selectedCourses.length).toFixed(2);
  
  const averageDifficulty = (selectedCourses.reduce((sum, course) => sum + (course.difficulty || 0), 0) / selectedCourses.length).toFixed(2);
  
  const totalWorkloadVal = selectedCourses.reduce((sum, course) => sum + (course.workload || 0), 0);
  const averageWorkload = (totalWorkloadVal / selectedCourses.length).toFixed(2);
  const totalWorkload = totalWorkloadVal.toFixed(2);

  const foundationalCount = selectedCourses.filter(course => course.isFoundational).length;

  return (
    <div className="stats-section">
      <h2 className="stats-title">Plan Statistics</h2>
      <Row className="g-4">
        <Col md={4} sm={6}>
          <Card className="stats-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Total Credits</Card.Title>
              <Card.Text className="h3 mb-0">{totalCredits}</Card.Text>
              <Card.Text className="text-muted small">{selectedCourses.length} classes</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6}>
          <Card className="stats-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Avg. Rating</Card.Title>
              <Card.Text className="h3 mb-0">{averageRating}</Card.Text>
              <Card.Text className="text-muted small">out of 5.0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6}>
          <Card className="stats-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Avg. Difficulty</Card.Title>
              <Card.Text className="h3 mb-0">{averageDifficulty}</Card.Text>
              <Card.Text className="text-muted small">1 (Easy) to 5 (Hard)</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6}>
          <Card className="stats-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Avg. Workload</Card.Title>
              <Card.Text className="h3 mb-0">{averageWorkload} hrs/wk</Card.Text>
              <Card.Text className="text-muted small">Total plan: {totalWorkload} hrs/wk</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6}>
          <Card className="stats-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Foundational</Card.Title>
              <Card.Text className="h3 mb-0">{foundationalCount}</Card.Text>
              <Card.Text className="text-muted small">Required: 2 (B or better)</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
