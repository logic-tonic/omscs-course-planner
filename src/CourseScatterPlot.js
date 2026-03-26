import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';
import { Form, Row, Col, Card } from 'react-bootstrap';
import './CourseScatterPlot.css';

const CourseScatterPlot = ({ allCourses, selectedCourses }) => {
  const [xAxis, setXAxis] = useState('workload');
  const [yAxis, setYAxis] = useState('rating');

  const axisOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Difficulty', value: 'difficulty' },
    { label: 'Workload (hrs/wk)', value: 'workload' },
  ];

  const { otherCourses, myCourses } = useMemo(() => {
    const validCourses = allCourses.filter(c => c.rating && c.difficulty && c.workload);
    
    const other = validCourses.filter(c => !selectedCourses.some(sc => sc.id === c.id));
    const mine = validCourses.filter(c => selectedCourses.some(sc => sc.id === c.id));

    return {
      otherCourses: {
        x: other.map(c => c[xAxis]),
        y: other.map(c => c[yAxis]),
        text: other.map(c => `${c.name}<br>${c.codes?.[0] || ''}`),
        customdata: other.map(c => [c.rating, c.difficulty, c.workload]),
        name: 'Other Courses',
        mode: 'markers',
        type: 'scatter',
        marker: { 
          color: '#8884d8', 
          opacity: 0.5, 
          size: 10,
          line: { color: 'white', width: 1 }
        },
        hovertemplate: 
          '<b>%{text}</b><br><br>' +
          'Rating: %{customdata[0]}<br>' +
          'Difficulty: %{customdata[1]}<br>' +
          'Workload: %{customdata[2]} hrs/wk<br>' +
          '<extra></extra>'
      },
      myCourses: {
        x: mine.map(c => c[xAxis]),
        y: mine.map(c => c[yAxis]),
        text: mine.map(c => `${c.name}<br>${c.codes?.[0] || ''}`),
        customdata: mine.map(c => [c.rating, c.difficulty, c.workload]),
        name: 'My Plan',
        mode: 'markers',
        type: 'scatter',
        marker: { 
          color: '#ff7300', 
          size: 14, 
          symbol: 'star',
          line: { color: 'white', width: 1.5 }
        },
        hovertemplate: 
          '<b>%{text}</b><br><br>' +
          'Rating: %{customdata[0]}<br>' +
          'Difficulty: %{customdata[1]}<br>' +
          'Workload: %{customdata[2]} hrs/wk<br>' +
          '<extra></extra>'
      }
    };
  }, [allCourses, selectedCourses, xAxis, yAxis]);

  const getLabel = (value) => axisOptions.find(opt => opt.value === value)?.label;

  return (
    <Card className="mt-4 mb-4 shadow-sm border-0 scatter-plot-card">
      <Card.Body>
        <Card.Title className="mb-4 d-flex justify-content-between align-items-center">
          <span>Course Comparison Matrix</span>
          <span className="text-muted small">Powered by Plotly</span>
        </Card.Title>
        
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fs-5 text-muted text-uppercase fw-bold mb-2">X-Axis</Form.Label>
              <Form.Select size="lg" value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="shadow-sm">
                {axisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fs-5 text-muted text-uppercase fw-bold mb-2">Y-Axis</Form.Label>
              <Form.Select size="lg" value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="shadow-sm">
                {axisOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="plotly-container">
          <Plot
            data={[otherCourses, myCourses]}
            layout={{
              autosize: true,
              height: 450,
              margin: { l: 60, r: 30, t: 10, b: 60 },
              xaxis: {
                title: {
                  text: getLabel(xAxis),
                  font: {
                    size: 16,
                    family: 'Arial, sans-serif',
                    color: '#495057',
                    weight: 'bold'
                  }
                },
                gridcolor: '#f0f0f0',
                zerolinecolor: '#f0f0f0',
                tickfont: { size: 12 }
              },
              yaxis: {
                title: {
                  text: getLabel(yAxis),
                  font: {
                    size: 16,
                    family: 'Arial, sans-serif',
                    color: '#495057',
                    weight: 'bold'
                  }
                },
                gridcolor: '#f0f0f0',
                zerolinecolor: '#f0f0f0',
                tickfont: { size: 12 }
              },
              hoverlabel: {
                bgcolor: '#fff',
                bordercolor: '#888',
                font: {
                  size: 14,
                  family: 'Arial, sans-serif',
                  color: '#000'
                }
              },
              hovermode: 'closest',
              plot_bgcolor: 'white',
              paper_bgcolor: 'white',
              legend: {
                orientation: 'h',
                y: -0.2,
                x: 0.5,
                xanchor: 'center'
              }
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            config={{ displayModeBar: false }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseScatterPlot;
