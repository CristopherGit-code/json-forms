export default interface OIAInterface {
    address?: string
    building_type?: 'Residencial' | 'Commerecial'
    services?: ('Electric' | 'Gas')[]
    residence_area_slider?: number
    water_heaters?: number
    furnance_fan?:boolean
    sump_pump?:boolean
    air_conditioner?:boolean
    replace_water_heaters?:number
    replace_smart_thermo?:number
    no_bulbs_slider?:number
    benefit_years_slider?:number
    audit?:boolean
    date?:string
    time?:string
    email?:string
}