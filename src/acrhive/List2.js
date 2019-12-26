import React, { Component } from "react";

import { Scrollbars } from "react-custom-scrollbars";
import { List, AutoSizer } from "react-virtualized";
import WindowScroller from "WindowScroller";
import "./list.css";

const rowStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  lineHeight: "25px",
  textAlign: "left"
};

class ScrollList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      scrollToIndex: 0,
      listHeight: 300,
      overscanRowCount: 10,
      listRowHeight: 25,
      rowCount: this.props.countries.length,
      width: 300
    };
  }

  listRef = React.createRef();

  renderRow = ({ index, key, style }) => {
    const { countries } = this.props;
    return (
      <div key={key} style={style}>
        <div style={rowStyle}>
          {countries[index].code} - {countries[index].name}
        </div>
      </div>
    );
  };

  onScrollToRowChange(e) {
    const { rowCount } = this.state;

    let scrollToIndex = Math.min(rowCount - 1, parseInt(e.target.value, 10));

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    this.setState({ scrollToIndex });
  }

  handleUpdate() {
    this.scrollBar.scrollToBottom();
  }

  render() {
    const {
      listHeight,
      listRowHeight,
      overscanRowCount,
      rowCount,
      scrollToIndex,
      width
    } = this.state;

    return (
      <div>
        <div>
          &nbsp;Scroll to&nbsp;
          <input
            label="Scroll to"
            name="onScrollToRow"
            placeholder="Index..."
            onChange={e => this.onScrollToRowChange(e)}
            value={scrollToIndex || ""}
          />
          &nbsp; List height&nbsp;
          <input
            label="List height"
            name="listHeight"
            onChange={event =>
              this.setState({
                listHeight: parseInt(event.target.value, 10) || 1
              })
            }
            value={listHeight}
          />
          &nbsp; Overscan&nbsp;
          <input
            label="Overscan"
            name="overscanRowCount"
            onChange={event =>
              this.setState({
                overscanRowCount: parseInt(event.target.value, 10) || 0
              })
            }
            value={overscanRowCount}
          />
        </div>
        <div style={{ width: "100%", height: 300 }}>
          <AutoSizer>
            {({ width, height }) => {
              return (
                <Scrollbars style={{ width, height }}>
                  <List
                    ref={this.listRef}
                    height={4500}
                    overscanRowCount={overscanRowCount}
                    rowCount={rowCount}
                    rowHeight={listRowHeight}
                    rowRenderer={this.renderRow}
                    scrollToIndex={scrollToIndex}
                    width={400}
                  />
                </Scrollbars>
              );
            }}
          </AutoSizer>
          }
        </div>

        {/* <div style={{ width: 400, height: 450 }}>
          <AutoSizer disableHeight>
            {() => (
              <Scrollbars
                onScroll={this.handleScroll}
                style={{ width: 400, height: 300 }}
                autoHide
                ref={e => (this.scrollBar = e)}
                onUpdate={this.handleUpdate.bind(this)}
              >
                <List
                  ref={this.listRef}
                  height={450}
                  overscanRowCount={overscanRowCount}
                  rowCount={rowCount}
                  rowHeight={listRowHeight}
                  rowRenderer={this.renderRow}
                  scrollToIndex={scrollToIndex}
                  width={400}
                />
              </Scrollbars>
            )}
          </AutoSizer>
        </div> */}
      </div>
    );
  }
}

export default ScrollList;
