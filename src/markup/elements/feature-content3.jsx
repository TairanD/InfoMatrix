import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Elements
import Count from '../elements/counter/counter-sensor';

// Images
import icon1 from '../../images/icon/icon1.png';
import icon2 from '../../images/icon/icon2.png';
import icon3 from '../../images/icon/icon3.png';
import icon4 from '../../images/icon/icon4.png';

const content = [
	{
		IconImg: icon1,
		Title: "Rich and Interactive Experience:",
		Text: "We believe that learning computer science should be an engaging and interactive experience.",
	},
	{
		IconImg: icon2,
		Title: "Continuous Learning",
		Text: "Learning is a continuous process, and our platform offers a wealth of learning resources.",
	},
	{
		IconImg: icon3,
		Title: "Inclusive and Accessible Education",
		Text: "We are committed to breaking down the barriers to learning by providing high-quality educational resources.",
	},
	{
		IconImg: icon4,
		Title: "Inclusive and Supportive Environment",
		Text: "We believe that everyone has the right and potential to learn computer science, so our platform provides an inclusive, supportive..",
	},
]

class FeatureContent3 extends Component{
	render(){
		return(
			<>
				<div className="section-area section-sp1">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-6 m-b50">
								<div className="heading-bx left mb-3">
									<h2 className="title-head m-b0">Learn Computer Science <span>online</span></h2>
									<p className="m-b0">At present, college students majoring in computer science are generally faced with the problem of
										insufficient information acquisition platform, which may affect their future development.</p>
								</div>
								<p class="m-b15"> This is where our software engineering team comes in. We
									have designed a user-friendly, safe and powerful website, which provides students with a beautiful
									and concise website to exercise students’ programming ability to enhance the competitiveness
									of employment.</p>
								<h4 class="m-b30"><Count counter={200}/>+ Online Materials</h4>
								<Link to="/contact-1" className="btn button-md">Join Now</Link>
							</div>
							<div className="col-lg-6">
								<div className="row">
									{content.map((item) => (
										<div className="col-lg-6 col-md-6 col-sm-6 m-b40">
											<div className="feature-container">
												<div className="feature-md text-white m-b20">
													<Link to="#" className="icon-cell"><img src={item.IconImg} alt=""/></Link> 
												</div>
												<div className="icon-content">
													<h5 className="ttr-tilte">{item.Title}</h5>
													<p>{item.Text}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default FeatureContent3;