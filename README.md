# react-asker

> React replacement for window.prompt(), .confirm(), and .alert()

[![NPM](https://img.shields.io/npm/v/react-asker.svg)](https://www.npmjs.com/package/react-asker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-asker
```

## Usage

```jsx
import React, { Component } from 'react'
import { asker, AskerView } from 'react-asker'

export default class App extends Component {
  confirm = () => {
    asker.confirm({
      title: "Do you really want delete this element?",
      onAccept: () => console.log("Deleted!"),
      acceptCaption: "yes",
      cancelCaption: "no",
    });
  }

  prompt = () => {
    asker.prompt({
      title: "Type new name",
      defaultValue: "Henry",
      onAccept: name => console.log(`Changed name to ${name}!`),
      acceptCaption: "yes",
      cancelCaption: "no",
    });
  }

  componentDidMount() {
    asker.close();
  }

  componentWillUnmount() {
    asker.close();
  }

  render () {
    return (
      <div>
        <AskerView zIndex={1000} />
        <div onClick={this.confirm}>CONFIRM</div>
        <div onClick={this.prompt}>PROMPT</div>
      </div>
    )
  }
}
```

## License

MIT © [buuuudzik](https://github.com/buuuudzik)
