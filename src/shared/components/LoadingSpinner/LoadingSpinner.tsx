import { MoonLoader } from 'react-spinners';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  color: string;
  ariaLabel?: string;
  dataTestId?: string;
  text: string;
}

function LoadingSpinner({ color, ariaLabel, dataTestId, text }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner__container">
      <MoonLoader
        color={color}
        aria-label={ariaLabel}
        data-testid={dataTestId}
      />
      <p className="loading-spinner__text">{text}</p>
    </div>
  );
}

export default LoadingSpinner;
