import React, {useCallback, useEffect, useState} from 'react';

function Test_Element({condition,correct,incorrect,got,expect,input}) {
        let content;
        let totalLen = correct.length + incorrect.length
        let rangeArray = Array.from({ length: (totalLen) }, (_, i) => i);

    if(condition == 0){
            content =  <div></div>
        }else if (condition == 1){
        console.log(rangeArray)
            content =
                <div>
                    <span className="coding-question-results">
                    <table>
                        <thead>
                        <tr>
                            {/* <th>State</th> */}
                            <th>ID</th>
                            <th>Input</th>
                            <th>Expect</th>
                            <th>Got</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rangeArray.map((test_id, index) => (
                            <tr
                                key={test_id}
                                className={test_id % 2 === 1 ? "even-row" : ""}
                            >

                                <td className="no-padding-left">{test_id}</td>
                                <td className="no-padding-left">{expect_caster(input[test_id])}</td>
                                <td className="no-padding-left">{expect_caster(expect[test_id])}</td>
                                <td className="no-padding-left">{got[test_id]}</td>
                                <td className="no-padding-left"> {correct.includes(test_id) ? (
                                    <div style={{color: "green", fontWeight: "bold"}}>correct</div>
                                ) : (
                                    <div style={{color: "red", fontWeight: "bold"}}>incorrect</div>
                                )} </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </span>
                </div>
    } else if (condition == 2) {
        content = <div></div>
    }

    function expect_caster(input){
        //显示数组情况的答案用
        if (Array.isArray(input)){
            return "[" + input.join(", ") + "]" // 逗号分隔结果
        }
        return input
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default Test_Element