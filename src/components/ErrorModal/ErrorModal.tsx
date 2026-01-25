import { useEffect } from 'react';
import './ErrorModal.scss';

interface ErrorModalProps {
  error: string | null;
  setError: (error: string | null) => void;
}

function ErrorModal({ error, setError }: ErrorModalProps) {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
    return;
  }, [error, setError]);

  return (
    <div className="error-modal">
      <div className="error-modal__content">
        <div className="error-modal__header">
          <h2 className="error-modal__title">Error</h2>
        </div>
        <p className="error-modal__message">{error}</p>
      </div>
    </div>
  );
}

export default ErrorModal;
