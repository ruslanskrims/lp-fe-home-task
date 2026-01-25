import { useBirthdayContext } from '../../features/birthdays/context/BirthdayContext';
import './Pagination.scss';

function Pagination() {
  const { activePageNumber, navigateToPage, totalPageNumber } = useBirthdayContext();

  const pageNumbers = [...Array(totalPageNumber).keys()].map(num => num + 1);
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => navigateToPage(activePageNumber - 1)}
        disabled={activePageNumber === 1}
      >
        Previous
      </button>
      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => navigateToPage(num)}
          className={
            activePageNumber === num
              ? 'pagination__button pagination__button--active'
              : 'pagination__button'
          }
        >
          {num}
        </button>
      ))}
      <button
        className="pagination__button"
        onClick={() => navigateToPage(activePageNumber + 1)}
        disabled={activePageNumber === totalPageNumber}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
