import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

// Layout
import HeaderInfoMatrix from "../layout/header/header-homepage";
import SpecificQuestion from "./question-specific";
import FooterBlack from "../layout/footer/footer-black";
import bannerImg from "../../images/banner/banner3.jpg";
// Images
import grace from "../../images/shepower/grace.png";
import margaret from "../../images/shepower/margaret.png";
import ada from "../../images/shepower/ada.png";
import shafi from "../../images/shepower/shafi.png";
import frances from "../../images/shepower/frances.png";
import barbara from "../../images/shepower/barbara.png";
import xia from "../../images/shepower/xia.png";
import perlman from "../../images/shepower/perlman.png";

function ShePower() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const handleClick = (str, name) => {
    setDescription(str);
    setName(name);
  };

  useEffect(() => {
    console.log("description:");
    console.log(description);
  }, [description]);

  function handleBlur() {
    setDescription("");
    setName("");
  }

  return (
    <>
      <HeaderInfoMatrix />
      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">"She Power" in Computer Science</h1>
            </div>
          </div>
        </div>
        <div style={{ color: "rgba(59,35,113,0.8)" }}></div>
        <div
          className="breadcrumb-row"
          style={{
            background:
              "linear-gradient(to bottom, rgba(59,35,113,0.9), #141414)",
            borderBottom: "0",
            height: "8vh",
          }}
        >
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/" style={{ color: "gray" }}>
                  Home
                </Link>
              </li>
              <li style={{ color: "gray" }}>She Power</li>
            </ul>
          </div>
        </div>

        <div className="container-fluid" style={{ backgroundColor: "#141414" }}>
          <div className="wrapper">
            <div className="items">
              <div
                className="item"
                tabIndex="0"
                style={{ backgroundImage: "url(" + grace + ")" }}
                onBlur={handleBlur}
                onClick={() =>
                  handleClick(
                    `Grace Hopper, a distinguished computer scientist and mathematician, is renowned as the designer of the Cobol language (referred to as the \"mother of Cobol\") and served as a United States Navy admiral. She made history as Yale University's first female recipient of a doctorate in Mathematics, graduating in 1934. In 1952, she designed the first compiler known as the A-O compiler. Additionally, Hopper is credited with discovering the world's first \"bug,\" thus coining the popular computer term, in 1946.`,
                    "Grace Hopper"
                  )
                }
              >
                <div></div>
              </div>
              <div
                className="item"
                tabIndex="0"
                style={{ backgroundImage: "url(" + margaret + ")" }}
                onBlur={handleBlur}
                onClick={() =>
                  handleClick(
                    "Margaret Hamilton is a prominent computer scientist, systems engineer, and entrepreneur. She held the position of Director of Software Engineering at the MIT Instrumentation Laboratory, where she played a crucial role in developing flight software for the Apollo spacecraft. Her innovative software solutions were instrumental in ensuring the success of the Apollo 11 lunar landing mission, averting a potential abort. Hamilton is credited with pioneering asynchronous software, priority scheduling, and ultra-reliable software design, significantly advancing the field of software engineering. In 2003, she was honored with the NASA Distinguished Space Operations Award in recognition of her exceptional contributions to the space program.",
                    "Margaret Hamilton"
                  )
                }
              >
                <div></div>
              </div>
              <div
                className="item"
                tabIndex="0"
                style={{ backgroundImage: "url(" + shafi + ")" }}
                onBlur={handleBlur}
                onClick={() =>
                  handleClick(
                    'Shafi Goldwasser, a distinguished computer scientist, was honored with the Turing Award in 2012, which she shared with her colleague Silvio Micali. She holds the position of RSA Professor in the Department of Electrical Engineering and Computer Science at MIT, and she is also a Professor of Computer Science and Applied Mathematics at the Weizmann Institute of Science in Israel. Goldwasser\'s groundbreaking work alongside Silvio Micali on "online transaction security" is widely acknowledged as "laying the foundation of modern cryptographic theory." Their contributions have had a profound impact on the development of current security technologies, including encryption and digital signatures.',
                    "Shafi Goldwasser"
                  )
                }
              >
                <div></div>
              </div>
              <div
                className="item"
                tabIndex="0"
                style={{ backgroundImage: "url(" + ada + ")" }}
                onBlur={handleBlur}
                onClick={(e) =>
                  handleClick(
                    'Ada Lovelace, the daughter of the famous English poet Lord Byron, was not only a mathematician but also a pioneer in computing. In 1842, she wrote the first computer program, and in 1843, she published the world\'s first algorithm. Ada is widely recognized as the founder of computer programming, as she introduced concepts such as loops and subroutines. Her work in drawing up "algorithms" for computing programs and writing the first "programming flow chart" earned her the esteemed title of "the first person to write a program for a computer."',
                    "Ada Lovelace"
                  )
                }
              >
                <div></div>
              </div>
              <div
                className="item"
                tabIndex="0"
                style={{ backgroundImage: "url(" + frances + ")" }}
                onBlur={handleBlur}
                onClick={() =>
                  handleClick(
                    "Frances Elizabeth Allen is a distinguished computer scientist renowned for her expertise in parallel computer compilation. As a trailblazer in compiler optimization, her achievements span the fundamentals of compilers, code optimization, and parallel compilation. In February 2007, Allen made history by becoming the first woman to receive the Turing Award, an honor bestowed upon her in recognition of her exceptional contributions to the field of computer science.",
                    "Frances Elizabeth Allen"
                  )
                }
              >
                <div></div>
              </div>
              <div
                className="item"
                tabIndex="0"
                style={{ backgroundImage: "url(" + barbara + ")" }}
                onClick={() =>
                  handleClick(
                    'Barbara Liskov is a distinguished computer scientist known for her groundbreaking contributions in software engineering and programming language design. She created the "Venus Computer," specifically engineered to support the construction of complex software. Liskov also meticulously detailed the impact of the Algol language on variable range partitioning within the Venus operating system.\n' +
                      "\n" +
                      "Furthermore, she spearheaded the design and implementation of the CLU programming language, which emphasizes modular programming, data abstraction, and polymorphism. Liskov's achievements include the introduction of abstract data types and the associated principles of data abstraction. Moreover, she applied these concepts to object-oriented programming, subtypes, and the formulation of the Liskov substitution principle for inheritance.\n" +
                      "\n" +
                      "In recognition of her exceptional contributions, Liskov was awarded the Turing Award in 2008, the most prestigious accolade in computer science. This honor acknowledges her profound impact on software engineering and programming language development.\n",
                    "Barbara Liskov"
                  )
                }
                onBlur={handleBlur}
              >
                <div></div>
              </div>
              <div
                className="item"
                tabIndex="0"
                style={{ backgroundImage: "url(" + xia + ")" }}
                onClick={() =>
                  handleClick(
                    "Xia Peisu, an expert in electronic computers, is esteemed as one of the pioneers of the Chinese computer industry and is fondly referred to as the mother of Chinese computer. In the 1950s, Xia Peisu achieved a significant milestone by successfully designing and overseeing the trial production of China's first self-designed universal electronic digital computer.\n" +
                      "From the 1960s onward, she embarked on systematic innovations in the research and design of high-speed computers, addressing critical challenges in the transmission of digital signals in large-scale, high-speed computer systems. Xia Peisu's invaluable contributions have laid a robust foundation for the advancement of computer science and technology in China, shaping the trajectory of the nation's technological development.",
                    "Xia Peisu"
                  )
                }
                onBlur={handleBlur}
              ></div>
              <div></div>
            </div>
          </div>
          <div style={{ height: "5vh" }}></div>

          <div style={{ height: "5vh" }}>
            <h3 style={{ textAlign: "center", color: "white" }}>{name}</h3>
          </div>

          <div
            className="fade-in-text"
            style={{ marginLeft: "5vh", marginRight: "5vh" }}
          >
            {description.split("").map((char, index) => (
              <span
                key={index}
                style={{ animationDelay: `${index * 0.01}s` }}
                dangerouslySetInnerHTML={{ __html: char }}
              >
                {/*{char}*/}
              </span>
            ))}
          </div>
          <div style={{ height: "5vh" }}></div>
        </div>
      </div>

      <FooterBlack />
    </>
  );
}

export default ShePower;
