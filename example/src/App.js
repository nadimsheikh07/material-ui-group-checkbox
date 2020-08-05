import React from 'react'

import { MaterialUiGroupCheckBox } from 'material-ui-group-checkbox'

const items = [
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
        id: 5,
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
    const options = {
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
      <MaterialUiGroupCheckBox items={items} options={options} handleInputChange={this.handleInputChange} />
    )
  }
}

export default App
