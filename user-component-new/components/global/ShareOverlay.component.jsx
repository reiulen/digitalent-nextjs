import React from "react";

import { OverlayTrigger, Popover } from "react-bootstrap";

import {
  WhatsappShareButton,
  FacebookShareButton,
  LineShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  LineIcon,
  TelegramIcon,
} from "react-share";

const ShareOverlay = ({ children, quote, url }) => {
  // children = button or view for triger overlay || quote = quotes or description for user || url = link training or something
  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={
        <Popover id={`popover-positioned-top`}>
          {console.log(url)}
          <Popover.Body>
            <FacebookShareButton url={url} quote={quote} className="mr-3">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={url} quote={quote} className="mr-3">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LineShareButton url={url} quote={quote} className="mr-3">
              <LineIcon size={32} round />
            </LineShareButton>
            <TelegramShareButton url={url} quote={quote}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Popover.Body>
        </Popover>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

export default ShareOverlay;
