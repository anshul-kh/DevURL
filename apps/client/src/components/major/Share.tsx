import { toast } from "react-hot-toast";
import { Modal } from "..";
import { useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { Close } from "../../assets";
import copy from "copy-to-clipboard";

const Share = ({ onClose }: { isOpen?: boolean, onClose: () => void }) => {
  const { username } = useParams();
  const url = `https://` + window.location.host  + `/user/${username}`;

  return (
    <Modal onClose={onClose} resize="w-5/6 min-w-fit md:w-1/5 min-h-2/5 h-fit justify-center items-center flex-col">
      <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
        <button
          className="absolute w-5 h-5 left-4 "
          onClick={onClose}
        >
          <img src={Close} alt="close" onClick={onClose}
          />
        </button>
        <p>Share The QR Code</p>
        {username ? (
          <QRCode value={url} size={200} fgColor="#000000" bgColor="#ffffff" />
        ) : (
          <p>Invalid Access</p>
        )}
        <p>Copy The URL</p>
        <div className="flex gap-2 justify-center items-centers">
          <input className="font-semibold h-10 text-center flex items-center pl-2 bg-gray-200 rounded-lg border border-cadet_gray-800 cursor-not-allowed" type="text" value={url} readOnly />
          <div
            className="p-2 w-20 h-10 flex items-center justify-center bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-200"
            onClick={() => {
              copy(url);
              toast("Copied to Clipboard");
            }}
          >
            Copy
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Share;
