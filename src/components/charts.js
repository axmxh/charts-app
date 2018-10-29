import React from 'react';
import * as crossfilter from 'crossfilter';
import * as data from '../orders-charts.json';
import PieChart from "./pie-chart";
import BarChart from "./bar-chart";


var cross = crossfilter(data);
var byPayment = cross.dimension(d => d.paymentMethod);
var byBranch = cross.dimension(d => d.branch.split(' ')[1]);

class Charts extends React.Component {

    constructor() {
        super();

        this.format = this.format.bind(this);
        this.update = this.update.bind(this);

        // get intial state
        this.state = {
            orders: data,
            ordersByPayment: [],
            revenueByPayment: [],
            formattedData: [],
            ordersByBranch: [],
            revenueByBranch: []
        }
    }


    componentDidMount() {
        this.init(this.state.orders);
    }

    init(data) {
        //console.log(data)
        //let cross = crossfilter(data);

        // Payment 
        // ==> to be replaced by if  
        // let byPayment = cross.dimension(d => d.paymentMethod);
        // let byBranch = cross.dimension(d => d.branch.split(' ')[1]);
        // let byAmount = cross.dimension(d => d.orderAmount);
        // let byArea = cross.dimension(d => d.deliveryArea);
        // let byDate = cross.dimension(d => d.orderdate);
        // <===

        // ==> to be group/value ... if .. value =
        let groupByPayment = byPayment.group();
        let byPaymentValue = byPayment.group().reduceSum(d => Number(d.orderAmount.split('$')[1])).top(Infinity);

        // ===
        let groupByBranch = byBranch.group();
        let byBranchValue = byBranch.group().reduceSum(d => Number(d.orderAmount.split('$')[1])).top(Infinity);
        // <===

        
        /*
        let filterByCash = byPayment.filterFunction(d => d == 'Cash').top(Infinity); 
        let crossCash = crossfilter(filterByCash);
        let branchByCash = crossCash.dimension(d => d.branch.split(' ')[1]);
        */

        //console.log(groupByBranch, groupByBranch.all(), byBranchValue);

        // set status 
        this.setState({
            ordersByPayment: groupByPayment.all(),
            revenueByPayment: byPaymentValue,
            ordersByBranch: groupByBranch.all(),
            revenueByBranch: byBranchValue
        })
    }

    update(baymentMethod) {
        //console.log(this.state.orders);
        let filterByCash = byPayment.filterFunction(d => d == baymentMethod).top(Infinity);
        let crossCash = crossfilter(filterByCash);
        let branchByCash = crossCash.dimension(d => d.branch.split(' ')[1]);
        let groupByPayment = branchByCash.group();
        //console.log(groupByPayment.all());
        if (this.ordersByBranch == null) {
            this.init(this.state.orders);

        }
        else {
            this.setState({
                ordersByBranch: groupByPayment.all()
            })
        }
    }

    // formatType as pramter 
    format(type) {
        //console.log(type)
        let typeOfOrder = this.state[type];
        let formattedData = []

        for (let i = 0; i < typeOfOrder.length; i++) {
            let item = { 'x': `${typeOfOrder[i].key}\n ${typeOfOrder[i].value.toFixed(2)}`, 'y': typeOfOrder[i].value }
            formattedData.push(item)
        }

        return formattedData
    }


    render() {
        return (
            <div className="charts">
                <div className="pie-chart">
                    <p>Orders By Payment</p>
                    <PieChart data={this.format('ordersByPayment')} update={this.update} />
                    <PieChart data={this.format('revenueByPayment')} />
                </div>

                <div className="pie-chart">
                    <p>Orders By Branch</p>
                    <PieChart data={this.format('ordersByBranch')} />
                    <PieChart data={this.format('revenueByBranch')} />
                </div>
            </div>
        )
    }
}

export default Charts;