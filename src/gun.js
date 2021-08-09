import Gun from "gun";
import "gun/sea";
// const peers = ["https://gun-us.herokuapp.com/gun"];

const gun = Gun({
  peers: [
    "http://localhost:8765/gun",
    "https://gun-manhattan.herokuapp.com/gun",
    "https://gun-us.herokuapp.com/gun",
  ],
});

window.gun = gun;

export default gun;
