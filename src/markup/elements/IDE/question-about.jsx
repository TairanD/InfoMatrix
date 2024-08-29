import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function QuestionAbout({ id }) {
  const [data, setData] = useState(null);

  const markdown1 = `

给你两个整数 m 和 n ，分别表示一块矩形木块的高和宽。同时给你一个二维整数数组 **prices** ，
 
其中 prices[i] = [hi, wi, pricei] 表示你可以以 pricei 元的价格卖一块高为 hi 宽为 wi 的矩形木块。

每一次操作中，你必须按下述方式之一执行切割操作，以得到两块更小的矩形木块：

沿垂直方向按高度 完全 切割木块，或
沿水平方向按宽度 完全 切割木块
`;

  const markdown2 = `
在将一块木块切成若干小木块后，你可以根据 prices 卖木块。你可以卖多块同样尺寸的木块。你不需要将所有小木块都卖出去。你**不能**旋转切好后木块的高和宽。

请你返回切割一块大小为 m x n 的木块后，能得到的 最多 钱数。

注意你可以切割木块任意次。
`;

  useEffect(() => {
    fetchData(id); //调用异步获取
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await fetch("/find_coding_question/" + id);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {data ? (
        <div>
          <div>
            <h1 className="title-font">{id}{'.'} {data.name}</h1>
          </div>

          <div className="text-font">
            {data.content} You can try to deal this problem with python code
          </div>
          <div style={{ height: "5vh" }}></div>

          <div className="widget_tag_cloud">
            <h6 className="stress">TAGS:</h6>
            <div className="tagcloud">
              {data.tag.split(",").map((tag, index) => (
                <Link key={index} to="">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ height: "5vh" }}></div>

          <div className="stress">Detail Examples:</div>
          <br></br>
          <ReactMarkdown className="text-font" children={data.describe} />

          <div style={{ height: "5vh" }}></div>
          <div className="stress">Hints:</div>
          <br></br>
          <ReactMarkdown className="text-font" children={data.hint} />
        </div>
      ) : (
        <div>Loading...Question</div>
      )}
    </div>
  );
}

export default QuestionAbout;
