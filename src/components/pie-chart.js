import React from 'react';
import Charts from './charts';
import * as V from 'victory';
import { VictoryChart, VictoryTheme, VictoryPie, VictoryBar } from 'victory';

class PieChart extends React.Component {

    render() {
        return (
            <div className="orders-pie-chart">
                <VictoryPie
                    innerRadius={50}
                    labelRadius={70}
                    style={{ labels: { fill: "white", fontSize: 14, fontWeight: "bold" } }}
                    data={this.props.data}
                />
            </div>
        )
    }

}

export default PieChart;
