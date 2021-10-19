import React, {Component} from 'react';
import '../index.css';
import { getProducts, getProductsCatgory } from '../DataBase/fakeProductsService';//import the database of store product data.
import Like from './liket';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import _ from "lodash";
import ListGroup from './GroupList';
import Cart from './Cart';
import "bootstrap/dist/css/bootstrap.css";
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Counter from './Counter';
class Products extends Component {
    state = {
        products: this.props.products,
        cart: this.props.cart,
        checkOrder:this.props.checkOrder,
        clear_items:this.props.clear_items,
        foobar:this.props.foobar,
        up_items:this.props.up_items,
        do_items: this.props.do_items,
        liket:false,
        categorys:getProductsCatgory(),
        selectedCatgory:"All",
        currentPage:1,
        pageSize: 4,
        handelDelete:this.props.handelDel,
        sortColumn: {path:"_id" , order: "asc"} 
    };
    //handle like.
    handleLike = product => {
        const products = [...this.state.products];
        const index = products.indexOf(product);
        products[index].liket = !products[index].liket;
        this.setState({products:products});
    };
    //handle page change.
    handlePagechange = page =>{
        this.setState({currentPage : page});
    }
    //categry selecte.
    handleCategrySelect = category =>{
       const c=category;
       this.setState({selectedCatgory:c});
       this.handleCategry(category);
    }
    //handle sort by columns.
    handleSort(path){

        var newColumn =[{...this.state.sortColumn}];
        var new1=newColumn.pop();
        if(this.state.sortColumn.path === path)
        {
            new1.order === "asc" ? new1.order= "desc": new1.order="asc";
        }
        else
        {
            new1.path=path;
            new1.order = "asc";
        }

        this.setState({sortColumn:new1});
    }
    //handle categry selected.
    handleCategry(category){
        const products1= getProducts();
        this.setState({currentPage:1});
        if(category!=="All")
        {
            const products  = products1.filter(x=>x.category===category);
            this.setState({products:products});
        }
        else
        {
            const pro=getProducts();
            this.setState({products:pro});
        }
    }
    render() {
       const { length: count } = this.state.products;
        if (count === 0) return <p>There are no product in the database.</p>;
            //pagination, sorts, and filter. 
            const {pageSize,currentPage,selectedCatgory,products:products1,sortColumn}=this.state;  
            const filterPro = selectedCatgory && selectedCatgory._id ? products1.filter(x => x.category._id === selectedCatgory._id) : products1;
            const sorted=_.orderBy(filterPro,[sortColumn.path],[sortColumn.order]);
            const products = paginate(sorted, currentPage, pageSize);
            return <React.Fragment>
            <div className="top"><div className="LP"></div><h1>GAMER STORE</h1><h2> חנות גמיינג וסלולר</h2></div>
                <div className='row'>  
                  <div className='col-3'>
                    <ListGroup id='ListGroup' products={this.state.categorys} textProperty='category' itemProperty='_id'  onItemSelect={this.handleCategrySelect}/>
                    <Cart f='cartPro' cart={this.props.cart}  handelDel={this.state.handelDelete}></Cart>
                  </div>
                  <div className='col-sm'>
            <table className="table table-dariped" >
            <thead>
            <tr className="table-light">

            <th 
             onClick={()=>this.handleSort("_id")}
             >Number {sortColumn.path==="_id" && sortColumn.order==="asc" ? <Icon.ArrowUpCircleFill width='3rem' size='14px'/>: sortColumn.path==="_id" && sortColumn.order==="desc"? <Icon.ArrowDownCircleFill width='3rem' size='14px'/>:''} </th>

            <th onClick={()=>this.handleSort("productName")}>Product name {sortColumn.path==="productName" && sortColumn.order==="asc" ? <Icon.ArrowUpCircleFill width='3rem' size='14px'/>: sortColumn.path==="productName" && sortColumn.order==="desc"? <Icon.ArrowDownCircleFill width='3rem' size='14px'/>:''}</th> 
            <th onClick={()=>this.handleSort("category")}>Category {sortColumn.path==="category" && sortColumn.order==="asc" ? <Icon.ArrowUpCircleFill width='3rem' size='14px'/>: sortColumn.path==="category" && sortColumn.order==="desc"? <Icon.ArrowDownCircleFill width='3rem' size='14px'/>:''}</th>
            <th onClick={()=>this.handleSort("numberInStock")}>Stock {sortColumn.path==="numberInStock" && sortColumn.order==="asc" ? <Icon.ArrowUpCircleFill width='3rem' size='14px'/>: sortColumn.path==="numberInStock" && sortColumn.order==="desc"? <Icon.ArrowDownCircleFill width='3rem' size='14px'/>:''}</th>
            <th onClick={()=>this.handleSort("price")}>Price {sortColumn.path==="price" && sortColumn.order==="asc" ? <Icon.ArrowUpCircleFill width='3rem' size='14px'/>: sortColumn.path==="price" && sortColumn.order==="desc"? <Icon.ArrowDownCircleFill width='3rem' size='14px'/>:''}</th>
            <th>Product image</th>
            <th onClick={()=>this.handleSort("liket")}>Liket {sortColumn.path==="liket" && sortColumn.order==="asc" ? <Icon.ArrowUpCircleFill width='3rem' size='14px'/>: sortColumn.path==="liket" && sortColumn.order==="desc"? <Icon.ArrowDownCircleFill width='3rem' size='14px'/>:''}</th>
            <th>Up/</th>
            <th>Down/</th>
            <th onClick={()=>this.handleSort("sum")}>Sum {sortColumn.path==="sum" && sortColumn.order==="asc" ? <Icon.ArrowUpCircleFill width='3rem' size='14px'/>: sortColumn.path==="sum" && sortColumn.order==="desc"? <Icon.ArrowDownCircleFill width='3rem' size='14px'/>:''}</th>
            <th>Order</th>
             </tr>
            </thead>
            <tbody>
                {products.map(obj=>
                    <tr key={obj._id}> 
                    <td>{obj._id}</td>
                    <td><Link to={`/ProductPage/${obj.productName}`} state={obj}>{obj.productName}</Link></td>
                    <td>{obj.category}</td> 
                    <td>{obj.numberInStock}</td>
                    <td>{obj.price}₪</td>
                    <td className="urlItem" style={{backgroundImage: "url('"+obj.imgUrl+"')", backgroundSize:"100%",borderRadius:"30px",width:"270px"}}></td>
                    <Like
                    obj={obj} 
                    liket={obj.liket} 
                    onClick={this.handleLike}
                    />
                    <Counter key="counter" value={obj} up_items={this.props.up_items} do_items={this.props.do_items} foobar={this.props.foobar}></Counter>
                    <td >
                        <button 
                        key="add" 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={(obj.numberInStock!==0 &&
                         obj.sum!==0 && obj.numberInStock>=obj.sum)?
                         ()=>this.state.checkOrder(obj):console.log()}
                         >add</button></td>   
                    </tr>
                 )}
            <tr>
                <Pagination 
                itemsCount={this.state.products.length}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePagechange}
                />
            </tr>
            </tbody>
            </table>
           </div>
        </div>
            </React.Fragment>;
    }
}

export default Products;