import './SortButton.scss';

interface SortButtonProps {
  onToggle: () => void;
  sortedBy: 'asc' | 'desc';
}

function SortButton({ onToggle, sortedBy }: SortButtonProps) {
  return (
    <button
      className="sort-button"
      onClick={onToggle}
    >
      Sort
      <span className={`sort-button__icon sort-button__icon--${sortedBy}`} />
    </button>
  );
}

export default SortButton;
