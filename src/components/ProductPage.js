import React, {Component} from "react";
import "../styles/ProductPage.css";
import image from "../imageplaceholder.jpg";

import {NavLink} from 'react-router-dom';

class ProductPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			magicItems: [],
			pageCard: 'ERROR'
		}
	}

	componentDidMount() {
		fetch("https://guarded-retreat-23297.herokuapp.com/products").then(response => response.json()).then(magicItems => {
		magicItems.map(magicItem => {
			console.log("here")
			let prodnum = parseInt(this.props.match.params.prodnum);
			console.log(prodnum);
			if (prodnum === magicItem.id) {
				console.log("match found");
				this.setState(
					{pageCard:
					<div className="pageContainer container">

							<div className="row productContainer" key={magicItem.id}>
								<div className="imageAndDescContainer col-md-12">
									<img src={magicItem.image} className="productImage col-md-5" />
									<div className="productDescriptionGroup col-md-7">
										<h2 className="productTitle">{magicItem.name}</h2>
										<h3 className="price">{magicItem.price}</h3>

											<NavLink
		                    activeClassName="selected"
		                    className="navlink btn view-item "
		                    to='#'>
		                    add to cart
		                  </NavLink>

								</div>
							</div>
						</div>
							<div className="revsDescContainer">
								<ul className="nav nav-tabs">
									<li className="active nav-item tab">
										<a data-toggle="tab" href="#description">
											Description
										</a>
									</li>
									<li className="nav-item tab">
										<a data-toggle="tab" href="#reviews">
											Reviews
										</a>
									</li>
								</ul>
								<div className="tab-content">
									<div id="description" className="tab-pane fade inactive">
										<h3>Description</h3>
										<p>{magicItem.description}</p>
									</div>
									<div id="reviews" className="tab-pane fade">
										<h3>Reviews</h3>
										<p>enter product reviews here</p>
									</div>
								</div>
							</div>
						</div>
					})
			}
		})
	})
}
	render() {
		return (
			<div>
				{this.state.pageCard}
			</div>
	)
	}
}

export default ProductPage;
