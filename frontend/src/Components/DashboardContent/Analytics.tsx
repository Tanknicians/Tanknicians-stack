import Header from '../DashboardHeader'
import DefaultCharts from './AnalyticsFunctionality/DefaultCharts'
import CustomChart from './AnalyticsFunctionality/CustomCharts'

export default function Analytics(){
    
    return(
        <div>
            <Header selection ='Analytics' />
            <DefaultCharts/>
            <CustomChart/>
        </div>
    )
}