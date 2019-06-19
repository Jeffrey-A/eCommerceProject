import React from 'react';
import '../css/login.css';
import '../App.css';
import '../css/productCard.css';
import {Link} from 'react-router-dom';


class ProductCard extends React.Component{

    render(){
        return(
            

            <div className= "product-card-parent">
               
               <div className= "product-card">
                   <Link to={{ pathname: "/description", state: {
                       name: this.props.name,
                       price: this.props.price,
                       description: this.props.description,
                       img: this.props.img
                       }}}>
                   
                        <div className= "product-image">
                            <img src={this.props.img}/>
                        </div>
                  </Link>

                  <p id="name">{this.props.name} </p>
                   <p>${this.props.price}</p> 
                   <Link to="/cart"><button className="btn">Add To Cart</button></Link>
               
               </div>
       
       
               
             </div>
        )
    }
}

export default ProductCard;