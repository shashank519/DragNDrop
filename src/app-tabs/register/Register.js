import React, { Component } from "react";
import { Layout, Form, Row, Col } from "antd";
import CSVReader from "react-csv-reader";
import "./register.css";

// const FormItem = Form.Item;

const { Content } = Layout;
class Register extends Component {
  state = {
    confirmDirty: false
  };

  handleTeam = data => {
    let a = [];
    for (let i = 0; i < data.length; i++) {
      let jsn = {
        teamId: 0,
        title: "",
        teamDescription: ""
      };
      jsn.teamId = data[i][0];
      jsn.title = data[i][0];
      jsn.teamDescription = data[i][1];
      a.push(jsn);
    }
    this.props.setDataListTeam(a);
  };

  handleLevel = data => {
    let a = [];

    for (let i = 0; i < data.length; i++) {
      let jsn = {
        teamId: 0,
        title: "",
        teamDescription: ""
      };
      jsn.teamId = data[i][0];
      jsn.title = data[i][0];
      jsn.teamDescription = data[i][1];
      a.push(jsn);
    }
    this.props.setDataListLevel(a);
    console.log(a);
  };

  handleProduct = data => {
    let a = [];

    for (let i = 0; i < data.length; i++) {
      let jsn = {
        teamId: 0,
        title: "",
        teamDescription: ""
      };
      jsn.teamId = data[i][0];
      jsn.title = data[i][0];
      jsn.teamDescription = data[i][1];
      a.push(jsn);
    }
    this.props.setDataListProduct(a);
    console.log(a);
  };

  handleChannel = data => {
    let a = [];

    for (let i = 0; i < data.length; i++) {
      let jsn = {
        teamId: 0,
        title: "",
        teamDescription: ""
      };
      jsn.teamId = data[i][0];
      jsn.title = data[i][0];
      jsn.teamDescription = data[i][1];
      a.push(jsn);
    }
    this.props.setDataListChannel(a);
    console.log(a);
  };

  handlePayperiod = data => {
    let a = [];

    for (let i = 0; i < data.length; i++) {
      let jsn = {
        teamId: 0,
        title: "",
        teamDescription: ""
      };
      jsn.teamId = data[i][0];
      jsn.title = data[i][0];
      jsn.teamDescription = data[i][1];
      a.push(jsn);
    }
    this.props.setDataListPayperiod(a);
    console.log(a);
  };

  handleComponent = data => {
    let a = [];

    for (let i = 0; i < data.length; i++) {
      let jsn = {
        teamId: 0,
        title: "",
        teamDescription: ""
      };
      jsn.teamId = data[i][0];
      jsn.title = data[i][0];
      jsn.teamDescription = data[i][1];
      a.push(jsn);
    }
    this.props.setDataListComponent(a);
    console.log(a);
  };

  render() {
    return (
      <Content style={{ padding: "25px 70px" }}>
        <div className="container">
          <Row>
            <Col span={8}>
              <label style={{ float: "right", fontWeight: "bold" }}>
                Team :
              </label>
            </Col>
            <Col span={16}>
              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={this.handleTeam}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label style={{ float: "right", fontWeight: "bold" }}>
                Level :
              </label>
            </Col>
            <Col span={16}>
              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={this.handleLevel}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label style={{ float: "right", fontWeight: "bold" }}>
                Product :
              </label>
            </Col>
            <Col span={16}>
              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={this.handleProduct}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label style={{ float: "right", fontWeight: "bold" }}>
                Channel :
              </label>
            </Col>
            <Col span={16}>
              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={this.handleChannel}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label style={{ float: "right", fontWeight: "bold" }}>
                Payperiod :
              </label>
            </Col>
            <Col span={16}>
              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={this.handlePayperiod}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label style={{ float: "right", fontWeight: "bold" }}>
                Component :
              </label>
            </Col>
            <Col span={16}>
              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={this.handleComponent}
              />
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Register);

export default WrappedRegistrationForm;
