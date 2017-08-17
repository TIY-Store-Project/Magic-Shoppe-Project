import React, { Component } from 'react';
import "../styles/ShoppingCart.css";



class ShoppingCart extends Component {

  constructor(props) {
        super(props)
        this.state = {
            cartItems: [],
						cartCards: ''
        }
       this.handleClick = this.handleClick.bind(this);
       this.handleBuy = this.handleBuy.bind(this);
    }


  handleClick() {
    this.setState({
      cartCards: <h2 id="no-items-message">There are no items in your cart :( </h2>
    });
  }

  handleBuy(a, b, c) {
    let price = b * c;
    this.setState({
      cartCards: <div>
                  <div id="congrats-section">
                    <h2>Congrats on your purchase!</h2>
                    <h4>Your {a} should arrive within 7 business days.</h4>
                  </div>
                  <div id="summary-purchase">
                    <h4 id="summary-title">Summary of Purchase</h4>
                    <div id="prices">
                      <p id="center">{a}</p>
                      <p><span>Quantity     .........................     </span> <span>{c}</span></p>
                      <p><span>Price          ..............................     </span> <span>${b}</span></p>
                      <p><span>Total          ..............................     </span> <span>${price}</span></p>
                    </div>
                  </div>
                </div>
    });
  }

	componentDidMount() {
		fetch("https://guarded-retreat-23297.herokuapp.com/products").then(response => response.json()).then(magicItems => {
			magicItems.map(magicItem => {
				let prodnum = parseInt(this.props.match.params.prodnum);
				console.log(prodnum);
				if (prodnum === magicItem.id) {
					let oldCart = this.state.cartItems
					let newItem={}
					newItem.id = magicItem.id;
					newItem.name = magicItem.name;
					newItem.price = magicItem.price;
					newItem.image = magicItem.image;
					newItem.quantity = 1;
					oldCart.push(newItem);

					let cartCards =
						oldCart.map(product => {
							return(
								<div key={product.id} className="row item-row">
										<img src={product.image} className="col-md-3 item-image photo"/>
											<div className="left-info col-md-7">
												<h4 className="item-name">{product.name}</h4>
												<p>${product.price}</p>
												<p>{product.description}</p>
											</div>
											<div className="right-info col-md-2">
												<p className="quantity">Quantity: {product.quantity}</p>
												<p className="total">Total: $ {product.price * product.quantity}</p>
												<button onClick={this.handleClick} className="btn remove-item">remove item</button>
                        <button onClick={() => this.handleBuy(product.name, product.price, product.quantity)} className="btn buy-item">buy item</button>
											</div>
								</div>
							)
						})
					console.log(cartCards)
					this.setState({cartCards: cartCards})
					console.log(this.state.cartCards)
				}
			})
		})
	}
	render(){
		return (
			<div className="container">
				{this.state.cartCards}
			</div>
		)
	}

}



export default ShoppingCart;
