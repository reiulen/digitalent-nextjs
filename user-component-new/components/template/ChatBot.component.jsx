import React, { useState } from "react";
import style from "./Chatbot.module.css";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function ChatBot() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={`${style.Chatbot_container} shadow`}>
      <div
        className={`${style.chatbot_box} ${style.one} d-flex justify-content-end `}
        style={clicked ? { width: "280px" } : {}}
      >
        <button
          className={`btn btn-block  text-primary ${
            clicked ? "rounded-lg" : "rounded-full"
          } shadow-sm ${style.chatbot_btn_help} ${
            clicked && style.right_animation
          }`}
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          <div
            className={`d-flex justify-content-between ${clicked && "py-2"}`}
          >
            <div>Butuh Bantuan?</div>
            {clicked && <div className="ri-close-line text-gray"></div>}
          </div>

          <div
            className={`${style.helpbtn_active}`}
            style={clicked ? { maxHeight: "200px" } : { maxHeight: "0px" }}
          >
            {clicked && (
              <div className="d-flex flex-column text-left">
                <a href="/helpdesk/live-chat" className={`py-2 rounded-full `}>
                  <i className="ri-question-answer-fill text-primary text-left" />{" "}
                  Live Chat
                </a>
                <Link href="/helpdesk/formulir-pengaduan" passHref>
                  <a className={` rounded-full py-2`}>
                    <i className="ri-draft-fill text-primary" />
                    Form Pengaduan
                  </a>
                </Link>
                <a className={`rounded-full py-2`} href="tel:0213452841">
                  <i className="ri-phone-fill text-primary" />
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
