import React from 'react';
import ReactDOM from 'react-dom';

import List from 'react-virtualized-listview';

import './styles.css';

const data = [...Array(10000).keys()];

const listStyle = {
  item: {
    padding: 10,
    boxSizing: 'border-box',
    borderBottom: '1px solid #eee'
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      virtualized: true,
    };

    this.toggleVirtualized = this.toggleVirtualized.bind(this);
  }

  toggleVirtualized() {
    this.setState({
      virtualized: !this.state.virtualized
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleVirtualized()}>Toggle</button>
        <p>{this.state.virtualized ? 'With Virtualized List. 10000 list items. Toggling will take a while to load.' : 'Without Virtual List. 10000 list items. Toggling will load instantly.'}</p>
        <div className="App">
          {this.state.virtualized ? <List
            source={data}
            rowHeight={40}
            renderItem={({ index, style }) => (
              <div key={index} style={{ ...listStyle.item, ...style }}>
                Hello {index}
              </div>
            )}
          />
            : <div className="list-wrapper">
              {
                data.map(index => <div key={index} style={{ ...listStyle.item, height: 40 }}>
                  Hello {index}
                </div>)
              }
            </div>}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
