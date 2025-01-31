import React from "react";
import "./Table.css";
import numeral from "numeral";
export default function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => {
        return (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format("0,0")}</strong>
            </td>
          </tr>
        );
      })}
    </div>
  );
}
