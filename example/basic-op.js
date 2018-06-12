import React from 'react';
import ReactDOM from 'react-dom';

import List from '../lib';

import './styles.css';

const data = [...Array(1000).keys()];

const listStyle = {
  item: {
    padding: 10,
    boxSizing: 'border-box',
    borderBottom: '1px solid #eee'
  }
};

function App() {
  return (
    <div>
      <div className="App">
        <List
          source={data}
          rowHeight={40}
          renderItem={({ index, style }) => (
            <div key={index} style={{ ...listStyle.item, ...style }}>
            Hello {index}
            </div>
          )}
        />
      </div>
      <div className="App">
        <div className="list-wrapper">
          {
            data.map(index => <div key={index} style={{ ...listStyle.item, height: 40 }}>
            Hello {index}
            </div>)
          }
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
