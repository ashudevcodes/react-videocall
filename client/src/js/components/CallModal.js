import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "./ActionButton";
import iphoneringtone from "../../../../audio/iphoneringtone.mp3";
import useSound from "use-sound";

function CallModal({ status, callFrom, startCall, rejectCall }) {
  const [play, { stop }] = useSound(iphoneringtone);
  if (status == "active") {
    play();
  } else if (status == "") {
    stop();
  }

  const acceptWithVideo = (video) => {
    const config = { audio: true, video };
    return () => startCall(false, callFrom, config);
  };

  return (
    <div className={classnames("call-modal", status)}>
      <p>
        <span className="caller">{`${callFrom} is calling`}</span>
      </p>
      <ActionButton icon={faVideo} onClick={acceptWithVideo(true)} />
      <ActionButton icon={faPhone} onClick={acceptWithVideo(false)} />
      <ActionButton className="hangup" icon={faPhone} onClick={rejectCall} />
    </div>
  );
}

CallModal.propTypes = {
  status: PropTypes.string.isRequired,
  callFrom: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired,
};

export default CallModal;
