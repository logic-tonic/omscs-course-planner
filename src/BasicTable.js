import React from "react";
import "./BasicTable.css"

function BasicTable({rows, addToCourseList, showCheckbox }) {
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
                <th scope="col">Course</th>
                <th scope="col">Foundational?</th>
                <th scope="col">Rating</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Workload</th>
                <th scope="col">Reviews</th>
              </tr>
            </thead>
            <tbody>
              { rows.map(
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