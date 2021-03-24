import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const style = {
  container: (props = {}) => {
    if (!props || (!props.width || !props.height)) {
      return {};
    }

    return {
      width: props.width,
      position: 'relative',
      height: props.height,
    };
  },
  listWrapper: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    position: 'absolute'
  },
  list: height => ({
    height,
    position: 'relative'
  }),
  item: (props) => ({
    height: props.height,
    left: 0,
    right: 0,
    top: props.top,
    position: 'absolute'
  })
};

export default class List extends React.Component {
  constructor() {
    super();

    this.state = {
      scrollTop: 0,
      visibleHeight: 0,
      mapHeight: {},
      maxRowHeight: 0,
      totalHeight: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    const mapHeight = {};
    let totalHeight = 0;
    let maxRowHeight = 0;
    let top = 0;
    if (props.source.length !== Object.keys(state.mapHeight).length) {
      props.source.forEach((item, index) => {
        mapHeight[index] = {
          height: item.height,
          top: top
        };
        top += item.height;
        totalHeight += item.height;
        maxRowHeight = maxRowHeight > item.height ? maxRowHeight : item.height;
      });
      return Object.assign(state, {
        mapHeight,
        totalHeight,
        maxRowHeight
      });
    }
    
    return state;
  }

  componentDidMount() {
    this.getWrapper().addEventListener(
      'scroll',
      e => {
        this.setScrollPosition(e);
      },
      true
    );

    const visibleHeight = parseFloat(
      window
        .getComputedStyle(this.getWrapper(), null)
        .getPropertyValue('height')
    );

    this.setState({ visibleHeight });
  }

  getCount = () => this.props.source.length;

  getScrollPosition = () => this.state.scrollTop;

  getVisibleHeight = () => this.state.visibleHeight;

  getHeight = () => this.state.totalHeight;

  getWrapper = () => ReactDOM.findDOMNode(this.listWrapper);

  getDefaultHeightWidth = () =>
    this.props.className ? {} : { height: '100%', width: '100%' };

  setScrollPosition = event => {
    this.setState({
      scrollTop: event.target.scrollTop
    });
  };

  checkIfVisible = index => {
    const elemPosition = this.state.mapHeight[index].top;

    return (
      elemPosition >
      this.getScrollPosition() -
      this.props.overScanCount * this.state.maxRowHeight &&
      elemPosition <
      this.getScrollPosition() +
      this.state.visibleHeight +
      this.props.overScanCount * this.state.maxRowHeight
    );
  };

  renderList = () => (
    <div
      style={style.container(this.getDefaultHeightWidth())}
      className={this.props.className}
      ref={c => (this.container = c)}
    >
      <div style={style.listWrapper} ref={c => (this.listWrapper = c)}>
        <div style={style.list(this.getHeight())} ref={c => (this.list = c)}>
          {this.props.source.map(
            (_, index) =>
              this.checkIfVisible(index) &&
              this.props.renderItem({
                index: index,
                style: style.item(this.state.mapHeight[index])
              })
          )}
        </div>
      </div>
    </div>
  );

  render = () => Object.keys(this.state.mapHeight).length ? this.renderList() : null;
}

List.defaultProps = {
  source: [],
  overScanCount: 5
};

List.propTypes = {
  renderItem: PropTypes.func.isRequired,
  className: PropTypes.string,
  source: PropTypes.arrayOf(PropTypes.shape({
    height: PropTypes.string.isRequired
  })),
  overScanCount: PropTypes.number
};