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
