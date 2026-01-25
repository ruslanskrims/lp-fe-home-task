import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled: boolean;
}

function Button({ onClick, text, disabled }: ButtonProps) {
  return (
    <button
      className="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
