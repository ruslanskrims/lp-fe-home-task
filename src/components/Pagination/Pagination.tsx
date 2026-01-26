import { useBirthdayContext } from '../../features/birthdays/context/BirthdayContext';
import Button from '../../shared/Button/Button';
import './Pagination.scss';

function Pagination() {
  const { activePageNumber, navigateToPage, totalPageNumber } = useBirthdayContext();

  const pageNumbers = [...Array(totalPageNumber).keys()].map(num => num + 1);
  return (
    <div className="pagination">
      <Button
        text="Previous"
        className="pagination__button"
        onClick={() => navigateToPage(activePageNumber - 1)}
        disabled={activePageNumber === 1}
      />
      {pageNumbers.map(num => (
        <Button
          text={`${num}`}
          className={
            activePageNumber === num
              ? 'pagination__button pagination__button--active'
              : 'pagination__button'
          }
          onClick={() => navigateToPage(num)}
        />
      ))}
      <Button
        text="Next"
        className="pagination__button"
        onClick={() => navigateToPage(activePageNumber + 1)}
        disabled={activePageNumber === totalPageNumber}
      />
    </div>
  );
}

export default Pagination;
