import Button from '../Button/Button';
import './SortButton.scss';

interface SortButtonProps {
  onToggle: () => void;
  sortedBy: 'asc' | 'desc';
}

function SortButton({ onToggle, sortedBy }: SortButtonProps) {
  return (
    <Button
      className="sort-button"
      onClick={onToggle}
      text="Sort"
    >
      <span className={`sort-button__icon sort-button__icon--${sortedBy}`} />
    </Button>
  );
}

export default SortButton;
