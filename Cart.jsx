import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component{

    render (){
        const products = this.props.cart;
            //Sum of total price.
            let sums=0;
            this.props.cart.map(x => sums+=x.price*x.sum);
            
        return <React.Fragment>
                <h1>Cart</h1>
                <table className='table'>
                <thead>
                    <tr className="table-light">
                     <th>Name</th><th>Catrgory</th><th>Price</th><th>Sum</th><th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {products.map(element => <tr>
                            <td>{element.productName}</td>
                            <td>{element.category}</td>
                            <td>{element.price}</td>
                            <td>{element.sum}</td>
                            <td>
                                <button 
                                className="btn btn-danger" 
                                onClick={()=>this.props.handelDel(element)}
                                >X</button>
                                </td></tr>)}
                   </tbody>
                </table>
                {/*Only if the user is on the APP page will the elements be displayed, f is the string from Products.jsx */}
                    {this.props.f==='cartPro'? <h4>Total price: {sums}$</h4>:''}
                 {this.props.f==='cartPro'?<button className='btn btn-primary'><Link key='linkCartPage' className="nav-link" to='/CartPage' style={{color:'white'}} cart={this.props.cart}>Go to pay</Link></button>:''}
        </React.Fragment>;
    }
}
export default Cart;