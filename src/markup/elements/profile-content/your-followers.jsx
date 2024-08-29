import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";



function YourFollowers() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetchFollowings();
    }, []);

    const handleUnfollow = async (followingId) => {
        try {
            const response = await axios.post(`/personal/remove_fans?user=${followingId}`);
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
            const response = await fetch('/personal/fan_list');
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    return (
        <div>
            <div className="profile-head">
                <h5>My Fans</h5>
            </div>
            <div className="courses-filter">
                <div className="ttr-gallery-listing magnific-image row">
                    {people.map(user => (
                        <div className="action-card col-xl-12" key={user.id}>
                            <div className="cours-bx">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>{user.name}</div>
                                    <div>{user.follower_id}</div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUnfollow(user.follower_id)}
                                    >
                                        Remove
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

export default YourFollowers;