import React from 'react';
import * as V from 'victory';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryContainer } from 'victory';

class BarChart extends React.Component {

    render() {
        return (
            <div className="orders-pie-chart">
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={1}
                >
                    <VictoryBar 
                        containerComponent={<VictoryContainer responsive={false} />}
                        height={120}
                        style={{
                            labels: { fontSize: 6 },
                        }}
                        data={this.props.data}
                    />
                    
                </VictoryChart>
            </div>
        )
    }

}

export default BarChart;
