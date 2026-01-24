import './BirthdayItem.scss';

interface BirthdayItemProps {
  text: string;
}

function BirthdayItem({ text }: BirthdayItemProps) {
  return (
    <li className="birthday-list__item">
      {text}
    </li>
  );
}

export default BirthdayItem;
