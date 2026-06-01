import React from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface ModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm mx-4 border border-gray-700">
        <div className="flex flex-col items-center text-center">
          {isSuccess ? (
            <HiCheckCircle className="text-5xl text-green-400 mb-4" />
          ) : (
            <HiXCircle className="text-5xl text-red-400 mb-4" />
          )}

          <h2 className="text-2xl font-bold mb-3">
            {isSuccess ? 'Message Sent!' : 'Oops!'}
          </h2>

          <p className="text-gray-300 mb-6">{message}</p>

          <button
            onClick={onClose}
            className={`px-8 py-2 rounded-lg font-semibold transition-colors ${
              isSuccess
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
