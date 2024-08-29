import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Images
import ServicePic1 from '../../images/about-us/programmer.png';
import ServicePic2 from '../../images/about-us/question-bank.png';
import ServicePic3 from '../../images/our-services/pic3.jpg';

class ServicesContent1 extends Component{
	render(){
		return(
			<>
				<div className="section-area bg-gray section-sp1 choose-bx">
					<div className="container">
						<div className="row">
							<div className="col-md-12 heading-bx left">
								<h2 className="title-head">Why Choose <span> InfoMatrix</span></h2>
								<p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="service-bx m-b30">
									<div className="action-box">
										<img src={ServicePic1} alt=""/>
									</div>
									<div className="info-bx">
										<h4><Link to="/courses-details">Practice using IDE</Link></h4>
										<p>We provided an online IDE for the users to learn programming skills.</p>
										<Link to="/courses-details" className="btn radius-xl">View More</Link>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="service-bx m-b30">
									<div className="action-box">
										<img src={ServicePic2} alt=""/>
									</div>
									<div className="info-bx">
										<h4><Link to="/courses-details">Learn Online</Link></h4>
										<p>We provided question bank for users to learn CS material online. User could also search for information that they want.</p>
										<Link to="/courses-details" className="btn radius-xl">View More</Link>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="service-bx m-b30">
									<div className="action-box">
										<img src={ServicePic3} alt=""/>
									</div>
									<div className="info-bx">
										<h4><Link to="/courses-details">Forum & Talk</Link></h4>
										<p>Everyone could ask questions and browse posts in our forum.</p>
										<Link to="/courses-details" className="btn radius-xl">View More</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ServicesContent1;