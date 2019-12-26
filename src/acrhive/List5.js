import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { AutoSizer, List, WindowScroller } from "react-virtualized";

import "./list.css";

const rowStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  lineHeight: "25px",
  textAlign: "left"
};

class MyWindowScroller extends React.Component {
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
  listRef = undefined;

  render() {
    return (
      <div
        className="WindowScrollerWrapper"
        style={{ width: 300, height: 300 }}
      >
        <WindowScroller className="WindowScroller">
          {({
            height,
            isScrolling,
            registerChild,
            onChildScroll,
            scrollTop
          }) => {
            return (
              <AutoSizer className="AutoSizer">
                {({ width }) => {
                  return (
                    <div
                      ref={registerChild}
                      style={{ width: 300, height: 300 }}
                    >
                      <Scrollbars style={{ width, height }}>
                        <List
                          autoHeight
                          ref={el => {
                            this.listRef = el;
                          }}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          scrollTop={scrollTop}
                          width={width}
                          height={500}
                          rowCount={this.props.countries.length}
                          rowHeight={25}
                          rowRenderer={this.renderRow}
                          overscanRowCount={2}
                        />
                      </Scrollbars>
                    </div>
                  );
                }}
              </AutoSizer>
            );
          }}
        </WindowScroller>
      </div>
    );
  }

  renderRow = ({ index, key, style }) => {
    const { countries } = this.props;
    return (
      <div key={key} style={style}>
        <div className={rowStyle}>
          {countries[index].code} - {countries[index].name}
        </div>
      </div>
    );
  };
}

export default MyWindowScroller;
