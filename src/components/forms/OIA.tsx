import { useMemo, useState, useEffect } from 'react';

import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';

import '../../styles/oia.css'
import RatingControl from '../custom/rating/RatingControl';
import ratingControlTester from '../custom/rating/ratingControlTester';
import SliderControl from '../custom/slider/SliderControl'
import sliderControlTester from '../custom/slider/sliderControlTester';
import { ProjectionBill } from '../ProjectionBill';

import oiaSchema from '../../schema/oai/schema.json'
import oiaUiSchema from '../../schema/oai/uiSchema.json'

const renderers = [
    ...materialRenderers,
    //register custom renderers
    { tester: ratingControlTester, renderer: RatingControl },
    { tester: sliderControlTester, renderer: SliderControl },
];

export const OIA = () => {

    const [data, setData] = useState<object>({});
    const [showElement, setShowElement] = useState<boolean>(false);
    const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);

    const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

    useEffect(() => {
        if (!stringifiedData) return;

        const parsedData = JSON.parse(stringifiedData);

        const waterHeaters: boolean = parsedData?.replace_water_heaters !== null && parsedData?.replace_water_heaters !== undefined
        const smartThermos: boolean = parsedData?.replace_smart_thermo !== null && parsedData?.replace_smart_thermo !== undefined
        const bulbs: boolean = parsedData?.no_bulbs_slider !== null && parsedData?.no_bulbs_slider !== undefined
        const benefitYears: boolean = parsedData?.benefit_years_slider !== null && parsedData?.benefit_years_slider !== undefined

        if (waterHeaters && smartThermos && bulbs && benefitYears) {
            setJsonData(parsedData)
            setShowElement(true)
        } else {
            setJsonData(null)
            setShowElement(false)
        }
    }, [stringifiedData]);

    const useDataDetails = () => {
        alert(`Data submitted: ${stringifiedData}`);
        const parsedData = JSON.parse(stringifiedData);
        console.log(parsedData);
    };
    const clearForm = () => {
        setData({});
        setShowElement(false);
        setJsonData(null);
    }

    return (
        <Grid container justifyContent={'center'} spacing={1} className='oia-container'>
            <Grid>
                <Typography variant={'h4'}>OIA Energy Demo</Typography>
                <div className='oia-demoform'>
                    <JsonForms
                        schema={oiaSchema}
                        uischema={oiaUiSchema}
                        data={data}
                        renderers={renderers}
                        cells={materialCells}
                        onChange={({ data }) => setData(data)}
                    />
                </div>
                <div className='oia-buttons'>
                    <Button onClick={clearForm}
                        color="primary"
                        variant="contained"
                        data-testid="clear-data">
                        Clear
                    </Button>
                    <Button onClick={useDataDetails}
                        color="secondary"
                        variant="contained"
                        data-testid="update-data">
                        Submit
                    </Button>
                </div>
            </Grid>
            {showElement && jsonData && (
                <ProjectionBill
                    data={jsonData}
                />
            )}
        </Grid>
    );
};