import React from "react";
import CartProduct from "./CartProduct";
import TakeMoney from "./Stripe";
import Navigation from "./Navigation";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.props.products,
      total: 0
    };
  }

  componentDidMount() {
    if (this.state.products) {
      let total = 0;
      this.state.products.forEach(product => {
        total += product.price * product.quantity;
      });

      this.setState({ total: total });
    }
  }

  updateTotal = product => {
    this.setState(state => {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i].name === product.name) {
          state.products[i] = product;
          break;
        }
      }

      let total = 0;
      for (let i = 0; i < state.products.length; i++) {
        total += state.products[i].price * state.products[i].quantity;
      }

      return { products: [...state.products], total };
    });
  };

  getProducts = () => {
    let temporal = [];

    this.state.products.forEach(product => {
      temporal.push(
        <CartProduct
          updateTotal={this.updateTotal}
          removeFromCart={this.props.removeFromCart}
          img={product.img}
          name={product.name}
          price={product.price}
        />
      );
    });

    return temporal;
  };

  render() {
    if (!this.state.products.length) {
      return (
        <div>
          <Navigation
            cartSize={this.props.cartSize}
            user={this.props.user}
            login={this.props.login}
            loginFunction={this.props.loginFunction}
          />

          <div className="cart-div">
            {" "}
            <h1 className="cart-container-title">Shopping Cart</h1>
            <h3 className="cart-info">
              There are no products in your shopping cart yet.
            </h3>
            <img
              src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif"
              alt="img"
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Navigation
          cartSize={this.props.cartSize}
          user={this.props.user}
          login={this.props.login}
          loginFunction={this.props.loginFunction}
        />
        <div className="cart-container">
          <h1 className="cart-container-title">Shopping Cart</h1>
          <div>{this.getProducts()}</div>

          <div className="total-container">
            <p>
              <span>Total: </span>{" "}
              <span className="product-cart-price">{`$${this.state.total.toFixed(
                2
              )}`}</span>
            </p>
            <TakeMoney
              user={this.props.user}
              clearCart={this.props.clearCart}
              amount={this.state.total * 100}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
