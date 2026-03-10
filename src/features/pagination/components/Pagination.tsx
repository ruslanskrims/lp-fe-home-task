import { usePaginationContext } from '../../../context/pagination/PaginationContext';
import Button from '../../../shared/components/Button/Button';
import './Pagination.scss';

function Pagination() {
  const { activePageNumber, navigateToPage, totalPageNumber, showVisiblePages } =
    usePaginationContext();
  const pageNumbers = showVisiblePages();

  return (
    <div className="pagination">
      <Button
        text="Previous"
        className="pagination__button"
        onClick={() => navigateToPage(activePageNumber - 1)}
        disabled={activePageNumber === 1}
      />
      {pageNumbers.map((num, index) => (
        <Button
          key={index}
          text={`${num}`}
          className={
            activePageNumber === num
              ? 'pagination__button pagination__button--active'
              : 'pagination__button'
          }
          onClick={() => typeof num === 'number' && navigateToPage(num)}
          disabled={typeof num === 'string'}
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
