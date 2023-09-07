import Header from '../DashboardHeader'
import DefaultCharts from './AnalyticsFunctionality/DefaultCharts'
import CustomChart from './AnalyticsFunctionality/CustomCharts'

export default function Analytics(){
    const style = {
        height: '100vh'
    }

    return(
        <div>
        <Header selection ='Analytics' />
        <div >
            <DefaultCharts/>
        </div>
        <div >
            <CustomChart/>
        </div>
    </div>
    )
}