import Products from './components/products';
import React from 'react';
import { getProducts } from './DataBase/fakeProductsService';
import { Component } from 'react';
import  Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/Pages/HomePage';
import CartPage from './components/Pages/CartPage';
import ProductPage from './components/Pages/ProductPage';
class App extends Component{
  
  state={
      products:getProducts(),
      cart:[]
  }
  //handelDelete Deletes the product from the cart.
  handelDelete = (product) =>{
    const cart = [...this.state.cart];
    const cart1 = cart.filter((x) =>x._id!==product._id);
    this.setState({cart:cart1});
  }
  //handelBuying closes the deal.
  handelBuying = () =>{
    const products=[...this.state.products];
    const cart =[...this.state.cart]
    products.map(x => cart.map(y => x.productName===y.productName ? x.numberInStock-=y.sum:''))
    this.setState({products:products});
    const newCart=[];
    this.setState({cart:newCart});
  }
  //foobar Displays the quantity of products selected from the product.
  foobar = product => {
    return product.sum === 0 || product.numberInStockM<product.sum ? ' - ' : '  '+product.sum;
  }
  //up_items check if you can increase the quantity of products from the product.
  up_items = product => {
    const products = [...this.state.products];
    const cart =[...this.state.cart]
    const index = products.indexOf(product);
    let indexCart=0;
    let flag=true//for indexCart, if product._id equal to  obj._id the flag stop the counting. 
    let flag1=true;//check if product exist in cart. 
    cart.forEach(obj => {
     
      if(obj._id!==product._id && flag)
        indexCart++;
      else if (obj._id===product._id){
        flag1 =false;
        flag=false;
      }
    });
    if(product.numberInStock>0)
      if(flag1 && product.numberInStock>0)
      {
        if(product.numberInStock>product.sum)
        products[index].sum++;
      }
      else
      {
        if(product.sum+cart[indexCart].sum<product.numberInStock) 
          if(cart[indexCart].numberInStock>0)
          products[index].sum++;
      }
    this.setState({products:products});
    }
  //do_items Check if you can download the quantity of products from the product.
  do_items =  (product) => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    if(product.sum>0)
    products[index].sum--;
    this.setState({products:products});
  }
  //CheckOrder Check if the product can be added to the shopping cart. 
  checkOrder = product =>{
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = {...products[index] };
    const productsOFcart = [...this.state.cart];
    var notInCart=true;
    productsOFcart.map(obj => (obj.productName===product.productName)? notInCart=false:'');
    if(!notInCart)
        productsOFcart.map(obj => (obj.productName===product.productName)? obj.sum+=product.sum:'');
    if(notInCart)
        this.state.cart.push(products[index]);
    this.setState({cart:this.state.cart});
    this.setState({products:products});
    this.clear_items(this.state.products[index]);
  }
  //Clear item.
  clear_items =  (product) => {
    const products = [...this.state.products];
     const index = products.indexOf(product);
    if(product.sum>0)
    {
        products[index].sum=0;
    }
    this.setState({products});
  }
  render (){
    return <React.Fragment>
     <Navbar  className='navbar-brand'/>
            <Switch >
            <Route id='RouteCartPage' path="/CartPage" render={()=><CartPage key='CartPageCartPage' cart={this.state.cart} handelBuying={this.handelBuying} handelDelete={this.handelDelete}/>}></Route>
            <Route id='RouteProductPage' path="/ProductPage" component={ProductPage} ></Route>
            <Route id='RouteHomePage' path="/HomePage" exact component={Home}/>
            <Route id='RouteApp' path="/App" component={App}>
            <div  id='divApp'className="App">
              <Products id='Products' className='products' 
                products={this.state.products}
                cart = {this.state.cart}
                checkOrder={this.checkOrder}
                clear_items={this.clear_items}
                foobar={this.foobar}
                handelDel={this.handelDelete}
                up_items={this.up_items}
                do_items={this.do_items}
              />
           </div>
      </Route>
            <Redirect id='Redirect' from='/' to='/HomePage'></Redirect>
            <Route id='Route404' path='*' component={()=><div className="container-lg">404 NOT FOUND</div>}/>
    </Switch> 
    </React.Fragment>;
  }
}

export default App;
