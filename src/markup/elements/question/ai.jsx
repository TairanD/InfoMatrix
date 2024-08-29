import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {LoadingOutlined} from "@ant-design/icons";

const ChatGPTComponent = ({init_token}) => {
    const [responseData, setResponseData] = useState(null);    // 定义状态来存储从API获取的数据
    const [token, setToken] = useState(init_token); // 初始token为当前题目的描述，传入参数
    const [rowNum,setRowNum] = useState(0)
    const [result,setResult] = useState("Currently, no results")
    const [error, setError] = useState(null);    // 定义状态来存储可能的错误
    const [loading, setLoading] = useState(true);    // 定义状态来存储API请求状态

    function setResultAndExpand(token){
        setResult(token)
        if (token.length <= 24) {
            setRowNum(1);
        } else {
            const rowsNeeded = Math.ceil(token.length / 24); // 假设每行最多8个字符
            setRowNum(rowsNeeded);
        }
        console.log("ROW:",rowNum)

    }

    // 渲染组件
    return (
        <>
            <div className="floating-div">
                <div className="row>">
                    <div className="row">
                        <div className="col-9">
                            <input
                                className="form-control"
                                style={{height:"4vh",width:"14vw"}}
                                type="text"
                                placeholder={init_token}
                                required
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <button style={{height:"4vh"}} className="btn"onClick={}><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                    <div style={{height : "0.8vh"}}></div>
                    <div className="row">
                        <div className="col-12">
                        <textarea
                            className="form-control"
                            style={{width : "100%",resize : "none",height:"auto"}}
                            value={result}
                            rows={rowNum}
                        >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatGPTComponent;
