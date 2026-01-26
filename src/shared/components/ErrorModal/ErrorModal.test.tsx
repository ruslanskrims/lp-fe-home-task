import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import ErrorModal from './ErrorModal';
import { BirthdayProvider } from '../../../context/birthday/BirthdayContext';
import { PaginationProvider } from '../../../context/pagination/PaginationContext';

describe('ErrorModal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const errorMock = '400 Bad Request';
  const setErrorMock = vi.fn();

  const renderComponent = (errMock: string | null, setErrMock: (error: string | null) => void) => {
    return render(
      <BirthdayProvider>
        <PaginationProvider>
          <ErrorModal
            error={errMock}
            setError={setErrMock}
          />
        </PaginationProvider>
      </BirthdayProvider>
    );
  };

  it('renders ErrorModal component', async () => {
    renderComponent(errorMock, setErrorMock);

    expect(screen.getByText('400 Bad Request')).toBeInTheDocument();
  });

  it('removes ErrorModal after 4 seconds', async () => {
    renderComponent(errorMock, setErrorMock);

    expect(setErrorMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(4000);

    expect(setErrorMock).toHaveBeenCalledWith(null);
    expect(setErrorMock).toHaveBeenCalledTimes(1);
  });

  it('should not trigger clearTimeout', async () => {
    renderComponent(null, setErrorMock);

    expect(setErrorMock).not.toHaveBeenCalled();
  });
});
