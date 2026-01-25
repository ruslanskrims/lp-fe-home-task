import './Pagination.scss';

interface PaginationProps {
  activePageNumber: number;
  onPageChange: (pageNumber: number) => void;
  onHandleNextPage: () => void;
  onHandlePreviousPage: () => void;
  totalPagesNumber: number;
}

function Pagination({
  activePageNumber,
  onPageChange,
  onHandleNextPage,
  onHandlePreviousPage,
  totalPagesNumber
}: PaginationProps) {
  const pageNumbers = [...Array(totalPagesNumber).keys()].map(num => num + 1);
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => onHandlePreviousPage()}
      >
        Previous
      </button>
      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
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
        onClick={() => onHandleNextPage()}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
