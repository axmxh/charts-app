import React from 'react';
import Charts from './charts';
import * as V from 'victory';
import * as data from '../orders-charts.json';

import { VictoryChart, VictoryTheme, VictoryPie, VictoryBar } from 'victory';
import * as crossfilter from 'crossfilter';


class PieChart extends React.Component {

    render() {
        return (
            <div className="orders-pie-chart">
                <VictoryPie
                    innerRadius={50}
                    labelRadius={70}
                    style={{ labels: { fill: "white", fontSize: 14, fontWeight: "bold" } }}
                    data={this.props.data}
                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                //onClick: (evt) => alert(`(${evt.target}, ${evt.target})`)
                                onClick: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let cross = crossfilter(data);
                                            let byPayment = cross.dimension(d => d.paymentMethod);
                                            // let filterByCash = byPayment.filterFunction(d => d == 'Cash').top(Infinity); 
                                            // let crossCash = crossfilter(filterByCash);
                                            // let branchByCash = crossCash.dimension(d => d.branch.split(' ')[1]);
                                            // let groupByPayment =  branchByCash.group();
                                            // console.log(groupByPayment.all());
                                            // this.setState({
                                            //     ordersByBranch: groupByPayment.all()
                                            // })
                                            this.props.update(props.text.split('\n')[0]);
                                            console.log(props.text)
                                            return props.text === "clicked" ?
                                                null : { text: "clicked" }
                                        }
                                    }];
                                }
                            }
                        }
                    ]}
                />
            </div>
        )
    }

}

export default PieChart;
