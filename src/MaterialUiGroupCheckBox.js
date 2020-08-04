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
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
})

class MaterialUiGroupCheckBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      selectedOptions: [],
      expanded: ''
    }
  }

  handleChange = (e, value) => {
    e.persist()
    const { fieldData } = this.props
    const selectedOptions = fieldData.value

    if (e.target.checked) {
      selectedOptions.push(value)
    } else {
      const index = selectedOptions.indexOf(value)
      if (index >= 0) {
        selectedOptions.splice(index, 1)
      }
    }

    const event = {
      target: {
        name: fieldData.name,
        value: selectedOptions
      }
    }
    this.props.handleInputChange(event)
  }

  getLabel = (element) => {
    const { fieldData } = this.props
    return element[fieldData.getOptionLabel]
  }

  getValue = (element) => {
    const { fieldData } = this.props
    return element[fieldData.getOptionValue]
  }

  getChildLabel = (element) => {
    const { fieldData } = this.props
    return element[fieldData.getChildOptionLabel]
  }

  getChildValue = (element) => {
    const { fieldData } = this.props
    return element[fieldData.getChildOptionValue]
  }

  accordionHandleChange = (expanded) => {
    this.setState({ expanded: expanded })
  }

  render() {
    const { fieldData, classes, options } = this.props
    const { expanded } = this.state

    return (
      <React.Fragment>
        <FormControl error={!!fieldData.error} fullWidth>
          <FormLabel component='legend'>{fieldData.label}</FormLabel>
          {options &&
            options.map((option) => {
              const mainLabel = this.getLabel(option)
              return (
                <Accordion
                  key={`${fieldData.name}Accordion${mainLabel}`}
                  expanded={expanded === this.getValue(option)}
                  onChange={() =>
                    this.accordionHandleChange(this.getValue(option))
                  }
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={mainLabel}
                    id={this.getValue(option)}
                  >
                    <Typography className={classes.heading}>
                      {mainLabel}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {option.children &&
                        option.children.map((childrenOption) => {
                          let checked = false
                          const label = this.getChildLabel(childrenOption)
                          if (fieldData.value) {
                            checked = fieldData.value.includes(
                              this.getChildValue(childrenOption)
                            )
                          }
                          return (
                            <FormControlLabel
                              key={`${fieldData.name}FormControlLabel${label}`}
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
                          )
                        })}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              )
            })}

          {fieldData.error && (
            <FormHelperText>{fieldData.error}</FormHelperText>
          )}
        </FormControl>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(MaterialUiGroupCheckBox)
