import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const styles = () => ({
  root: {
    width: '100%'
  }
})

class MaterialUiGroupCheckBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      selectedItems: []
    }
  }

  handleChange = (e, value) => {
    e.persist()
    const { options } = this.props
    const selectedItems = options.value

    if (e.target.checked) {
      selectedItems.push(value)
    } else {
      const index = selectedItems.indexOf(value)
      if (index >= 0) {
        selectedItems.splice(index, 1)
      }
    }

    const event = {
      target: {
        name: options.name,
        value: selectedItems
      }
    }
    this.props.handleInputChange(event)
  }

  handleCheckAll = (e, value) => {
    e.persist()
    const { options } = this.props
    const selectedItems = options.value

    if (e.target.checked) {
      if (value.children) {
        value.children.forEach((element) => {
          const index = selectedItems.indexOf(this.getChildValue(element))
          if (index >= 0) {
            selectedItems.splice(index, 1)
          }
          selectedItems.push(this.getChildValue(element))
        })
      }
    } else {
      if (value.children) {
        value.children.forEach((element) => {
          const index = selectedItems.indexOf(this.getChildValue(element))
          if (index >= 0) {
            selectedItems.splice(index, 1)
          }
        })
      }
    }

    const event = {
      target: {
        name: options.name,
        value: selectedItems
      }
    }
    this.props.handleInputChange(event)
  }

  getLabel = (element) => {
    const { options } = this.props
    return element[options.getOptionLabel]
  }

  getValue = (element) => {
    const { options } = this.props
    return element[options.getOptionValue]
  }

  getChildLabel = (element) => {
    const { options } = this.props
    return element[options.getChildOptionLabel]
  }

  getChildValue = (element) => {
    const { options } = this.props
    return element[options.getChildOptionValue]
  }

  render() {
    const { options, items } = this.props
    return (
      <React.Fragment>
        <FormControl error={!!options.error} fullWidth>
          <FormLabel component='legend'>{options.label}</FormLabel>
          {items &&
            items.map((option) => {
              const mainLabel = this.getLabel(option)
              let parentChecked = false
              const childrenIds = option.children.map(
                (childrenOption) => childrenOption[options.getChildOptionValue]
              )

              childrenIds.forEach((element) => {
                if (options.value.includes(element)) {
                  parentChecked = true
                }
              })

              return (
                <Accordion key={`${options.name}Accordion${mainLabel}`}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={mainLabel}
                    id={this.getValue(option)}
                  >
                    <FormControlLabel
                      onClick={(event) => event.stopPropagation()}
                      onFocus={(event) => event.stopPropagation()}
                      control={
                        <Checkbox
                          checked={parentChecked}
                          onChange={(e) => this.handleCheckAll(e, option)}
                        />
                      }
                      label={mainLabel}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <Grid container>
                        {option.children &&
                          option.children.map((childrenOption) => {
                            let checked = false
                            const label = this.getChildLabel(childrenOption)
                            if (options.value) {
                              checked = options.value.includes(
                                this.getChildValue(childrenOption)
                              )
                            }
                            return (
                              <Grid
                                container
                                item
                                sm={12}
                                md={6}
                                lg={6}
                                key={`${options.name}FormControlLabel${label}`}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={checked}
                                      onChange={(e) =>
                                        this.handleChange(
                                          e,
                                          this.getChildValue(childrenOption)
                                        )
                                      }
                                    />
                                  }
                                  label={label}
                                />
                              </Grid>
                            )
                          })}
                      </Grid>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              )
            })}

          {options.error && <FormHelperText>{options.error}</FormHelperText>}
        </FormControl>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(MaterialUiGroupCheckBox)
