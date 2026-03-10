import './BirthdayItem.scss';

interface BirthdayItemProps {
  text: string;
  year: number;
}

function BirthdayItem({ text, year }: BirthdayItemProps) {
  return (
    <li className="birthday-list__item">
      Name: {text}. Year: {year}
    </li>
  );
}

export default BirthdayItem;
