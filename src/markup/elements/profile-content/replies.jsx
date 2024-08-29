import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
function YourReplies() {
    const [replies, setReplies] = useState([]);
    const [filteredReplies, setFilteredReplies] = useState([]);
    const [sortByDate, setSortByDate] = useState('asc'); // State for sorting order

    useEffect(() => {
        fetchReplies();
    }, []);

    const fetchReplies = async () => {
        try {
            const response = await fetch('/personal/your_replies');
            const data = await response.json();
            setReplies(data);
            setFilteredReplies(data); // Initially, set filteredReplies to all replies
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const handleSortByDate = () => {
        // Sort replies by date
        const sorted = [...filteredReplies].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (sortByDate === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        setFilteredReplies(sorted);
        // Toggle sorting order for next click
        setSortByDate(sortByDate === 'asc' ? 'desc' : 'asc');
    };

    return (
        <>
            {/* 页面标题 */}
            <div className="profile-head">
                <h5>My Replies</h5>

                {/* Sort button */}
                {/* Sort button */}
                <div className="feature-filters style1 ml-auto">
                    <ul className="filters" data-toggle="buttons">

                        <Button variant="contained" color="primary" onClick={handleSortByDate}>
                            Sort by Date ({sortByDate === 'asc' ? 'Ascending' : 'Descending'})
                        </Button>
                    </ul>
                </div>
            </div>

            {/* 博客列表 */}
            <div className="courses-filter">
                <div className="ttr-gallery-listing magnific-image row">
                    {filteredReplies.map((reply, index) => (
                        <div className="action-card col-xl-12" key={index}>
                            <div className="cours-bx">
                                <div className="action-box">
                                    <h5>{reply.content}</h5>
                                    {/* 只显示日期 */}
                                    <p>Date: {reply.date}</p>
                                    {/* 第一个链接 */}
                                    <Link
                                        to={{
                                            pathname:
                                                reply.Belong_type === 1
                                                    ? `/forum/study/${reply.org_id}/post/${reply.post_id}`
                                                    : `/forum/job/${reply.org_id}/post/${reply.post_id}`,
                                            state: {
                                                orgName: reply.orgName,
                                                Belong_type: reply.Belong_type
                                            }
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

export default YourReplies;

