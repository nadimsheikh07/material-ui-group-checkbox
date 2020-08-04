# material-ui-group-checkbox

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/material-ui-group-checkbox.svg)](https://www.npmjs.com/package/material-ui-group-checkbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save material-ui-group-checkbox
```

## Usage

```jsx
import React from 'react'

import { MaterialUiGroupCheckBox } from 'material-ui-group-checkbox'

const options = [
  {
    id: 1,
    name: "User Manager",
    children: [
      {
        id: 1,
        description: "can access user manager ?",
      },
      {
        id: 2,
        description: "can add user manager ?",
      },
      {
        id: 3,
        description: "can edit user manager ?",
      },
      {
        id: 4,
        description: "can delete user manager ?",
      }
    ]
  },
  {
    id: 2,
    name: "Master Manager",
    children: [
      {
        id: 2,
        description: "can access master manager ?",
      }
    ]
  }
]

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      value: []
    }
  }

  handleInputChange = (data) => {
    this.setState({
      value: data.target.value
    })
  }

  render() {
    const { value } = this.state
    const fieldData = {
      name: 'permissions',
      label: 'Permissions',
      error: '',
      value: value,
      getOptionLabel: 'name',
      getOptionValue: 'id',
      getChildOptionLabel: 'description',
      getChildOptionValue: 'id',
    }

    return (
      <MaterialUiGroupCheckBox options={options} fieldData={fieldData} handleInputChange={this.handleInputChange} />
    )
  }
}

export default App

```

## License

MIT © [nadimsheikh07](https://github.com/nadimsheikh07)
