import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
}
function Button({ onClick, text }: ButtonProps) {
  return (
    <button
      className="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
