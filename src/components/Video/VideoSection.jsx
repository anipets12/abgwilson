import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const VideoSection = ({ videoUrl }) => {
    return (_jsx("div", { className: "video-section", children: _jsx("iframe", { src: videoUrl, title: "Video explicativo", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }));
};
export default VideoSection;
