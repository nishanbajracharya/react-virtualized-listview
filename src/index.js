import React from 'react';
import ReactDOM from 'react-dom';

export default class List extends React.Component {

  constructor() {
    super();

    this.state = {
      scrollTop: 0,
      visibleHeight: 0
    };
  }

  getCount = () => this.props.source.length;

  getScrollPosition = () => this.state.scrollTop;

  getVisibleHeight = () => this.state.visibleHeight;

  getHeight = () => this.getCount() * this.props.rowHeight;

  render = () => <div />;
}

List.defaultProps = {
  source: [],
  rowHeight: 24,
  overScanCount: 5,
};
