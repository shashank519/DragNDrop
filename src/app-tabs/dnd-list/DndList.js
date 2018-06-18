import React, { Component } from 'react';
import { Layout, Row, Col, notification } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SortableTree from 'react-sortable-tree';
import './DndList.css';

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
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: '100%',
  maxHeight: '600px',
  overflow: 'auto'
});

class DndList extends Component {
  state = {
    // items: getItems(10),
    // selected: getItems(5, 10),
    items: this.props.dataList,
    selected: this.treeData,
    treeData: []
    // treeData: [
    //   {title: 'Bus', field1: 'Bus', field2: 'seats', field3: 'windows', field4: 'door', field5: 'wheels'},
    //   {title: 'Train', field1: 'Train', field2: 'track', field3: 'engine', field4: 'horn', field5: 'wheels'},
    //   {title: 'Aeroplane', field1: 'Aeroplane', field2: 'air', field3: 'glass windows', field4: 'wings', field5: 'engines'}
    // ]
  };

  id2List = {
    droppable: 'items',
    droppable2: 'selected'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let {dataList} = this.props;
    let droppedElement = dataList[result.draggableId];
    let droppingElemArray = this.state.treeData;

    if(droppingElemArray.indexOf(droppedElement) >= 0){
      this.openNotificationWithIcon('error', 'Error', 'List already has this data.');
      return;
    }

    if(this.state.treeData.length <= 5){
      this.setState((prevState, prevProps)=>{
        return { treeData: [...this.state.treeData, droppedElement] }
      })
    } else {
      this.openNotificationWithIcon('info', 'Information', 'List limit reached. Cannot add more data to list.');
    }

    setTimeout(()=>{
      console.log(this.state);
    }, 2000)
  };

  openNotificationWithIcon = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  render() {
    return (
       <Content style={{ padding: '25px 70px' }}>
          <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate}>
            <Row>
              <Col span={12} style={{padding: '20px 120px'}}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}>
                      {this.props.dataList.length ? this.props.dataList.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={index}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}>
                              {item.field1}
                            </div>
                          )}
                        </Draggable>
                      )): <span>Please add data to list.</span>}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col span={12}>
                <Droppable droppableId="droppable2">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={{height: '800px', borderColor: 'grey'}} className="droppable-area">
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