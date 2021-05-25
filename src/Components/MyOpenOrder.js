import React from "react";

export default function MyOpenOrder() {
  return (
    <div className="table-responsive" >
      <table className="table table-dark ">
        <thead>
          <tr>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Order
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Type
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Rate
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Volume
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Condition
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Order Date
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Cancel
            </th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody> */}
      </table>
      <div className="text-center">
        <i style={{color: "rgb(128, 150, 160)"}} className="far fa-2x fa-file-alt" />

        <h6 className="mt-2">
          <font>No Open Order</font>
        </h6>
        <p
          className="text--normal1 nom "
          style={{
            position: "relative",
            verticalAlign: "middle",
            marginBottom: 10,
            color: "rgb(128, 150, 160)",
          }}
        >
          <font>Start Trading!</font>
        </p>
      </div>
    </div>
  );
}
