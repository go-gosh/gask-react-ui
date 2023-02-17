import React from "react";

interface ModalProps {
  children?: React.ReactNode | undefined;
  show?: boolean | undefined;
  onClose: () => void;
  onOk?: () => void;
  title?: string;
}

export default function Modal(props: ModalProps) {
  const okButton = (
    <button
      className="btn mr-1 mb-1 font-bold uppercase"
      type="button"
      onClick={props.onOk}
    >
      Save
    </button>
  );
  const cancelButton = (
    <button
      className="btn-plain mr-1 mb-1 font-bold uppercase"
      type="button"
      onClick={props.onClose}
    >
      Close
    </button>
  );
  return (
    <>
      {props.show ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-4xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-secondary-light p-5">
                  {props.title}
                </div>
                {/*body*/}
                <div className="relative w-full flex-auto px-6">
                  {props.children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  {cancelButton}
                  {okButton}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
