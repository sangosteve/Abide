import React from "react";
import { Circle, G, Line, Path, Rect, Svg } from "react-native-svg";

type IconName =
  | "home" | "home-fill"
  | "bell" | "bell-fill"
  | "play-circle" | "play-circle-fill"
  | "book-open"
  | "heart" | "heart-fill"
  | "users"
  | "calendar"
  | "search"
  | "clock"
  | "map-pin"
  | "share"
  | "arrow-left"
  | "arrow-right"
  | "chevron-right"
  | "chevron-down"
  | "check"
  | "check-circle"
  | "check-badge"
  | "plus"
  | "minus"
  | "x"
  | "credit-card"
  | "lock"
  | "shield"
  | "download"
  | "bookmark"
  | "filter"
  | "image"
  | "smile"
  | "message-circle"
  | "globe"
  | "info"
  | "rotate-left"
  | "rotate-right"
  | "pause"
  | "play"
  | "settings"
  | "phone"
  | "logout"
  | "gift"
  | "zap"
  | "list"
  | "edit"
  | "more-horizontal"
  | "more-vertical"
  | "user"
  | "user-circle"
  | "file-text"
  | "eye"
  | "star"
  | "star-fill"
  | "mic"
  | "headphones"
  | "video"
  | "camera"
  | "music"
  | "dots-vertical"
  | "dots-horizontal"
  | "trending-up"
  | "send"
  | "refresh";

interface HIconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function HIcon({ name, size = 24, color = "#000", strokeWidth = 1.5 }: HIconProps) {
  const props = { fill: "none", stroke: color, strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  const icons: Record<IconName, React.ReactNode> = {
    "home": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M10 2.375C10 2.375 2 7.5 2 14a10 10 0 0 0 20 0c0-6.5-8-11.625-8-11.625" {...props}/><Path d="M12 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill={color} stroke="none"/><Path d="M9 13v-3" {...props}/></Svg>,
    "home-fill": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 2L3 9.5V21h6v-5h6v5h6V9.5L12 2z" fill={color}/></Svg>,
    "bell": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M5.5 10.5a6.5 6.5 0 0 1 13 0v2.5l1.5 2H4l1.5-2v-2.5z" {...props}/><Path d="M10 19c0 1.1.9 2 2 2s2-.9 2-2" {...props}/></Svg>,
    "bell-fill": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M5.5 10.5a6.5 6.5 0 0 1 13 0v2.5l1.5 2H4l1.5-2v-2.5z" fill={color}/><Path d="M10 19c0 1.1.9 2 2 2s2-.9 2-2" {...props}/></Svg>,
    "play-circle": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="10" {...props}/><Path d="M10 8l6 4-6 4V8z" {...props}/></Svg>,
    "play-circle-fill": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="10" fill={color}/><Path d="M10 8l6 4-6 4V8z" fill="#fff" stroke="none"/></Svg>,
    "book-open": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M2 4h9v16H2V4z" {...props}/><Path d="M13 4h9v16h-9V4z" {...props}/><Path d="M11 4c0 0 .5 1.5 1 2" {...props}/><Path d="M12 6v14" {...props}/></Svg>,
    "heart": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 21C12 21 3 15 3 8.5a4.5 4.5 0 0 1 9-0a4.5 4.5 0 0 1 9 0C21 15 12 21 12 21z" {...props}/></Svg>,
    "heart-fill": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 21C12 21 3 15 3 8.5a4.5 4.5 0 0 1 9-0a4.5 4.5 0 0 1 9 0C21 15 12 21 12 21z" fill={color} stroke={color} strokeWidth={strokeWidth}/></Svg>,
    "users": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="9" cy="7" r="3" {...props}/><Path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" {...props}/><Path d="M15 11a3 3 0 1 0 0-6" {...props}/><Path d="M22 20c0-3-2.5-5.5-5.5-5.5" {...props}/></Svg>,
    "calendar": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Rect x="3" y="4" width="18" height="17" rx="2" {...props}/><Path d="M3 9h18" {...props}/><Path d="M8 2v3M16 2v3" {...props}/><Path d="M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2" {...props}/></Svg>,
    "search": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="11" cy="11" r="7" {...props}/><Path d="M16 16l4 4" {...props}/></Svg>,
    "clock": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" {...props}/><Path d="M12 7v5l3 3" {...props}/></Svg>,
    "map-pin": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 21c-4-4.5-7-8-7-11a7 7 0 1 1 14 0c0 3-3 6.5-7 11z" {...props}/><Circle cx="12" cy="10" r="2.5" {...props}/></Svg>,
    "share": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="18" cy="5" r="2.5" {...props}/><Circle cx="6" cy="12" r="2.5" {...props}/><Circle cx="18" cy="19" r="2.5" {...props}/><Path d="M8.3 10.7l7.4-4.4M8.3 13.3l7.4 4.4" {...props}/></Svg>,
    "arrow-left": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M20 12H4M4 12l7-7M4 12l7 7" {...props}/></Svg>,
    "arrow-right": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M4 12h16M16 5l7 7-7 7" {...props}/></Svg>,
    "chevron-right": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M9 6l6 6-6 6" {...props}/></Svg>,
    "chevron-down": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M6 9l6 6 6-6" {...props}/></Svg>,
    "check": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M5 12l5 5L19 7" {...props}/></Svg>,
    "check-circle": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" {...props}/><Path d="M8 12l3 3 5-5" {...props}/></Svg>,
    "check-badge": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 2l2.5 2.5H18V8l2.5 2.5L18 13v3.5h-3.5L12 19l-2.5-2.5H6V13l-2.5-2.5L6 8V4.5h3.5L12 2z" {...props}/><Path d="M8.5 12l2.5 2.5L15 10" {...props}/></Svg>,
    "plus": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 5v14M5 12h14" {...props}/></Svg>,
    "minus": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M5 12h14" {...props}/></Svg>,
    "x": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M6 6l12 12M18 6L6 18" {...props}/></Svg>,
    "credit-card": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Rect x="2" y="5" width="20" height="14" rx="2" {...props}/><Path d="M2 10h20" {...props}/><Path d="M6 15h4" {...props}/></Svg>,
    "lock": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Rect x="5" y="11" width="14" height="11" rx="2" {...props}/><Path d="M8 11V7a4 4 0 1 1 8 0v4" {...props}/><Circle cx="12" cy="16" r="1" fill={color}/></Svg>,
    "shield": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 3L4 7v6c0 4 3.5 7.7 8 9 4.5-1.3 8-5 8-9V7l-8-4z" {...props}/><Path d="M9 12l2 2 4-4" {...props}/></Svg>,
    "download": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 3v12M8 11l4 4 4-4" {...props}/><Path d="M3 18h18" {...props}/></Svg>,
    "bookmark": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M5 3h14v18l-7-4-7 4V3z" {...props}/></Svg>,
    "filter": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M3 5h18M7 12h10M11 19h2" {...props}/></Svg>,
    "image": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Rect x="3" y="3" width="18" height="18" rx="2" {...props}/><Circle cx="8.5" cy="8.5" r="1.5" {...props}/><Path d="M21 15l-5-5L5 21" {...props}/></Svg>,
    "smile": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" {...props}/><Path d="M8.5 14.5s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5" {...props}/><Circle cx="9" cy="10" r="1" fill={color}/><Circle cx="15" cy="10" r="1" fill={color}/></Svg>,
    "message-circle": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 3C7 3 3 6.6 3 11c0 2 .8 3.7 2 5L4 20l4.5-1.5C9.6 19 10.8 19 12 19c5 0 9-3.6 9-8S17 3 12 3z" {...props}/></Svg>,
    "globe": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" {...props}/><Path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" {...props}/><Path d="M3 12h18" {...props}/><Path d="M3.5 8h17M3.5 16h17" {...props}/></Svg>,
    "info": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" {...props}/><Path d="M12 11v6" {...props}/><Circle cx="12" cy="7.5" r="1" fill={color}/></Svg>,
    "rotate-left": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M3 9V4M3 9h5" {...props}/><Path d="M3 9A9 9 0 1 1 3 15" {...props}/></Svg>,
    "rotate-right": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M21 9V4M21 9h-5" {...props}/><Path d="M21 9A9 9 0 1 0 21 15" {...props}/></Svg>,
    "pause": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Rect x="6" y="4" width="4" height="16" rx="1" fill={color}/><Rect x="14" y="4" width="4" height="16" rx="1" fill={color}/></Svg>,
    "play": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M5 3l14 9-14 9V3z" fill={color}/></Svg>,
    "settings": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="3" {...props}/><Path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" {...props}/></Svg>,
    "phone": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2C17.5 15.6 18.7 16 20 16c.6 0 1 .4 1 1v3c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3c.6 0 1 .4 1 1 0 1.3.4 2.5 1 3.6.1.3.1.7-.2 1L6.6 10.8z" {...props}/></Svg>,
    "logout": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" {...props}/><Path d="M16 17l5-5-5-5M21 12H9" {...props}/></Svg>,
    "gift": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Rect x="2" y="8" width="20" height="4" rx="1" {...props}/><Path d="M4 12v8h16v-8" {...props}/><Path d="M12 8v12" {...props}/><Path d="M12 8c0 0-3-5 0-5s0 5 0 5" {...props}/><Path d="M12 8c0 0 3-5 0-5s0 5 0 5" {...props}/></Svg>,
    "zap": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M13 2L4.5 13.5H11L10.5 22L20 10.5H13.5L13 2z" fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/></Svg>,
    "list": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" {...props}/></Svg>,
    "edit": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" {...props}/><Path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" {...props}/></Svg>,
    "more-horizontal": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="5" cy="12" r="1.5" fill={color}/><Circle cx="12" cy="12" r="1.5" fill={color}/><Circle cx="19" cy="12" r="1.5" fill={color}/></Svg>,
    "more-vertical": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="5" r="1.5" fill={color}/><Circle cx="12" cy="12" r="1.5" fill={color}/><Circle cx="12" cy="19" r="1.5" fill={color}/></Svg>,
    "user": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="8" r="4" {...props}/><Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...props}/></Svg>,
    "user-circle": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="9" {...props}/><Circle cx="12" cy="10" r="3" {...props}/><Path d="M6.5 19c.7-2.4 3-4 5.5-4s4.8 1.6 5.5 4" {...props}/></Svg>,
    "file-text": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" {...props}/><Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" {...props}/></Svg>,
    "eye": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" {...props}/><Circle cx="12" cy="12" r="3" {...props}/></Svg>,
    "star": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 17.8l-6.2 3.3 1.2-6.9-5-4.9 6.9-1z" {...props}/></Svg>,
    "star-fill": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 17.8l-6.2 3.3 1.2-6.9-5-4.9 6.9-1z" fill={color}/></Svg>,
    "mic": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Rect x="9" y="2" width="6" height="11" rx="3" {...props}/><Path d="M5 10a7 7 0 0 0 14 0" {...props}/><Path d="M12 19v3M8 22h8" {...props}/></Svg>,
    "headphones": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M3 18v-6a9 9 0 0 1 18 0v6" {...props}/><Path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" {...props}/><Path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" {...props}/></Svg>,
    "video": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M15 10l4.5-3v10L15 14" {...props}/><Rect x="2" y="7" width="13" height="10" rx="2" {...props}/></Svg>,
    "camera": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z" {...props}/><Circle cx="12" cy="13" r="4" {...props}/></Svg>,
    "music": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M9 18V5l12-2v13" {...props}/><Circle cx="6" cy="18" r="3" {...props}/><Circle cx="18" cy="16" r="3" {...props}/></Svg>,
    "dots-vertical": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="5" r="1.5" fill={color}/><Circle cx="12" cy="12" r="1.5" fill={color}/><Circle cx="12" cy="19" r="1.5" fill={color}/></Svg>,
    "dots-horizontal": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Circle cx="5" cy="12" r="1.5" fill={color}/><Circle cx="12" cy="12" r="1.5" fill={color}/><Circle cx="19" cy="12" r="1.5" fill={color}/></Svg>,
    "trending-up": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M23 6l-9.5 9.5-5-5L1 18" {...props}/><Path d="M17 6h6v6" {...props}/></Svg>,
    "send": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" {...props}/></Svg>,
    "refresh": <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"><Path d="M23 4v6h-6M1 20v-6h6" {...props}/><Path d="M3.5 9A9 9 0 0 1 20 9M20.5 15A9 9 0 0 1 4 15" {...props}/></Svg>,
  };

  return <>{icons[name] ?? icons["more-horizontal"]}</>;
}
