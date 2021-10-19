import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as Icon from 'react-bootstrap-icons';

const Like = props => {
  if(props.liket){
    return(
      <td onClick={()=>props.onClick(props.obj)}><Icon.StarFill ></Icon.StarFill></td>
    );
  }
  else
   return (
    <td onClick={()=>props.onClick(props.obj)}><Icon.Star ></Icon.Star></td> 
   );
};

export default Like;
