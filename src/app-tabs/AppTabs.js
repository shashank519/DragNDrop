import React, { Component } from "react";
import { Tabs, notification } from "antd";

import Register from "./register/Register";
import DndList from "./dnd-list/DndList";

const TabPane = Tabs.TabPane;

class AppTabs extends Component {
	state = {
		dataListTeam: [],
		dataListLevel: [],
		dataListProduct: [],
		dataListChannel: [],
		dataListPayperiod: [],
		dataListComponent: []
	};

	setDataListTeam = value => {
		this.setState({ dataListTeam: value });
		this.openNotificationWithIcon(
			"success",
			"Success",
			"Registered successfully."
		);

		setTimeout(() => {
			console.log(this.state.dataListTeam);
		}, 2000);
	};

	setDataListLevel = value => {
		this.setState({ dataListLevel: value });

		this.openNotificationWithIcon(
			"success",
			"Success",
			"Registered successfully."
		);

		setTimeout(() => {
			console.log(this.state.dataListLevel);
		}, 2000);
	};

	setDataListProduct = value => {
		this.setState({ dataListProduct: value });
		this.openNotificationWithIcon(
			"success",
			"Success",
			"Registered successfully."
		);

		setTimeout(() => {
			console.log(this.state.dataListProduct);
		}, 2000);
	};

	setDataListChannel = value => {
		this.setState({
			dataListChannel: value
		});

		this.openNotificationWithIcon(
			"success",
			"Success",
			"Registered successfully."
		);

		setTimeout(() => {
			console.log(this.state.dataListChannel);
		}, 2000);
	};

	setDataListPayperiod = value => {
		this.setState({
			dataListPayperiod: value
		});

		this.openNotificationWithIcon(
			"success",
			"Success",
			"Registered successfully."
		);

		setTimeout(() => {
			console.log(this.state.dataListPayperiod);
		}, 2000);
	};

	setDataListComponent = value => {
		this.setState(this.state.dataListComponent);
		this.openNotificationWithIcon(
			"success",
			"Success",
			"Registered successfully."
		);

		setTimeout(() => {
			console.log(this.state.dataListComponent);
		}, 2000);
	};

	onTabChange = key => {
		console.log(key);
	};

	openNotificationWithIcon = (type, msg, desc) => {
		notification[type]({
			message: msg,
			description: desc
		});
	};

	render() {
		return (
			<Tabs onChange={this.onTabChange} type="card" animated>
				<TabPane tab="Tab 1" key="1">
					<Register
						setDataListTeam={this.setDataListTeam}
						setDataListLevel={this.setDataListLevel}
						setDataListProduct={this.setDataListProduct}
						setDataListChannel={this.setDataListChannel}
						setDataListPayperiod={this.setDataListPayperiod}
						setDataListComponent={this.setDataListComponent}
					/>
				</TabPane>
				<TabPane tab="Tab 2" key="2">
					<DndList {...this.state} />
				</TabPane>
				<TabPane tab="Tab 3" key="3">
					Content of Tab Pane 3
				</TabPane>
				<TabPane tab="Tab 4" key="4">
					Content of Tab Pane 4
				</TabPane>
				<TabPane tab="Tab 5" key="5">
					Content of Tab Pane 5
				</TabPane>
			</Tabs>
		);
	}
}

export default AppTabs;
