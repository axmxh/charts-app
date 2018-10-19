import React from 'react';
import * as crossfilter from 'crossfilter';
import * as data from '../orders-charts.json';
import PieChart from "./pie-chart";
import BarChart from "./bar-chart";




class Charts extends React.Component {

    OrderBy(data, orderType) {
        let returnedObj = {};
        let chartsFirstFilter = [];
        let chartsSecondFilter = [];

        let amount = crossfilter(data);
        let ordersByPaymentMethod = amount.dimension(d => d[orderType[0]]);

        let allPaymentMethods = ordersByPaymentMethod.group();
        for (let i = 0; i < allPaymentMethods.all().length; i++) {
            let item = { "x": allPaymentMethods.all()[i].key + "\n" + (allPaymentMethods.all()[i].value), "y": allPaymentMethods.all()[i].value };
            chartsFirstFilter.push(item);
        }

        if (orderType && orderType.length !== 1) {
            let filterdRevenueByPyment = ordersByPaymentMethod.group().reduceSum(d => Number(d[orderType[1]].split('$')[1])).top(Infinity)
            for (let i = 0; i < filterdRevenueByPyment.length; i++) {
                let item = { "x": filterdRevenueByPyment[i].key + "\n $" + filterdRevenueByPyment[i].value.toFixed(2) , "y": filterdRevenueByPyment[i].value };
                chartsSecondFilter.push(item);
            }
        }

        if (chartsFirstFilter != null) {
            returnedObj.chartsFirstFilter = chartsFirstFilter;
        }


        if (chartsSecondFilter != null) {
            returnedObj.chartsSecondFilter = chartsSecondFilter;
        }
        return returnedObj;
    }

    OrderbyArea(data, orderType) {
        console.log(orderType)
        let returnedObj = {};
        let chartsFirstFilter = [];
        let chartsSecondFilter = [];

        // by delivery area (show top 20)
        let area = crossfilter(data)
        let revenueByArea = area.dimension(d => d[orderType[0]]);
        let allAreas = revenueByArea.group();

        // 8) # of orders
        for (let i = 0; i < allAreas.top(20).length; i++) {
            let item = { "x": allAreas.top(20)[i].key, "y": allAreas.top(20)[i].value };
            chartsFirstFilter.push(item);
        }

        //11) Revenue
        if (orderType && orderType.length !== 1) {
            let filterdRevenueByArea = allAreas.reduceSum(d => Number(d[orderType[1]].split('$')[1])).top(20)
            for (let i = 0; i < filterdRevenueByArea.length; i++) {
                let item = { "x": filterdRevenueByArea[i].key, "y": filterdRevenueByArea[i].value };
                chartsSecondFilter.push(item);
            }
        }

        if (chartsFirstFilter != null) {
            returnedObj.chartsFirstFilter = chartsFirstFilter;
        }


        if (chartsSecondFilter != null) {
            returnedObj.chartsSecondFilter = chartsSecondFilter;
        }
        return returnedObj;
    }


    OrderbyDate(data, orderType) {
        console.log(orderType)
        let returnedObj = {};
        let chartsFirstFilter = [];
        let chartsSecondFilter = [];

        // by day
        let day = crossfilter(data)
        let revenueByDate = day.dimension(d => new Date(d.orderdate).getDay());
        let allDays = revenueByDate.group();

        // 8) # of orders
        for (let i = 0; i < allDays.all().length; i++) {
            let item = { "x": allDays.all()[i].key, "y": allDays.all()[i].value };
            chartsFirstFilter.push(item);
        }

        //11)  Revenue
        if (orderType && orderType.length !== 1) {
            let filterdRevenueByDay = allDays.reduceSum(d => Number(d[orderType[1]].split('$')[1])).top(Infinity)
            for (let i = 0; i < filterdRevenueByDay.length; i++) {
                let item = { "x": filterdRevenueByDay[i].key, "y": filterdRevenueByDay[i].value };
                chartsSecondFilter.push(item);
            }
        }

        if (chartsFirstFilter != null) {
            returnedObj.chartsFirstFilter = chartsFirstFilter;
        }

        if (chartsSecondFilter != null) {
            returnedObj.chartsSecondFilter = chartsSecondFilter;
        }
        return returnedObj;
    }

    /// plan js 

    NoOfOrdersByTime(data) {
        console.log("data", data)
        let returnedObj = [];
        let morning = 0, afternoon = 0, evening = 0, night = 0;
        data.map(function (time) {
            let formatedTime = new Date(time.orderdate)
            let hours = formatedTime.getHours()
            if (hours >= 6 && hours < 12) {
                morning++;
            }
            if (hours >= 12 && hours < 17) {
                afternoon++;
            }
            if (hours >= 17 && hours < 20) {
                evening++;
            }
            if ((hours >= 20 && hours < 23) || hours == 0) {
                night++;
            }
        })

        let timeKeys = [ "morning" , "afternoon", "evening", "night"]
        let timeValuse = [ morning , afternoon, evening, night]

        for (let i = 0; i < timeValuse.length; i++) {
            let item = { "x": timeKeys[i], "y": timeValuse[i] };
            returnedObj.push(item);
        }

        console.log(returnedObj)

        return returnedObj
    }

    timeSeries(data){

    } 

    render() {
        let noOfOrderedByPayment = this.OrderBy(data, ["paymentMethod"]);
        let revenueByPayment = this.OrderBy(data, ["paymentMethod", "orderAmount"]);

        let noOfOrderedByBranch = this.OrderBy(data, ["branch"]);
        let revenueByBranch = this.OrderBy(data, ["branch", "orderAmount"]);

        let noOfOrderedByDay = this.OrderbyDate(data, ["orderdate"]);
        let revenueByDay = this.OrderbyDate(data, ["orderdate", "orderAmount"]);

        let ordersByTime = this.NoOfOrdersByTime(data);

        let noOfOrderedByArea = this.OrderbyArea(data, ["deliveryArea"]);
        let revenueByArea = this.OrderbyArea(data, ["deliveryArea", "orderAmount"]);



        return (
            <div className="charts">
                <div className="pie-chart">
                    <p>Orders By Payment</p>
                    <PieChart data={noOfOrderedByPayment.chartsFirstFilter} />
                </div>

                <div className="pie-chart">
                    <p>Revenue By Payment</p>
                    <PieChart data={revenueByPayment.chartsSecondFilter} />
                </div>



                <div className="pie-chart">
                    <p>Orders By Branch</p>
                    <PieChart data={noOfOrderedByBranch.chartsFirstFilter} />
                </div>

                <div className="pie-chart">
                    <p>Revenue By Branch</p>
                    <PieChart data={revenueByBranch.chartsSecondFilter} />
                </div>


                <div className="bar-chart">
                    <p>Orders By Day</p>
                    <BarChart data={noOfOrderedByDay.chartsFirstFilter} />
                </div>

                <div className="bar-chart">
                    <p>Revenue By Day</p>
                    <BarChart data={revenueByDay.chartsSecondFilter} />
                </div>


                 <div className="bar-chart">
                    <p>Orders By Time</p>
                    <BarChart data={ordersByTime} />
                </div>

                 <div className="bar-chart">
                    <p>Orders By Area</p>
                    <BarChart data={noOfOrderedByArea.chartsFirstFilter} />
                </div>

                <div className="bar-chart">
                    <p>Revenue By Area</p>
                    <BarChart data={revenueByArea.chartsSecondFilter} />
                </div>
            </div>
        )
    }
}

export default Charts;