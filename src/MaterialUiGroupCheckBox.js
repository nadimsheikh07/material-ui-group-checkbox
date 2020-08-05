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
import { Grid } from '@material-ui/core'

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
      items: [],
      selectedItems: [],
      expanded: null
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

  accordionHandleChange = (value) => {
    const { expanded } = this.state
    if (expanded === value) {
      this.setState({ expanded: null })
    } else {
      this.setState({ expanded: value })
    }
  }

  render() {
    const { options, classes, items } = this.props
    const { expanded } = this.state

    return (
      <React.Fragment>
        <FormControl error={!!options.error} fullWidth>
          <FormLabel component='legend'>{options.label}</FormLabel>
          {items &&
            items.map((option) => {
              const mainLabel = this.getLabel(option)
              return (
                <Accordion
                  key={`${options.name}Accordion${mainLabel}`}
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
