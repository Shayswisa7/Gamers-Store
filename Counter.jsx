import React, {Component} from 'react';
class Counter extends Component {
  
    render() {
        return <React.Fragment >
            <td><button className="btn" onClick={()=>this.props.up_items(this.props.value)} style={{ color: 'black'}}>+</button></td>
            <td><button className="btn" onClick={()=>this.props.do_items(this.props.value)} style={{ color: 'black'}}>-</button></td>
            <td><button className="btn" style={{ color: 'black'}}>{this.props.foobar(this.props.value)}</button></td>
        </React.Fragment>
    }

}

export default Counter;