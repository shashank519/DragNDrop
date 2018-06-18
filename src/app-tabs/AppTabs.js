import React, { Component } from 'react';
import { Tabs, notification } from 'antd';

import Register from './register/Register';
import DndList from './dnd-list/DndList';

const TabPane = Tabs.TabPane;

class AppTabs extends Component {
  state = {
    dataList: []
    // dataList: [
    //   {title: 'Elephant', field1: 'Elephant', field2: 'trunk', field3: 'big ears', field4: 'two big teeths', field5: 'tail'},
    //   {title: 'Eagle', field1: 'Eagle', field2: 'wings', field3: 'legs', field4: 'carnivorous', field5: 'bird'},
    //   {title: 'Lion', field1: 'Lion', field2: 'cat', field3: 'legs', field4: 'carnivorous', field5: 'animal'}
    // ]
  };

  setDataList = value => {
    value['title'] = value.field1;
    this.setState((prevState, prevProps)=>{
      return {dataList: [...this.state.dataList, value]}
    })

    this.openNotificationWithIcon('success', 'Success', 'Registered successfully.');

    setTimeout(()=>{
      console.log(this.state.dataList);
    }, 2000);
  }

  onTabChange = key => {
    console.log(key);
  }

  openNotificationWithIcon = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  render() {
    return (
      <Tabs onChange={this.onTabChange} type="card" animated>
        <TabPane tab="Tab 1" key="1">
          <Register setDataList={this.setDataList}></Register>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <DndList dataList={this.state.dataList}></DndList>
        </TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
        <TabPane tab="Tab 4" key="4">Content of Tab Pane 4</TabPane>
        <TabPane tab="Tab 5" key="5">Content of Tab Pane 5</TabPane>
      </Tabs>
    );
  }
}

export default AppTabs;
