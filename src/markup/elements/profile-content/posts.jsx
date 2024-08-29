import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// 标签筛选按钮组件
const FilterList = ({ dataFilter, defaultTag, activeFilter }) => {
	// 根据不同的数值显示不同的文本
	let filterText;
	switch (dataFilter) {
		case 0:
			filterText = 'Technical';
			break;
		case 1:
			filterText = 'Educational';
			break;
		default:
			filterText = 'All';
	}

	return (
		<li
			className={`${activeFilter ? 'btn active' : 'btn'}`}
			onClick={() => defaultTag(dataFilter)}
		>
			<Link to="#">{filterText}</Link>
		</li>
	);
};

// 主要组件，显示用户发布的所有帖子信息
function YourBlogs() {
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const response = await fetch('/personal/your_posts');
			const data = await response.json();
			setPosts(data);
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	// 根据关键字过滤帖子
	const filteredPosts = posts.filter(post =>
		post.Subject.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			{/* 页面标题和搜索框 */}
			<div className="profile-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h5>My Blogs</h5>
				{/* 搜索框 */}
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					style={{ marginLeft: 'auto' }}
				/>
			</div>

			{/* 博客列表 */}
			<div className="courses-filter">
				<div className="ttr-gallery-listing magnific-image row">
					{filteredPosts.map((post, index) => (
						<div className="action-card col-xl-12" key={index}>
							<div className="cours-bx">
								<div className="action-box">
									<h5>{post.Subject}</h5>
									{/* 只显示日期 */}
									<p>Date: {post.Date}</p>
									{/* 第一个链接 */}
									<Link
										to={{
											pathname:
												post.Belong_type === 1
													? `/forum/study/${post.Organisation_id}/post/${post.id}`
													: `/forum/job/${post.Organisation_id}/post/${post.id}`,
											state: { orgName: post.orgName,
												Belong_type: post.Belong_type}
										}}
									>
										<span>Details</span> {/* Text */}
										<ArrowForwardIcon /> {/* Replace "GO" text with icon */}
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default YourBlogs;
