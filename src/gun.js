import Gun from "gun";
import "gun/sea";

const gun = Gun({
  peers: ["http://localhost:8765/gun"],
});

window.gun = gun;

export default gun;
