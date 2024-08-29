import React, { Component } from 'react';

// Elements
import Count from '../../elements/counter/counter-sensor';

class Counter1 extends Component{
	render(){
		return(
			<>
				<div className="row">
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-primary">
								<Count counter={20}/><span>+</span>
							</div>
							<span className="counter-text">Questions</span>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-black">
								<Count counter={10}/><span>+</span>
							</div>
							<span className="counter-text">Happy Clients</span>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-primary">
								<Count counter={5}/><span>+</span>
							</div>
							<span className="counter-text">Questions Answered</span>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
						<div className="counter-style-1">
							<div className="text-black">
								<Count counter={5}/><span>+</span>
							</div>
							<span className="counter-text">Professional Staffs</span>
						</div>
					</div>
				</div>
				
			</>
		);
	}
}

export default Counter1;