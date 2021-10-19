import React from 'react';


const ListGroup =(props)=>{
    const {products,onItemSelect} = props;
    return <ul className="list-group">
        {products.map(x => <li className="list-group-item"  onClick={()=>onItemSelect(x)} key={x}> {x}</li>)}
    </ul>;
}

export default ListGroup;