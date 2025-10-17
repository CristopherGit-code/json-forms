import { FC } from 'react'
import Typography from '@mui/material/Typography';
import OIAInterface from '../schema/oai/oiaInterface';
import { SimpleBarChart, BarData } from './SimpleBarChart'
import '../styles/projectionBill.css'

interface ProjectionBillProps {
    data: any
}

export const ProjectionBill: FC<ProjectionBillProps> = ({ data }) => {

    const customerData: OIAInterface = data

    const waterHeaters: number = (customerData.replace_water_heaters !== null && customerData.replace_water_heaters !== undefined) ? customerData.replace_water_heaters : 0;
    const smartThermos: number = (customerData.replace_smart_thermo !== null && customerData.replace_smart_thermo !== undefined) ? customerData.replace_smart_thermo : 0;
    const noBulbs: number = (customerData.no_bulbs_slider !== null && customerData.no_bulbs_slider !== undefined) ? customerData.no_bulbs_slider : 0;
    const benefitYears: number = (customerData.benefit_years_slider !== null && customerData.benefit_years_slider !== undefined) ? customerData.benefit_years_slider : 1;

    const funanceFan: number = (customerData.furnance_fan) ? 4.5 : 0;
    const area: number = (customerData.residence_area_slider !== null && customerData.residence_area_slider !== undefined) ? customerData.residence_area_slider : 1000

    const totalInitialCost = ((noBulbs * 6.55) + (waterHeaters * 48.77) + (smartThermos * 34.54) + funanceFan) * (area / 500)
    const benefitYearsSavings = ((0.127 * totalInitialCost * benefitYears) + funanceFan) * (area / 300)
    const savingsPerYear = benefitYearsSavings / benefitYears

    const barData: BarData[] = [
        { label: "Past Bill", value: (totalInitialCost + (1845 * area / 5000)) },
        { label: "New Bill", value: totalInitialCost }
    ]

    return (
        <div className='bill-container'>
            <div className='bill-text'>
                <Typography variant={'subtitle1'} >Total savings over {benefitYears} years: ${benefitYearsSavings.toFixed(2)}</Typography>
                <Typography variant={'subtitle1'} >Savings per year: ${savingsPerYear.toFixed(2)}</Typography>
                <Typography variant={'subtitle1'} >Total initial cost: ${totalInitialCost.toFixed(2)}</Typography>
            </div>
            <SimpleBarChart data={barData} height={260} showTooltip={false} showGrid={true} showLegend={false} />
        </div>
    )
}