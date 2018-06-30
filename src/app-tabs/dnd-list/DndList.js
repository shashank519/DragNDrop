import React, { Component } from "react";
import { Layout, Row, Col, notification } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SortableTree from "react-sortable-tree";
import "./DndList.css";

const { Content } = Layout;

// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k + offset}`,
//     content: `item ${k + offset}`
//   }));

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
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	// change background colour if dragging
	background: isDragging ? "lightgreen" : "grey",
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? "lightblue" : "lightgrey",
	padding: grid,
	width: "100%",
	maxHeight: "600px",
	overflow: "auto"
});

class DndList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listTeam: this.props.dataListTeam,
			listLevel: this.props.dataListLevel,
			listProduct: this.props.dataListProduct,
			listChannel: this.props.dataListChannel,
			listPayperiod: this.props.dataListPayperiod,
			listComponent: this.props.dataListComponent,
			selected: this.treeData,
			treeData: []
		};

		setTimeout(() => {
			console.log(this.state);
		}, 2000);
	}

	id2List = {
		droppableTeam: "items",
		droppable2: "selected"
	};

	getList = id => this.state[this.id2List[id]];

	onDragEnd = result => {
		console.log(result);
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		let { listTeam } = this.state;
		let droppedElement = listTeam[result.draggableId];
		let droppingElemArray = this.state.treeData;

		/*if (droppingElemArray.indexOf(droppedElement) >= 0) {
			this.openNotificationWithIcon(
				"error",
				"Error",
				"List already has this data."
			);
			return;
		}*/

		/*if (this.state.treeData.length <= 5) {*/
		this.setState((prevState, prevProps) => {
			return { treeData: [...this.state.treeData, droppedElement] };
		});
		/*} else {
			this.openNotificationWithIcon(
				"info",
				"Information",
				"List limit reached. Cannot add more data to list."
			);
		}*/

		setTimeout(() => {
			console.log(this.state);
		}, 2000);
	};

	openNotificationWithIcon = (type, msg, desc) => {
		notification[type]({
			message: msg,
			description: desc
		});
	};

	render() {
		return (
			<Content style={{ padding: "25px 70px" }}>
				<DragDropContext
					onDragEnd={this.onDragEnd}
					onDragStart={this.onDragStart}
					onDragUpdate={this.onDragUpdate}
				>
					<Row>
						<Col span={16} style={{ padding: "20px 120px" }}>
							<Droppable droppableId="droppableTeam">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										{this.state.listTeam && this.state.listTeam.length
											? this.state.listTeam.map((item, index) => (
													<Draggable
														key={index}
														draggableId={index}
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
															</div>
														)}
													</Draggable>
											  ))
											: null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

							<Droppable droppableId="droppableLevel">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										{this.state.listLevel && this.state.listLevel.length
											? this.state.listLevel.map((item, index) => (
													<Draggable
														key={index}
														draggableId={index}
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
															</div>
														)}
													</Draggable>
											  ))
											: null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

							<Droppable droppableId="droppableProduct">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										{this.state.listProduct && this.state.listProduct.length
											? this.state.listProduct.map((item, index) => (
													<Draggable
														key={index}
														draggableId={index}
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
															</div>
														)}
													</Draggable>
											  ))
											: null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

							<Droppable droppableId="droppableChannel">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										{this.state.listChannel && this.state.listChannel.length
											? this.state.listChannel.map((item, index) => (
													<Draggable
														key={index}
														draggableId={index}
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
															</div>
														)}
													</Draggable>
											  ))
											: null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

							<Droppable droppableId="droppablePayperiod">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										{this.state.listPayperiod && this.state.listPayperiod.length
											? this.state.listPayperiod.map((item, index) => (
													<Draggable
														key={index}
														draggableId={index}
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
															</div>
														)}
													</Draggable>
											  ))
											: null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>

							<Droppable droppableId="droppableComponent">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
									>
										{this.state.listComponent && this.state.listComponent.length
											? this.state.listComponent.map((item, index) => (
													<Draggable
														key={index}
														draggableId={index}
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
															</div>
														)}
													</Draggable>
											  ))
											: null}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</Col>
						<Col span={8}>
							<Droppable droppableId="droppable2">
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										style={{ height: "800px", borderColor: "grey" }}
										className="droppable-area"
									>
										<SortableTree
											treeData={this.state.treeData}
											onChange={treeData => null}
										/>
									</div>
								)}
							</Droppable>
						</Col>
					</Row>
				</DragDropContext>
			</Content>
		);
	}
}

export default DndList;
