import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BirthdayList from './BirthdayList';

const mockBirthdayData = {
  births: [
    {
      text: 'Julio Enciso, Paraguayan footballer',
      pages: [],
      year: 2004
    },
    {
      text: 'Joško Gvardiol, Croatian footballer',
      pages: [],
      year: 2002
    }
  ]
};

describe('BirthdayList', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBirthdayData)
      } as Response)
    );
  });

  it('renders the list', async () => {
    render(<BirthdayList />);
    expect(screen.getByText("Get today's birthday list")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Get today's birthday list"));

    expect(await screen.findByText('Julio Enciso, Paraguayan footballer')).toBeInTheDocument();
    expect(screen.getByText('Joško Gvardiol, Croatian footballer')).toBeInTheDocument();
  });
});
