import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BirthdayList from './BirthdayList';
import { mockBirthdayData } from './mocks/mockBirthdayData';
import { BirthdayProvider } from '../../context/birthday/BirthdayContext';
import { PaginationProvider } from '../../context/pagination/PaginationContext';

describe('BirthdayList', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBirthdayData)
      } as Response)
    );
  });

  it('renders the birthday list', async () => {
    render(
      <BirthdayProvider>
        <PaginationProvider>
          <BirthdayList />
        </PaginationProvider>
      </BirthdayProvider>
    );

    expect(screen.getByText("Get today's birthday list")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Get today's birthday list"));

    expect(
      await screen.findByText('Name: Julio Enciso, Paraguayan footballer. Year: 2004')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Name: Joško Gvardiol, Croatian footballer. Year: 2002')
    ).toBeInTheDocument();
  });
});
