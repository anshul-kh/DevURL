import { toast } from "react-toastify";
import { Modal } from "..";
import { useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { Close } from "../../assets";
import { useSetRecoilState } from "recoil";
import { shareIcon } from "../../states";

const Share = () => {
  const setModal = useSetRecoilState(shareIcon);
  const { username } = useParams();

  return (
    <Modal resize="w-5/6 md:w-1/5 min-h-2/5 h-fit justify-center items-center flex-col">
      <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
        <button
          className="absolute w-5 h-5 left-4 "
          onClick={() => setModal(false)}
        >
          <img src={Close} alt="close" />
        </button>
        <p>Share The QR Code</p>
        {username ? (
          <QRCode
            value={`http://localhost:5173/${username}`}
            size={200}
            fgColor="#000000"
            bgColor="#ffffff"
          />
        ) : (
          <p>Invalid Access</p>
        )}
        <p>Copy The URL</p>
        <div className="flex gap-5 justify-center items-centers">
          <p className="font-semibold h-10 text-center flex items-center">
            http://devurl/{username}
          </p>
          <div
            className="p-2 w-20 h-10 flex items-center justify-center bg-black text-white rounded"
            onClick={() => {
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
