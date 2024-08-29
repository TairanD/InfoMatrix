import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";



function YourFollowings() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetchFollowings();
    }, []);

    const handleUnfollow = async (followerId) => {
        try {
            const response = await axios.post(`/personal/unfollow?user=${followerId}`);
            if (response.data.state === 200) {
                // 如果需要更新组件状态，可以在这里执行
                await fetchFollowings(); // 重新获取关注列表
            } else {
                throw new Error('Failed to unfollow user');
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const fetchFollowings = async () => {
        try {
            const response = await fetch('/personal/following_list');
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    return (
        <div>
            <div className="profile-head">
                <h5>My Followings</h5>
            </div>
            <div className="courses-filter">
                <div className="ttr-gallery-listing magnific-image row">
                    {people.map(user => (
                        <div className="action-card col-xl-12" key={user.id}>
                            <div className="cours-bx">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>{user.name}</div>
                                    <div>{user.following_id}</div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUnfollow(user.following_id)}
                                    >
                                        Unfollow
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default YourFollowings;
