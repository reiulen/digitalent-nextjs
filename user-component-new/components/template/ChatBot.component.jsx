import React, { useState } from "react";
import style from "./Chatbot.module.css";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function ChatBot() {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`${style.Chatbot_container} shadow`}
      onClick={() => {
        setClicked(!clicked);
      }}
    >
      <div
        className={`${style.chatbot_box} ${style.one} d-flex justify-content-end `}
        style={clicked ? { width: "280px" } : {}}
      >
        <button
          className={`btn btn-block text-primary rounded-full shadow-sm ${
            style.chatbot_btn_help
          } ${clicked && style.right_animation}`}
          // style={
          //   clicked ? { right: "60px", top: 0, maxHeight: "max-content" } : {}
          // }
        >
          <div className={`my-3 `}>Butuh Bantuan?</div>
          <div
            className={`${style.helpbtn_active}`}
            style={clicked ? { maxHeight: "200px" } : { maxHeight: "0px" }}
          >
            {clicked && (
              <div>
                <a
                  href="/helpdesk/live-chat"
                  className={`${style.chatbot_options} btn-primary btn btn-block rounded-full `}
                >
                  <i className="ri-question-answer-fill" /> Live Chat
                </a>
                <Link href="/helpdesk/formulir-pengaduan">
                  <div
                    className={`${style.chatbot_options} btn-primary btn btn-block rounded-full `}
                  >
                    <i className="ri-draft-fill" />
                    Form Pengaduan
                  </div>
                </Link>

                <a
                  className={`${style.chatbot_options} btn-primary btn btn-block rounded-full `}
                  href="tel:0213452841"
                >
                  <i className="ri-phone-fill" />
                  Hubungi Kami
                </a>
              </div>
            )}
          </div>
        </button>
        <div className={`${style.chatbot_image} justify-content-end`}>
          <Image
            width={100}
            height={120}
            src={"/assets/media/ChatBot.png"}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
