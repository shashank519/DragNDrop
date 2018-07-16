import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  notification,
  Select,
  Button,
  Icon,
  Modal,
  Input,
  message
} from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SortableTree, { removeNodeAtPath } from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-full-node-drag";
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
      items: [],
      selected: [],
      selected2: [],
      selected3: [],
      selected4: [],
      selected5: [],
      droppableTree: [],
      visible: false,
      disabledDrag: true,
      id: "",
      description: "",
      isDisable: true
    };
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

  componentDidMount() {
    Promise.all([
      fetch("http://127.0.0.1:9000/register/team/"),
      fetch("http://127.0.0.1:9000/register/level/"),
      fetch("http://127.0.0.1:9000/register/product/"),
      fetch("http://127.0.0.1:9000/register/channel/"),
      fetch("http://127.0.0.1:9000/register/payperiod/"),
      fetch("http://127.0.0.1:9000/register/component/")
    ])
      .then(([team, level, product, channel, payperiod, component]) => {
        return Promise.all([
          team.json(),
          level.json(),
          product.json(),
          channel.json(),
          payperiod.json(),
          component.json()
        ]);
      })
      .then(([team, level, product, channel, payperiod, component]) => {
        this.setState({
          items: team,
          selected: level,
          selected2: product,
          selected3: channel,
          selected4: payperiod,
          selected5: component
        });
      })
      .catch(e => console.log(e));
  }

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
        return;
      }
      if (source.droppableId === "droppable3") {
        state = { selected2: items };
        return;
      }
      if (source.droppableId === "droppable4") {
        state = { selected3: items };
        return;
      }
      if (source.droppableId === "droppable5") {
        state = { selected4: items };
        return;
      }
      if (source.droppableId === "droppable6") {
        state = { selected5: items };
        return;
      }
      if (source.droppableId === "dropTree") {
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

      this.setState({
        // items: result.droppable ? result.droppable : this.state.items,
        // selected: result.droppable2 ? result.droppable2 : this.state.selected,
        // selected2: result.droppable3 ? result.droppable3 : this.state.selected2,
        // selected3: result.droppable4 ? result.droppable4 : this.state.selected3,
        // selected4: result.droppable5 ? result.droppable5 : this.state.selected4,
        // selected5: result.droppable6 ? result.droppable6 : this.state.selected5,
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
      visible: true
    });
    if (type === "team") {
      this.state.items.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
    } else if (type === "level")
      this.state.selected.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
    else if (type === "product")
      this.state.selected2.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
    else if (type === "channel")
      this.state.selected3.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
    else if (type === "component")
      this.state.selected5.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
  };

  deleteRow = (itemId, type) => {
    if (type === "team") {
      let items = -1;
      this.state.items.forEach((item, index) => {
        if (item.itemId === itemId) items = index;
      });
      // this.setState({ items });
      // this.state.items.map(item => {
      //   if (item.teamId === itemId) {
      //   }
      // });
    } else if (type === "level")
      this.state.selected.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
    else if (type === "product")
      this.state.selected2.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
    else if (type === "channel")
      this.state.selected3.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
    else if (type === "component")
      this.state.selected5.map(item => {
        if (item.teamId === itemId) {
          this.setState({
            id: item.teamId,
            description: item.teamDescription
          });
        }
      });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handelPayperiod = e => {
    this.setState({ isDisable: false });
  };

  handleTreeOnChange = treeData => {
    this.setState({ droppableTree: treeData });
  };

  saveTree = () => {
    console.log("Mapping Data", this.state.droppableTree);
  };
  removeNodeFromTree = rowInfo => {
    let { node, treeIndex, path } = rowInfo;
    // console.log("children", node);
    if (node.children && node.children.length) {
      message.error("Parent node can't be deleted");
      return;
    }
    const removeFromTree = (parent, childNameToRemove) => {
      parent.children = parent.children
        .filter(function(child) {
          return child.title !== childNameToRemove;
        })
        .map(function(child) {
          return removeFromTree(child, childNameToRemove);
        });
      return parent;
    };
    const newTree = removeFromTree(
      { children: this.state.droppableTree },
      rowInfo.node.title
    );
    this.setState({ droppableTree: newTree.children });
  };

  filterData = (data, predicate) => {
    return !data
      ? null
      : data.reduce((list, entry) => {
          let clone = null;
          if (predicate(entry)) {
            clone = Object.assign({}, entry);
          } else if (entry.children != null) {
            let children = this.filterData(entry.children, predicate);
            if (children.length > 0) {
              clone = Object.assign({}, entry, { children: children });
            }
          }

          clone && list.push(clone);
          return list;
        }, []);
  };

  render() {
    return (
      <Content style={{ padding: "25px 70px" }}>
        <Modal
          title="Edit/View"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            value={this.state.id}
            placeholder="Id"
            style={{ marginBottom: "15px" }}
          />
          <Input value={this.state.description} placeholder="Description" />
        </Modal>
        <Select
          placeholder="Select Payperiod"
          style={{ width: 150, marginBottom: 30 }}
          onChange={this.handelPayperiod}
        >
          {this.state.selected4.map((payperiod, i) => (
            <Option key={i} value={payperiod.payperiodId}>
              {payperiod.description}
            </Option>
          ))}
        </Select>
        <div disabled={this.state.disabledDrag}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Row>
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
                                        <div style={{ float: "right" }}>
                                          <Icon
                                            style={{
                                              color: "blue",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.showModal(
                                                item.teamId,
                                                "team"
                                              )
                                            }
                                            type="edit"
                                          />{" "}
                                          |{" "}
                                          <Icon
                                            style={{
                                              color: "red",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.deleteRow(
                                                item.teamId,
                                                "team"
                                              )
                                            }
                                            type="delete"
                                          />
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
                                item.levelId && (
                                  <Draggable
                                    key={index}
                                    draggableId={item.levelId + index}
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
                                        {item.levelId}
                                        <div style={{ float: "right" }}>
                                          <Icon
                                            style={{
                                              color: "blue",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.showModal(
                                                item.levelId,
                                                "level"
                                              )
                                            }
                                            type="edit"
                                          />{" "}
                                          |{" "}
                                          <Icon
                                            style={{
                                              color: "red",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.deleteRow(
                                                item.levelId,
                                                "level"
                                              )
                                            }
                                            type="delete"
                                          />
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
                                item.productId && (
                                  <Draggable
                                    key={index}
                                    draggableId={item.productId + index}
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
                                        {item.productId}
                                        <div style={{ float: "right" }}>
                                          <Icon
                                            style={{
                                              color: "blue",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.showModal(
                                                item.productId,
                                                "product"
                                              )
                                            }
                                            type="edit"
                                          />{" "}
                                          |{" "}
                                          <Icon
                                            style={{
                                              color: "red",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.deleteRow(
                                                item.productId,
                                                "product"
                                              )
                                            }
                                            type="delete"
                                          />
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
                                item.channelId && (
                                  <Draggable
                                    key={index}
                                    draggableId={item.channelId + index}
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
                                        {item.channelId}
                                        <div style={{ float: "right" }}>
                                          <Icon
                                            style={{
                                              color: "blue",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.showModal(
                                                item.channelId,
                                                "channel"
                                              )
                                            }
                                            type="edit"
                                          />{" "}
                                          |{" "}
                                          <Icon
                                            style={{
                                              color: "red",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.deleteRow(
                                                item.channelId,
                                                "channel"
                                              )
                                            }
                                            type="delete"
                                          />
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
                                item.componentId && (
                                  <Draggable
                                    key={index}
                                    draggableId={item.componentId + index}
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
                                        {item.componentId}
                                        <div style={{ float: "right" }}>
                                          <Icon
                                            style={{
                                              color: "blue",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.showModal(
                                                item.componentId,
                                                "component"
                                              )
                                            }
                                            type="edit"
                                          />{" "}
                                          |{" "}
                                          <Icon
                                            style={{
                                              color: "red",
                                              cursor: "pointer"
                                            }}
                                            onClick={() =>
                                              this.deleteRow(
                                                item.componentId,
                                                "component"
                                              )
                                            }
                                            type="delete"
                                          />
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
                        backgroundColor: snapshot.isDraggingOver
                          ? "blue"
                          : "grey"
                      }}
                      className="droppable-area"
                    >
                      <SortableTree
                        treeData={this.state.droppableTree}
                        onChange={treeData => this.handleTreeOnChange(treeData)}
                        generateNodeProps={rowInfo => ({
                          buttons: [
                            <div>
                              <button
                                label="Delete"
                                onClick={event =>
                                  this.removeNodeFromTree(rowInfo)
                                }
                              >
                                X
                              </button>
                            </div>
                          ],
                          style: { height: "50px" }
                        })}
                      />
                    </div>
                  )}
                </Droppable>
              </Col>
            </Row>
          </DragDropContext>
        </div>
        <div
          style={{ float: "right", marginTop: "15px", marginRight: "100px" }}
        >
          <Button
            disabled={this.state.isDisable}
            type="primary"
            onClick={this.saveTree}
          >
            Save Mapping
          </Button>
        </div>
      </Content>
    );
  }
}

var NodeComponent = ({ itemInfo: { node } }) => {
  return <div>{node.title}</div>;
};

export default DndList;
