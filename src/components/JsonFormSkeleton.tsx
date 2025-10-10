import { FC, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './rating/RatingControl';
import ratingControlTester from './rating/ratingControlTester';
import { Section } from '../App';

import schema from '../schema/example/schema.json';
import uischema from '../schema/example/uischema.json';
import ExampleRegistry from '../schema/example/typedExample';

import carSchema from '../schema/carRegistry/schema.json'
import carUiSchema from '../schema/carRegistry/uischema.json'
import CarRegistry from '../schema/carRegistry/typedCarRegistry'

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
}

export const JsonFormSkeleton: FC<JsonFormSkeletonProps> = ({activeSection}) => {
  const [data, setData] = useState<object>({});
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const useDataDetails = () => {
    if(activeSection === 'registry'){
      const jsonData = JSON.parse(stringifiedData) as CarRegistry
    }else{
      const jsonData = JSON.parse(stringifiedData)
    }
  };
  return (
    <Grid
      container
      justifyContent={'center'}
      spacing={1}
      style={classes.container}>
      <Grid>
        <Typography variant={'h4'}>
          {activeSection === "registry" ? "Car registry" : "Example tutorial Schema"}
        </Typography>
        <div style={classes.demoform}>
          <JsonForms
            schema={activeSection === "registry" ? carSchema : schema}
            uischema={activeSection === "registry" ? carUiSchema : uischema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
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
