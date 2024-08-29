import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ChatGPTComponent from "../elements/question/ai";

function TestAi () {
    return(
        <>
        <ChatGPTComponent init_token={"介绍一下图灵奖的内容"} />
        </>
    )
}

export default TestAi