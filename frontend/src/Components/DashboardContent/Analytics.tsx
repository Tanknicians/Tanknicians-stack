import Header from '../DashboardHeader'
import DefaultCharts from './AnalyticsFunctionality/DefaultCharts'
export default function Analytics(){
    return(
        <div>
        <Header selection ='Analytics' />
        <DefaultCharts/>
    </div>
    )
}