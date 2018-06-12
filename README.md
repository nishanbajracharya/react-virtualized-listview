# react-virtualized-listview
A simple virtualized listview inspired by react-virtualized

## Getting started
The first step is to add `react-virtualized-listview` into your project.

```sh
$ npm install --save react-virtualized-listview
```

## Usage
Import the package into your project using the `import` statement
```js
import List from 'react-virtualized-listview';
```

### Example
```jsx
const data = [1, 2, 3, 4, 5];

<List
  source={data}
  rowHeight={40}
  renderItem={({ index, style }) => (
    <div key={index} style={style}>
      Hello {index}
    </div>
  )}
/>
```

## API
|      Prop     | Default | Required? |                                                                                                             Description                                                                                                            |
|:-------------:|:-------:|:---------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| source        |   [ ]   |    Yes    | An array of the input source. The array is iterated over and index of each item is returned in the `renderItem` prop.                                                                                                              |
| rowHeight     |    24   |     No    | The height of each row in the list.                                                                                                                                                                                                |
| overScanCount |    5    |     No    | The number of rows to render above and below the visible list window. This is to have some rows already rendered while scrolling above or below the visible list window so that they don't pop in as soon as the list is scrolled. |
| renderItem    |         |    Yes    | The function that is called when rendering each row.                                                                                                                                                                               |

## Features planned for next release
- Lists with dynamic height
- Expose internal components using default CSS classnames, custom classname injection and refs

## Contributing
To contribute, follow one of the two options:

- **Open an Issue**

  Open an issue detailing:
  1. What the issue is
  2. Steps to reproduce
  3. Possible solutions

  Note: These details are recommended but are entirely optional.

- **Send a Pull Request**

  Fork this project and send a pull request to the `master` branch.

## License
MIT
