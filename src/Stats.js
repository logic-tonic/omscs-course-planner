import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './Stats.css';

const Stats = ({ selectedCourses }) => {
  if (!selectedCourses || selectedCourses.length === 0) {
    return null;
  }

  const totalCredits = selectedCourses.reduce((sum, course) => sum + (course.creditHours || 3), 0);
  
  const ratings = selectedCourses.map(course => course.rating).filter(r => r > 0);
  const averageRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : 'N/A';

  const difficulties = selectedCourses.map(course => course.difficulty).filter(d => d > 0);
  const averageDifficulty = difficulties.length > 0 ? (difficulties.reduce((a, b) => a + b, 0) / difficulties.length).toFixed(2) : 'N/A';
  
  const workloads = selectedCourses.map(course => course.workload).filter(w => w > 0);
  const averageWorkload = workloads.length > 0 ? (workloads.reduce((a, b) => a + b, 0) / workloads.length).toFixed(2) : 'N/A';
  const minWorkload = workloads.length > 0 ? Math.min(...workloads).toFixed(1) : null;
  const maxWorkload = workloads.length > 0 ? Math.max(...workloads).toFixed(1) : null;

  const foundationalCount = selectedCourses.filter(course => course.isFoundational).length;

  return (
    <div className="stats-section">
      <h2 className="stats-title">Plan Statistics</h2>
      <Row className="g-4">
        <Col md={4} sm={6}>
          <Card className="stats-card h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="text-muted small text-uppercase">Total Credits</Card.Title>
              <Card.Text className="h3 mb-0">{totalCredits} / 30</Card.Text>
              <Card.Text className="text-muted small">{selectedCourses.length} of 10 courses</Card.Text>
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
              <Card.Text className="text-muted small">{minWorkload ? `Range: ${minWorkload} – ${maxWorkload} hrs/wk` : 'No workload data'}</Card.Text>
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
