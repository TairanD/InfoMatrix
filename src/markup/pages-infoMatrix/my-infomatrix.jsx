import React, { useState } from 'react';
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";
import { v4 as uuidv4 } from 'uuid';

function MyInfoMatrix() {
    const [users] = useState([
        {
            id: uuidv4(),
            username: "Tester",
            posts: [
                { id: uuidv4(), title: " ", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: " ", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: " ", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: " ", timestamp: new Date().toLocaleString() }
                // { id: uuidv4(), title: "Post 1", timestamp: new Date().toLocaleString() },
                // { id: uuidv4(), title: "Post 2", timestamp: new Date().toLocaleString() },
                // { id: uuidv4(), title: "Post 3", timestamp: new Date().toLocaleString() },
                // { id: uuidv4(), title: "Post 4", timestamp: new Date().toLocaleString() }



            ]
        },
        {
            id: uuidv4(),
            username: "user2",
            posts: [
                { id: uuidv4(), title: "Post 1", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 2", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 3", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 4", timestamp: new Date().toLocaleString() }
            ]
        },

        {
            id: uuidv4(),
            username: "user3",
            posts: [
                { id: uuidv4(), title: "Post 1", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 2", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 3", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 4", timestamp: new Date().toLocaleString() }
            ]
        },

        {
            id: uuidv4(),
            username: "user4",
            posts: [
                { id: uuidv4(), title: "Post 1", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 2", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 3", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 4", timestamp: new Date().toLocaleString() }
            ]
        },

        {
            id: uuidv4(),
            username: "user5",
            posts: [
                { id: uuidv4(), title: "Post 1", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 2", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 3", timestamp: new Date().toLocaleString() },
                { id: uuidv4(), title: "Post 4", timestamp: new Date().toLocaleString() }
            ]
        },
        // Create three more users similarly
    ]);
    const [selectedUser, setSelectedUser] = useState(users[0]); // 默认选中第一个用户

    const handleUserChange = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <HeaderInfoMatrix/>

            <div className="user-selector">
                <select value={selectedUser.username} onChange={(e) => {
                    const selectedUserId = e.target.value;
                    const selectedUser = users.find(user => user.username === selectedUserId);
                    handleUserChange(selectedUser);
                }}>
                    {users.map(user => (
                        <option key={user.id} value={user.username}>{user.username}</option>
                    ))}
                </select>
            </div>
            <div className="user-list">
                <div key={selectedUser.id} className="user">
                    <h3>{selectedUser.username}</h3>
                    <div className="posts">
                        {selectedUser.posts.map(post => (
                            <div key={post.id} className="post">
                                <h4>{post.title}</h4>
                                <p>{post.timestamp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FooterBlack />
        </>
    );
}

export default MyInfoMatrix;
