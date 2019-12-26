import React, { useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Scrollbars } from "react-custom-scrollbars";

import "./styles.css";

const CustomScrollbars = ({ onScroll, forwardedRef, style, children }) => {
  const refSetter = useCallback(scrollbarsRef => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, []);

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: "hidden" }}
      onScroll={onScroll}
      autoHide
    >
      {children}
    </Scrollbars>
  );
};

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

const Row = ({ index, style }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    Row {index}
  </div>
);

const listRef = React.createRef();

const ScrollList = props => {
  const [scrollToIndex, setScrollToIndex] = useState(20);
  const rowCount = props.countries.length;

  const onScrollToRowChange = e => {
    let scrollToIndex = Math.min(rowCount - 1, parseInt(e.target.value, 10));

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    setScrollToIndex(scrollToIndex);
  };
  return (
    <div>
      <div>
        &nbsp;Scroll to&nbsp;
        <input
          label="Scroll to"
          name="onScrollToRow"
          placeholder="Index..."
          onChange={e => onScrollToRowChange(e)}
          value={scrollToIndex || ""}
        />
      </div>

      <List
        ref={listRef}
        className="List"
        height={300}
        itemCount={rowCount}
        itemSize={25}
        width={300}
        outerElementType={CustomScrollbarsVirtualList}
        scrollToIndex={scrollToIndex}
      >
        {Row}
      </List>

      <button
        onClick={() => {
          listRef.current.scrollToItem(100);
        }}
      >
        scroll to 100
      </button>
    </div>
  );
};

export default ScrollList;
