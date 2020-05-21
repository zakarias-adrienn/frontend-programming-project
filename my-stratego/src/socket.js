import io from "socket.io-client";

let socket = io("http://webprogramozas.inf.elte.hu:3030");
export default socket;