import React, { Component, createRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { List, AutoSizer } from "react-virtualized";
import "./list.css";

const listStyle = { overflowX: false, overflowY: false };

class ScrollList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      scrollToIndex: 0,
      height: 400,
      overscanRowCount: 10,
      rowHeight: 25,
      rowCount: this.props.countries.length,
      width: 400
    };
  }

  list = createRef();
  scrollBar = createRef();

  handleClick = e => {
    e.preventDefault();
    let scrollTo = this.state.scrollToIndex * this.state.rowHeight;
    this.scrollBar.current.view.scroll({
      top: scrollTo,
      behavior: "smooth"
    });
  };

  handleScroll = e => {
    const { scrollTop } = e.target;
    const { Grid } = this.list.current;
    Grid.handleScrollEvent({ scrollTop });
  };

  onScrollToRowChange = e => {
    let scrollToIndex = Math.min(
      this.state.rowCount - 1,
      parseInt(e.target.value, 10)
    );

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }
    this.setState({ scrollToIndex });
  };

  renderRow = ({ index, key, isScrolling, style }) => {
    const { countries } = this.props;
    return (
      <div key={key} style={style}>
        <div className="row">
          {countries[index].code} - {countries[index].name}
        </div>
      </div>
    );
  };

  render() {
    const { rowCount, rowHeight } = this.state;

    return (
      <div className="container">
        <div className="input">
          <form onSubmit={this.handleClick}>
            <span>Scroll to Index</span>
            <input
              label="Scroll to Index"
              name="onScrollTo"
              placeholder="Index..."
              onChange={e => this.onScrollToRowChange(e)}
              value={this.state.scrollToIndex || ""}
            />
            <button onClick={e => this.handleClick(e)}>Scroll</button>
          </form>
        </div>

        <AutoSizer>
          {({ height, width }) => (
            <Scrollbars
              ref={this.scrollBar}
              onScroll={this.handleScroll}
              style={{ height, width }}
              autoHide
              renderTrackVertical={props => (
                <div {...props} className="track-vertical" />
              )}
              renderThumbVertical={props => (
                <div {...props} className="thumb-vertical" />
              )}
              renderView={props => <div {...props} className="view" />}
            >
              <List
                height={height}
                width={width - 50}
                rowHeight={rowHeight}
                rowRenderer={this.renderRow}
                style={listStyle}
                ref={this.list}
                rowCount={rowCount}
              />
            </Scrollbars>
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default ScrollList;
