import React, { useEffect } from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface ToastProps {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  type,
  message,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div
        className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg border ${
          isSuccess
            ? 'bg-green-900/80 border-green-700 text-green-100'
            : 'bg-red-900/80 border-red-700 text-red-100'
        } backdrop-blur-sm`}
      >
        {isSuccess ? (
          <HiCheckCircle className="text-2xl flex-shrink-0" />
        ) : (
          <HiXCircle className="text-2xl flex-shrink-0" />
        )}
        <span className="font-medium">{message}</span>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
