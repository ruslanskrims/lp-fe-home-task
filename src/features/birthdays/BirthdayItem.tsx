import './BirthdayItem.scss';

interface BirthdayItemProps {
  text: string;
  id: number;
}

function BirthdayItem({ text, id }: BirthdayItemProps) {
  return (
    <li
      key={id}
      className="birthday-list__item"
    >
      {text}
    </li>
  );
}

export default BirthdayItem;
