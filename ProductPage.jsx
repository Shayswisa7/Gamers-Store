import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../../DataBase/fakeProductsService';
class ProductPage extends Component{
    
    
    render(){
        //get product by name, substirng the /ProductPage/ from location pathname in props. 
        const productName =this.props.location.pathname.substring("/ProductPage/".length);
        const product= getProduct(productName);
         return  <React.Fragment>
                <br/>
                <br/>
            <div className="container">
         <div className="row">
             <div className="col-md-12">
                 <div className="card">
                     <div className="card-header">
                         <h5>Product</h5>
                     </div>
                     <div className="card-body cart">
                         <div className="col-sm-12 empty-cart-cls text-center"> 
                         <img src={product.imgUrl} width="130" height="130" className="img-fluid mb-4 mr-3" alt=""/>
                             <h3><strong>{product.productName}</strong></h3>
                             <h5>Avilable:{product.numberInStock}</h5>
                             <h5>Price:{product.price}</h5>

                             <div className='card text-left'>
                                <div className="card-header">                     
                                 <h3>Description</h3>
                                 </div>
                                 {/*Displays the product description in an orderly fashion.*/}
                                 {product.productDescription.split("/").map(key => <h4>{key}</h4>)}
                                 </div>
                             <Link to="/App">continue shopping</Link>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     </React.Fragment>;
    }
}

export default ProductPage;