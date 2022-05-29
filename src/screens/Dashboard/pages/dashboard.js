import React, { useState, useEffect } from "react";

//api
import Axios from "../../../api/index";

// components
import { ButtonComp as Button } from "../../../components";

//styles
import "../styles/home.styles.css";

//npm
import { DataGrid } from "@mui/x-data-grid";
import { Row, Container, Col } from "react-bootstrap";

export const Dashboard = () => {
  const [resdata, setResData] = useState([]);

  const [refresh, setRefresh] = useState(true);

  const [showTable, setShowTable] = useState(true);

  const [input, setInput] = useState("");

  const [dataToDisplay, setDataToDisplay] = useState([]);

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    const res = await Axios.get();

    const apidata = res.data;
    let newdata = [];
    apidata.results.forEach((e) => {
      const newformat = {
        name: e.name.first,
        email: e.email,
        id: e.login.uuid,
        gender: e.gender,
        cell: e.cell,
      };
      newdata.push(newformat);
    });
    setResData(newdata);

    setDataToDisplay(newdata);
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 230,
    },
    {
      field: "name",
      headerName: "Name",
      width: 230,
    },

    { field: "gender", headerName: "Gender", width: 130 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "cell", headerName: "Cell", width: 230 },
  ];

  const search = (txt) => {
    if (!txt) {
      return setDataToDisplay(resdata);
    }

    let retArr = [];
    let conditionArray = ["id", "name", "gender", "email", "cell"];
    resdata.forEach((item, index) => {
      let valArray = [];
      conditionArray.forEach((condition) => {
        valArray.push(item[condition]);
      });
      if (
        valArray.some((elem) => {
          if (!elem) return false;
          else
            return elem
              .toString()
              .toLowerCase()
              .includes(txt.toString().toLowerCase());
        })
      ) {
        retArr.push(item);
      }

      setDataToDisplay(retArr);
    });
  };

  const _renderTableView = () => {
    return (
      <div className="tables">
        <div className="header">Table</div>
        <input
          placeholder="Search"
          className="search_input"
          onChange={(e) => {
            setInput(e.target.value);
            search(e.target.value);
          }}
          value={input}
        />
        <DataGrid rows={dataToDisplay} columns={columns} pageSize={10} />
      </div>
    );
  };

  const _renderTileView = () => {
    return (
      <div className="tiles">
        <div className="header">Tile</div>
        <Container>
          <Row style={{ alignItems: "center", justifyContent: "center" }}>
            {resdata.map((item, index) => {
              return (
                <div className="tilesDiv" key={index}>
                  <Col>Name: {item.name}</Col>

                  <Col>Email: {item.email}</Col>

                  <Col>Male: {item.gender}</Col>

                  <Col>ID: {item.id}</Col>
                </div>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <Container>
      <div className="tablescontainer">
        <Button title={"Refresh"} onClick={() => setRefresh(!refresh)} />
        <div className="btn2">
          <Button
            title={showTable ? "Show Tile View" : "Show Table View"}
            onClick={() => setShowTable(!showTable)}
          />
        </div>

        {showTable ? _renderTableView() : _renderTileView()}
      </div>
    </Container>
  );
};
