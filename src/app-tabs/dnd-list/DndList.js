import React, { Component } from "react";
import { Layout, Row, Col, notification, Select, Button, Icon, Modal, Input } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SortableTree from "react-sortable-tree";
import "./DndList.css";

const { Content } = Layout;
const Option = Select.Option;

const getItems = (count, offset = 0) =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k + offset}`,
		content: `item ${k + offset}`
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? "lightgreen" : "#e6e6e6",

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? "lightblue" : "#c1bfbf",
	padding: grid,
	width: 160
});

class DndList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: this.props.dataListTeam,
			selected: this.props.dataListLevel,
			selected2: this.props.dataListProduct,
			selected3: this.props.dataListChannel,
			selected4: this.props.dataListPayperiod,
			selected5: this.props.dataListComponent,
			droppableTree: [],
			visible: false,
			disabledDrag: true,
			id: '',
			description: ''
		};

		console.log(this.props);
	}

	id2List = {
		droppable: "items",
		droppable2: "selected",
		droppable3: "selected2",
		droppable4: "selected3",
		// droppable5: "selected4",
		droppable6: "selected5",
		dropTree: "droppableTree"
	};

	getList = id => this.state[this.id2List[id]];

	onDragEnd = result => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		console.log(source, destination);

		if (source.droppableId === destination.droppableId) {
			const items = reorder(
				this.getList(source.droppableId),
				source.index,
				destination.index
			);

			let state = { items };

			if (source.droppableId === "droppable2") {
				console.log("In second list");
				state = { selected: items };
			}
			if (source.droppableId === "droppable3") {
				console.log("In third list");
				state = { selected2: items };
			}
			if (source.droppableId === "droppable4") {
				console.log("In fourth list");
				state = { selected3: items };
			}
			if (source.droppableId === "droppable5") {
				console.log("In fifth list");
				state = { selected4: items };
			}
			if (source.droppableId === "droppable6") {
				console.log("In sixth list");
				state = { selected5: items };
			}
			if (source.droppableId === "dropTree") {
				console.log("In drop tree list");
				state = { droppableTree: items };
			}

			this.setState(state);
		} else {
			const result = move(
				this.getList(source.droppableId),
				this.getList(destination.droppableId),
				source,
				destination
			);
			console.log(result);

			this.setState({
				items: result.droppable ? result.droppable : this.state.items,
				selected: result.droppable2 ? result.droppable2 : this.state.selected,
				selected2: result.droppable3 ? result.droppable3 : this.state.selected2,
				selected3: result.droppable4 ? result.droppable4 : this.state.selected3,
				selected4: result.droppable5 ? result.droppable5 : this.state.selected4,
				selected5: result.droppable6 ? result.droppable6 : this.state.selected5,
				droppableTree: result.dropTree
					? result.dropTree
					: this.state.droppableTree
			});
		}
	};

	openNotificationWithIcon = (type, msg, desc) => {
		notification[type]({
			message: msg,
			description: desc
		});
	};
	showModal = (itemId, type) => {
		this.setState({
			visible: true,
		});
		if (type === 'team') {
			this.state.items.map(item => {
				if (item.teamId === itemId) {
					this.setState({
						id: item.teamId,
						description: item.teamDescription
					})
				}
			})

		}
		else if (type === 'level')
			this.state.selected.map(item => {
				if (item.teamId === itemId) {
					this.setState({
						id: item.teamId,
						description: item.teamDescription
					})
				}
			})
		else if (type === 'product')
			this.state.selected2.map(item => {
				if (item.teamId === itemId) {
					this.setState({
						id: item.teamId,
						description: item.teamDescription
					})
				}
			})
		else if (type === 'channel')
			this.state.selected3.map(item => {
				if (item.teamId === itemId) {
					this.setState({
						id: item.teamId,
						description: item.teamDescription
					})
				}
			})
		else if (type === 'component')
			this.state.selected5.map(item => {
				if (item.teamId === itemId) {
					this.setState({
						id: item.teamId,
						description: item.teamDescription
					})
				}
			})
	}

	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}

	handelPayperiod = (e) => {
		console.log('select', e)
	}

	handleTreeOnChange = treeData => {
		this.setState({ droppableTree: treeData })
	}

	render() {
		return (
			<Content style={{ padding: "25px 70px" }}>
				<Modal
					title="Edit/View"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input value={this.state.id} placeholder="Id" style={{ marginBottom: '15px' }} />
					<Input value={this.state.description} placeholder="Description" />
				</Modal>
				<Select placeholder="Select Payperiod" style={{ width: 150, marginBottom: 30 }} onChange={this.handelPayperiod}>
					{this.props.dataListPayperiod.map(payperiod => <Option value={payperiod.teamId}>{payperiod.teamDescription}</Option>)}
				</Select>
				<div disabled={this.state.disabledDrag}>
					<DragDropContext
						onDragEnd={this.onDragEnd}
					// onDragStart={this.onDragStart}
					// onDragUpdate={this.onDragUpdate}
					>
						<Row >
							<Col span={18}>
								<Row>
									<Col span={5} className={"mgtp10"}>
										<Droppable droppableId="droppable">
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													style={getListStyle(snapshot.isDraggingOver)}
												>
													<h3>Team</h3>
													{this.state.items.length &&
														this.state.items.map(
															(item, index) =>
																item.teamId && (
																	<Draggable
																		key={index}
																		draggableId={item.teamId + index}
																		index={index}
																	>
																		{(provided, snapshot) => (
																			<div
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																				style={getItemStyle(
																					snapshot.isDragging,
																					provided.draggableProps.style
																				)}
																			>
																				{item.teamId}
																				<div style={{ float: 'right' }}>
																					<Icon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.showModal(item.teamId, 'team')} type="edit" /> {' '}|{' '}
																					<Icon style={{ color: 'red', cursor: 'pointer' }} type="delete" />
																				</div>
																			</div>
																		)}
																	</Draggable>
																)
														)}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</Col>

									<Col span={5} className={"mgtp10"}>
										<Droppable droppableId="droppable2">
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													style={getListStyle(snapshot.isDraggingOver)}
												>
													<h3>Level</h3>
													{this.state.selected.length &&
														this.state.selected.map(
															(item, index) =>
																item.teamId && (
																	<Draggable
																		key={index}
																		draggableId={item.teamId + index}
																		index={index}
																	>
																		{(provided, snapshot) => (
																			<div
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																				style={getItemStyle(
																					snapshot.isDragging,
																					provided.draggableProps.style
																				)}
																			>
																				{item.teamId}
																				<div style={{ float: 'right' }}>
																					<Icon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.showModal(item.teamId, 'level')} type="edit" /> {' '}|{' '}
																					<Icon style={{ color: 'red', cursor: 'pointer' }} type="delete" />
																				</div>
																			</div>
																		)}
																	</Draggable>
																)
														)}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</Col>

									<Col span={5} className={"mgtp10"}>
										<Droppable droppableId="droppable3">
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													style={getListStyle(snapshot.isDraggingOver)}
												>
													<h3>Product</h3>
													{this.state.selected2.length &&
														this.state.selected2.map(
															(item, index) =>
																item.teamId && (
																	<Draggable
																		key={index}
																		draggableId={item.teamId + index}
																		index={index}
																	>
																		{(provided, snapshot) => (
																			<div
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																				style={getItemStyle(
																					snapshot.isDragging,
																					provided.draggableProps.style
																				)}
																			>
																				{item.teamId}
																				<div style={{ float: 'right' }}>
																					<Icon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.showModal(item.teamId, 'product')} type="edit" /> {' '}|{' '}
																					<Icon style={{ color: 'red', cursor: 'pointer' }} type="delete" />
																				</div>
																			</div>
																		)}
																	</Draggable>
																)
														)}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</Col>

									<Col span={5} className={"mgtp10"}>
										<Droppable droppableId="droppable4">
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													style={getListStyle(snapshot.isDraggingOver)}
												>
													<h3>Channel</h3>
													{this.state.selected3.length &&
														this.state.selected3.map(
															(item, index) =>
																item.teamId && (
																	<Draggable
																		key={index}
																		draggableId={item.teamId + index}
																		index={index}
																	>
																		{(provided, snapshot) => (
																			<div
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																				style={getItemStyle(
																					snapshot.isDragging,
																					provided.draggableProps.style
																				)}
																			>
																				{item.teamId}
																				<div style={{ float: 'right' }}>
																					<Icon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.showModal(item.teamId, 'channel')} type="edit" /> {' '}|{' '}
																					<Icon style={{ color: 'red', cursor: 'pointer' }} type="delete" />
																				</div>
																			</div>
																		)}
																	</Draggable>
																)
														)}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</Col>

									<Col span={5} className={"mgtp10"}>
										<Droppable droppableId="droppable6">
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													style={getListStyle(snapshot.isDraggingOver)}
												>
													<h3>Component</h3>
													{this.state.selected5.length &&
														this.state.selected5.map(
															(item, index) =>
																item.teamId && (
																	<Draggable
																		key={index}
																		draggableId={item.teamId + index}
																		index={index}
																	>
																		{(provided, snapshot) => (
																			<div
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																				style={getItemStyle(
																					snapshot.isDragging,
																					provided.draggableProps.style
																				)}
																			>
																				{item.teamId}
																				<div style={{ float: 'right' }}>
																					<Icon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.showModal(item.teamId, 'component')} type="edit" /> {' '}|{' '}
																					<Icon style={{ color: 'red', cursor: 'pointer' }} type="delete" />
																				</div>
																			</div>
																		)}
																	</Draggable>
																)
														)}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</Col>
								</Row>
							</Col>
							<Col span={6} className={"mgtp10"}>
								<Droppable droppableId="dropTree">
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											style={{
												height: "800px",
												backgroundColor: snapshot.isDraggingOver ? "blue" : "grey"
											}}
											className="droppable-area"
										>
											<SortableTree
												treeData={this.state.droppableTree}
												onChange={treeData => this.handleTreeOnChange(treeData)}
											/>
										</div>
									)}
								</Droppable>
							</Col>
						</Row>
					</DragDropContext>
				</div>
				<div style={{
					float: 'right', marginTop: '15px',
					marginRight: '100px'
				}}>
					<Button type="primary">Save Mapping</Button>
				</div>
			</Content>
		);
	}
}

export default DndList;
