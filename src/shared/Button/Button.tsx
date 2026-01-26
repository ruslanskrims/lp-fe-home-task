import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function Button({ onClick, text, disabled, className, children }: ButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
}

export default Button;
