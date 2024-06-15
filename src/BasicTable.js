import React, { useState, useEffect } from "react";
import "./BasicTable.css"

function BasicTable({ tableId, rows, addToCourseList, showCheckbox, initiallySorted = true, selectedCourses }) {
  const [sortedRows, setSortedRows] = useState(rows)
  const [currentlySortedBy, setCurrentlySortedBy] = useState("")
  const [sortDirection, setSortDirection] = useState("ascending")

  useEffect(() => {
    if (initiallySorted) setCurrentlySortedBy("Course")
  }, [])

  useEffect(() => {
      sortRows(currentlySortedBy)
  }, [currentlySortedBy, sortDirection])


  useEffect(() => {
    sortRows(currentlySortedBy)
  }, [rows.length])

  const handleHeaderClick = (event) => {
    const clickedHeader = event.target.childNodes[0]?.textContent.trim();
    if (clickedHeader === currentlySortedBy || ["↑", "↓"].includes(clickedHeader)) {
      setSortDirection(sortDirection === "ascending" ? "descending" : "ascending") }
    else {
      setSortDirection("ascending")
      setCurrentlySortedBy(clickedHeader)
    }
  }

  const sortCompareFunction = (a, b, propertyName, direction) => {
    let aValue, bValue;

    if (propertyName === 'ratingDifficultyRatio') {
      aValue = a.rating / a.difficulty;
      bValue = b.rating / b.difficulty;
    } else if (propertyName === 'ratingWorkloadRatio') {
      aValue = a.rating / a.workload;
      bValue = b.rating / b.workload;
    } else {
      aValue = a[propertyName];
      bValue = b[propertyName];
    }

    if ((aValue || 0) < (bValue || 0)) {
      return direction == "ascending" ? -1 : 1;
    }
    if ((aValue || 0) > (bValue || 0)) {
      return direction == "ascending" ? 1 : -1;
    }
    return 0;
  }

  const sortRows = (sortHeader) => {
    let propertyName;
    if (sortHeader === "Course") { propertyName = "name" }
    else if (sortHeader === "Foundational?") { propertyName = "isFoundational" }
    else if (sortHeader === "Rating") { propertyName = "rating" }
    else if (sortHeader === "Difficulty") { propertyName = "difficulty" }
    else if (sortHeader === "Rating:Difficulty") { propertyName = "ratingDifficultyRatio" }
    else if (sortHeader === "Workload") { propertyName = "workload" }
    else if (sortHeader === "Rating:Workload") { propertyName = "ratingWorkloadRatio" }
    else if (sortHeader === "Reviews") { propertyName = "reviewCount" }
    setSortedRows(rows.toSorted((a, b) => sortCompareFunction(a, b, propertyName, sortDirection)))
    setSortDirection(sortDirection)
  }

  const formatNumber = (value) => {
    return Number.isNaN(value) || typeof value === "undefined"
      ? "N/A"
      : value.toFixed(2);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered" id={ tableId } >
            <thead>
              <tr>
                { showCheckbox && <th scope="col">Add</th> }
                <th scope="col" onClick={ handleHeaderClick }>
                  Course {currentlySortedBy === "Course" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Rating {currentlySortedBy === "Rating" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Difficulty {currentlySortedBy === "Difficulty" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Workload {currentlySortedBy === "Workload" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Reviews {currentlySortedBy === "Reviews" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Foundational? {currentlySortedBy === "Foundational?" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Rating:Difficulty {currentlySortedBy === "Rating:Difficulty" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Rating:Workload {currentlySortedBy === "Rating:Workload" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={ handleHeaderClick }>
                  Code(s) {currentlySortedBy === "Code(s)" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
              </tr>
            </thead>
            <tbody>
              { sortedRows.length === 0 ? (
                <tr className="empty-table">
                  <td>There's nothing here yet. Pick a specialization and add some classes to populate your course list!</td>
                </tr>
              ) : sortedRows.map(
                (
                  {
                    id,
                    slug,
                    codes,
                    isFoundational,
                    name,
                    officialURL,
                    rating,
                    difficulty,
                    workload,
                    reviewCount,
                  },
                  index
                ) => (
                  <tr
                    key={id}
                    className={index % 2 === 0 ? undefined : "bg-gray-50"}
                  >
                    { showCheckbox && <td>
                      <input type="checkbox" className="course-checkbox" 
                        checked={selectedCourses && selectedCourses.find(row => row.id === id)}
                        onChange={(event) => addToCourseList({ 
                          id,
                          slug,
                          codes,
                          isFoundational,
                          name,
                          officialURL,
                          rating,
                          difficulty,
                          workload,
                          reviewCount,
                        })}/>
                    </td> }
                    <td>
                      <div>{ name }</div>
                      <div>
                        <a href={officialURL} target="_blank" rel="noreferrer">GT Official</a> - <a href={"https://www.omscentral.com/courses/" + slug + "/reviews"} target="_blank" rel="noreferrer">Reviews</a>
                      </div>
                    </td>
                    <td>{ formatNumber(rating) }</td>
                    <td>{ formatNumber(difficulty) }</td>
                    <td>{ formatNumber(workload) }</td>
                    <td>{ reviewCount }</td>
                    <td>{ isFoundational ? "yes" : "no" }</td>
                    <td>{ formatNumber(rating / difficulty) }</td>
                    <td>{ formatNumber(rating / workload) }</td>
                    <td>{ codes.join(', ') }</td>
                  </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
  </div>
  )
}

export default BasicTable;