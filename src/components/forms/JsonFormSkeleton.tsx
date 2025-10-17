import { FC, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from '../custom/rating/RatingControl';
import ratingControlTester from '../custom/rating/ratingControlTester';
import { Section } from '../../App';

import todoSchema from '../../schema/example/schema.json';
import todoUiSchema from '../../schema/example/uischema.json';
import TodoRegistry from '../../schema/example/typedExample';

import carSchema from '../../schema/carRegistry/schema.json'
import carUiSchema from '../../schema/carRegistry/uischema.json'
import CarRegistry from '../../schema/carRegistry/typedCarRegistry'

const classes = {
  container: {
    padding: '1rem',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

interface JsonFormSkeletonProps {
  activeSection: Section
  schema?: any
  uiSchema?: any
}

export const JsonFormSkeleton: FC<JsonFormSkeletonProps> = ({ activeSection, schema, uiSchema }) => {

  console.log(schema)
  console.log(uiSchema)

  const [data, setData] = useState<object>({});
  const [formData, setFormData] = useState<string>("");
  const [formState, setFormState] = useState<number>(0);

  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const legacy_schema = activeSection === "registry" ? carSchema : todoSchema
  const legacy_ui_schema = activeSection === "registry" ? carUiSchema : todoUiSchema
  const legacy_title: string = activeSection === "registry" ? "Car registry" : "TODO list sample"

  const setCurrentState = () =>{
    if (schema === null && activeSection !== "upload"){
      setFormState(0)
    }else if (schema === null){
      setFormState(1)
    }
  }

  const useDataDetails = () => {
    alert(`Data submitted: ${stringifiedData}`)
    const final_data = JSON.parse(stringifiedData)
    console.log(final_data)
    // if (activeSection === 'registry') {
    //   const jsonData = JSON.parse(stringifiedData) as CarRegistry
    //   setFormData(jsonData.car_model)
    // } else {
    //   const jsonData = JSON.parse(stringifiedData) as TodoRegistry
    // }
    
  };
  return (
    <Grid
      container
      justifyContent={'center'}
      spacing={1}
      style={classes.container}>
      <Grid>
        <Typography variant={'h4'}>
          {schema === null ? "Sample schema view" : activeSection === "upload" ? "Sample schema view" : legacy_title}
        </Typography>
        <div style={classes.demoform}>
          {activeSection !== "upload" ? (
            <JsonForms
            schema={legacy_schema}
            uischema={legacy_ui_schema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
            />
          ) : schema === null ? (
            <></>
          ) : (
            <JsonForms
            schema={schema}
            uischema={uiSchema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
            />
          )}
        </div>
        <Button
          style={classes.resetButton}
          onClick={useDataDetails}
          color="primary"
          variant="contained"
          data-testid="clear-data">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

/* 
Radio button
Numered arrays with different elements inside
Sorting arrays with buttons and elements inside
drop down
rating scale
possible to switch languages (i18n)
time picker
date picker
multiselect

Horizontal, vertical and group layouts

categorization to create different pages or form tabs

rules to show or not the elements, nor, activate
*/