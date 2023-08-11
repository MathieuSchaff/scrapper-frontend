"use client";
// import React, from 'react';
import { createPortal } from 'react-dom';

// const Modal = ({ children, onClose }) => {
//   return createPortal(
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="bg-white rounded-lg shadow-lg z-10">
//         <div className="px-4 py-2">
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none absolute top-2 right-3 text-3xl"
//           >
//             &times;
//           </button>
//           {children}
//         </div>
//       </div>
//     </div>,
//     document.querySelector("body")!
//   );
// };
const Modal = ({ children, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 bg-white flex items-center justify-center z-30 overflow-auto">
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      <div className="bg-white rounded-lg shadow-lg z-50 max-h-full overflow-auto">
        <div className="px-4 py-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none absolute top-2 right-3 z-50"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.querySelector("body")!
    // document.getElementById('modal-root')
  );
};
const JobDetailsModal = ({ job, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="text-lg font-semibold mb-2">{job.title}</div>
      <div className="text-gray-600 mb-4">
        <p>{job.details}</p>
      </div>
      <button
        onClick={onClose}
        className="bg-blue-500 text-white text-lg px-4 py-4 rounded-md hover:bg-blue-600 focus:outline-none z-50"
      >
        Close
      </button>
    </Modal>
  );
};

export default JobDetailsModal;
