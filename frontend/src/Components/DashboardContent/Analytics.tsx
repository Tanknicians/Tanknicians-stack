import Header from '../DashboardHeader'
import DefaultCharts from './AnalyticsFunctionality/DefaultCharts'

export default function Analytics(){
    const style = {
        height: '100vh'
    }

    return(
        <div>
        <Header selection ='Analytics' />
        <div style = {style}>
            <DefaultCharts/>
        </div>
    </div>
    )
}