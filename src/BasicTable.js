import React, { useState, useEffect } from "react";
import "./BasicTable.css"

function BasicTable({rows, addToCourseList, showCheckbox }) {
  const [sortedRows, setSortedRows] = useState(rows)
  const [currentlySortedBy, setCurrentlySortedBy] = useState("")
  const [sortDirection, setSortDirection] = useState("ascending")

  useEffect(() => {
    sortRows("Course")
  }, [])

  const sortCompareFunction = (a, b, propertyName, direction) => {
    if (a[propertyName] < b[propertyName]) {
      return direction == "ascending" ? -1 : 1;
    }
    if (a[propertyName] > b[propertyName]) {
      return direction == "ascending" ? 1 : -1;
    }
    return 0;
  }
  const sortRows = (sortHeader) => {
    setCurrentlySortedBy(sortHeader)
    let propertyName;
    if (sortHeader === "Course") { propertyName = "name" }
    else if (sortHeader === "Foundational?") { propertyName = "isFoundational" }
    else if (sortHeader === "Rating") { propertyName = "rating" }
    else if (sortHeader === "Difficulty") { propertyName = "difficulty" }
    else if (sortHeader === "Workload") { propertyName = "workload" }
    else if (sortHeader === "Reviews") { propertyName = "reviewCount" }
    let direction;
    if (sortHeader === currentlySortedBy) { direction = sortDirection === "ascending" ? "descending" : "ascending" }
    else { direction = "ascending"}
    setSortedRows(sortedRows.toSorted((a, b) => sortCompareFunction(a, b, propertyName, direction)))
    setSortDirection(direction)
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
          <table className="table table-bordered">
            <thead>
              <tr>
                { showCheckbox && <th scope="col">Added to Course Plan</th> }
                <th scope="col" onClick={(event) => sortRows(event.target.childNodes[0]?.textContent.trim())}>
                  Course {currentlySortedBy === "Course" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={(event) => sortRows(event.target.childNodes[0]?.textContent.trim())}>
                  Foundational? {currentlySortedBy === "Foundational?" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={(event) => sortRows(event.target.childNodes[0]?.textContent.trim())}>
                  Rating {currentlySortedBy === "Rating" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={(event) => sortRows(event.target.childNodes[0]?.textContent.trim())}>
                  Difficulty {currentlySortedBy === "Difficulty" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={(event) => sortRows(event.target.childNodes[0]?.textContent.trim())}>
                  Workload {currentlySortedBy === "Workload" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
                <th scope="col" onClick={(event) => sortRows(event.target.childNodes[0]?.textContent.trim())}>
                  Reviews {currentlySortedBy === "Reviews" ? (sortDirection == "ascending" ? <span className="arrow">↑</span> : <span className="arrow">↓</span>) : null}
                </th>
              </tr>
            </thead>
            <tbody>
              { sortedRows.map(
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
                      <input type="checkbox" className="course-checkbox" onChange={(event) => addToCourseList({ 
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
                    <td><div>{ name }</div><div><a href={officialURL} target="_blank" rel="noreferrer">GT Official</a> - <a href={"https://www.omscentral.com/courses/" + slug + "/reviews"} target="_blank" rel="noreferrer">Reviews</a></div></td>
                    <td>{ isFoundational ? "yes" : "no" }</td>
                    <td>{ formatNumber(rating) }</td>
                    <td>{ formatNumber(difficulty) }</td>
                    <td>{ formatNumber(workload) }</td>
                    <td>{ reviewCount }</td>
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