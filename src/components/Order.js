import React from 'react';

class Order extends React.Component{
    render(){
        const { details } = this.props;
        return( 
            <div>
                <li>{details.userid}</li>
                <li>{details.orderid}</li>
            </div>
        )
    }
}

export default Order;