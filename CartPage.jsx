import React, {Component} from 'react';
import {
    Link,
  } from 'react-router-dom';
import Cart from '../Cart';

class CartPage extends Component{

    render(){
             const cart =[...this.props.cart];
             if (this.props.cart.length === 0) return <div className='card'>There are no product in the cart.</div>;
                var totalProducts=0,totalPrice=0;
        return <React.Fragment>
          <div className='row rol '>
          {cart.map(obj => <div className="card text-white bg-dark mb-3" style={{width: "16rem",height:'27rem'}}>
    <div className='card-header'><img className="card-img-top" src={obj.imgUrl} width="80" height="170" alt=""/></div>
    <div className="card-body">
      <h5 className="card-title">{obj.productName}</h5>
      <h5 className="card-title">{obj.category}</h5>
      <h5 className="card-title">Number in stock: {obj.numberInStock}</h5>
      <h5 className="card-title">Total: {obj.sum}</h5>
      <h5 className="card-title">Price: {obj.price*obj.sum}</h5>
      { totalProducts+=obj.sum } 
      { totalPrice+=obj.price*obj.sum }
    </div>
  </div>)}
          </div>
         <div 
         className='container card' 
         style={{backgroundColor:'DodgerBlue',padding:'15px'}}>
         <Cart f='cartPage' cart={this.props.cart}  handelDel={this.props.handelDelete}></Cart>
        <div 
        className='card' 
        style={{backgroundColor:'light',padding:'1%'}}>
          <h4>Total Price: $ {totalPrice} | Total Products: {totalProducts}</h4>
          </div>
          <button className='container-lg btn btn-dark' style={{width:'9rem'}}>
            <Link 
            id="cc" 
            className="nav-link" 
            to='/App' 
            style={{color:'white'}}
            onClick={()=>this.props.handelBuying()}
            >Buy</Link>
            </button> 
            </div>
        
        </React.Fragment>;
    }
}

export default CartPage;