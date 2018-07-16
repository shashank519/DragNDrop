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
    for (let i = 0; i < data.length; i++) {
      let jsn = {
        teamId: 0,
        title: "",
        description: ""
      };
      jsn.teamId = data[i][0];
      jsn.title = data[i][0];
      jsn.description = data[i][1];
      fetch("http://127.0.0.1:9000/register/team/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsn)
      });
    }
  };

  handleLevel = data => {
    for (let i = 0; i < data.length; i++) {
      let jsn = {
        levelId: 0,
        title: "",
        description: ""
      };
      jsn.levelId = data[i][0];
      jsn.title = data[i][0];
      jsn.description = data[i][1];
       fetch("http://127.0.0.1:9000/register/level/", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify(jsn)
       });
    }
  };

  handleProduct = data => {
    for (let i = 0; i < data.length; i++) {
      let jsn = {
        productId: 0,
        title: "",
        description: ""
      };
      jsn.productId = data[i][0];
      jsn.title = data[i][0];
      jsn.description = data[i][1];
       fetch("http://127.0.0.1:9000/register/product/", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify(jsn)
       });
    }
  };

  handleChannel = data => {
    for (let i = 0; i < data.length; i++) {
      let jsn = {
        channelId: 0,
        title: "",
        description: ""
      };
      jsn.channelId = data[i][0];
      jsn.title = data[i][0];
      jsn.description = data[i][1];
       fetch("http://127.0.0.1:9000/register/channel/", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify(jsn)
       });
    }
  };

  handlePayperiod = data => {
    for (let i = 0; i < data.length; i++) {
      let jsn = {
        payperiodId: 0,
        title: "",
        description: ""
      };
      jsn.payperiodId = data[i][0];
      jsn.title = data[i][0];
      jsn.description = data[i][1];
       fetch("http://127.0.0.1:9000/register/payperiod/", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify(jsn)
       });
    }
  };

  handleComponent = data => {
    for (let i = 0; i < data.length; i++) {
      let jsn = {
        componentId: 0,
        title: "",
        description: ""
      };
      jsn.componentId = data[i][0];
      jsn.title = data[i][0];
      jsn.description = data[i][1];
       fetch("http://127.0.0.1:9000/register/component/", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify(jsn)
       });
    }
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
