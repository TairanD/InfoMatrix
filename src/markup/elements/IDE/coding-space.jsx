import React, {useCallback, useEffect, useState} from 'react';
// import 'codemirror-react/node_modules/codemirror/mode/javascript/javascript';
import CodeMirror from '@uiw/react-codemirror';
import {monokai, monokaiInit} from '@uiw/codemirror-theme-monokai';
import {python} from "@codemirror/lang-python";
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons'
import {Link} from "react-router-dom";
import {Fade} from "react-bootstrap";
import Test_Element from "./test-results";

function Editor({id}) {

    const [code, setCode] = useState('');
    const [result, setResult] = useState('Currently, no results.')
    const [status, setStatus] = useState('Code Are Not Submitted')
    const [loading_ide, setLoadingIDE] = useState(false);
    const [loading_test, setLoadingTest] = useState(false);
    const [correct, setCorrect] = useState([]);
    const [incorrect, setIncorrect] = useState([]);
    const [expects, setExpects] = useState([]);
    const [got, setGot] = useState([]);
    const [input, setInput] = useState([])
    const [fail, setFail] = useState(0);
    let rangeArray;
    // 编程结果的初始状态

    const extensions = [python()];

    const onChange = useCallback((code, viewUpdate) => {
        setCode(code);
    }, []);

    useEffect(() => {
        fetchData(id); //调用异步获取
    }, [id]);

    const fetchData = async (id) => {
        try {
            const response = await fetch("/find_coding_question/" + id);
            const json = await response.json();
            setCode(json.example);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const submitCode = async () => { // 提交IDE代码执行
        setLoadingIDE(true);
        try {
            const response = await axios.post('/submit_code', {
                // 如果需要发送数据，可以在这里添加数据
                code
            //     没错，不知道是为什么，直接这么发就可以了？？？？妈的
            });
            const data = await response.data;
            setResult(data['result'])
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingIDE(false)
        }
    };

    const submitTest = async () => { // 提交单元测试
        setLoadingTest(true);
        try {
            const response = await axios.post('/submit_test/' + id, {
                // 如果需要发送数据，可以在这里添加数据
                code
                //     没错，不知道是为什么，直接这么发就可以了？？？？妈的
            });
            const data = await response.data;
            if (data.code == 200) {
                setCorrect(data.correct)
                setIncorrect(data.incorrect)
                setExpects(data.excepts)
                setGot(data.got)
                setInput(data.input)
                setFail(1)
                if(data.incorrect.length == 0){
                    setStatus("You've Pass All the Tests")
                }else{
                    setStatus("Fail in Some Tests")
                }
            }else if (data.code == 400){
                setFail(2)
                setStatus(data.error)
            }
            console.log("Loaded Tests")
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingTest(false)
        }
    };

    return (
        <div>
            <div className="col-12 no-padding ">
                <div>
                    <CodeMirror
                        value={code}
                        height={"50vh"}
                        theme={monokaiInit({
                            settings: {
                                caret: '#f7f7f7',
                                fontFamily: 'Consolas',
                            }
                        })}
                        extensions={[python()]}
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="col-12 basic-block" style={{overflow : "auto"}}>
                {/*    运行和结果显示的区域*/}
                <div className="row">
                    <div className="col-2">

                        <button className="run_button"
                                onClick={submitCode}>
                            {loading_ide ? <><LoadingOutlined /></> : 'RunCode'}
                        </button>

                        <button className="submit_button"
                            onClick={submitTest}>
                            {loading_test ? <><LoadingOutlined /></> : 'Submit'}
                        </button>

                    </div>
                    <div className="col-10">
                        <textarea className="output bg-modal" value={result}></textarea>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 result_area">

                        <div className="submit_block_roll">
                            <h5 className = "title-font">{status}</h5>
                                <div>
                                    <Test_Element condition={fail} correct={correct} incorrect={incorrect} got = {got} expect={expects} input={input}/>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Editor;
//最后需要Export