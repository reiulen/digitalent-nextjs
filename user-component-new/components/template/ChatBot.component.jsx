import React, { useState } from "react";
import style from "./Chatbot.module.css";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";

export default function ChatBot() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <div
        className={`${style.Chatbot_container} shadow py-5`}
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <div
          className={`${style.chatbot_box} ${style.one} d-flex justify-content-end`}
          style={clicked ? { width: "280px" } : {}}
        >
          <div
            className={`btn btn-block text-primary rounded-full shadow-sm ${style.chatbot_btn_help}`}
            style={
              clicked
                ? { right: "120px", top: 0, maxHeight: "max-content" }
                : {}
            }
          >
            <div className={`my-3 `}>Butuh Bantuan?</div>
            <div
              className={`${style.helpbtn_active}`}
              style={clicked ? { maxHeight: "200px" } : { maxHeight: "0px" }}
            >
              {clicked && (
                <div>
                  <div
                    className={`${style.chatbot_options} btn-primary btn btn-block rounded-full `}
                  >
                    <i className="ri-question-answer-fill" /> Live Chat
                  </div>
                  <div
                    className={`${style.chatbot_options} btn-primary btn btn-block rounded-full `}
                  >
                    <i className="ri-draft-fill" />
                    Form Pengaduan
                  </div>
                  <div
                    className={`${style.chatbot_options} btn-primary btn btn-block rounded-full `}
                  >
                    <i className="ri-phone-fill" />
                    Hubungi Kami
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={`${style.chatbot_image} d-flex justify-content-end`}>
            <Image
              width={110}
              height={140}
              src={"/assets/media/ChatBot.png"}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
