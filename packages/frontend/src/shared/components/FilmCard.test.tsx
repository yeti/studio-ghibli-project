import { render, screen, fireEvent } from '@testing-library/react';
import { FilmCard } from './FilmCard';
import useMediaQuery from '@mui/material/useMediaQuery';

import { vi } from 'vitest';

// Mock useMediaQuery hook
vi.mock('@mui/material/useMediaQuery', () => ({
  default: vi.fn(),
}));
const mockUseMediaQuery = useMediaQuery as unknown as ReturnType<typeof vi.fn>;

const mockFilm = {
  id: '123',
  title: 'Spirited Away',
  description: 'A magical journey',
  director: 'Hayao Miyazaki',
  release_date: '2001-07-20',
  running_time: '125',
  rt_score: '97',
  color: '#000',
  image: 'spirited-away.jpg',
};

describe('FilmCard', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockUseMediaQuery.mockReset();
  });

  it('renders film title and image', () => {
    mockUseMediaQuery.mockReturnValue(false); // Desktop device
    render(<FilmCard film={mockFilm} />);

    const images = screen.getAllByAltText(`${mockFilm.title} poster`);
    expect(images).toHaveLength(2);
  });

  it('flips on hover on desktop devices', () => {
    mockUseMediaQuery.mockReturnValue(false); // Desktop device
    render(<FilmCard film={mockFilm} />);

    const card = screen.getByTestId('flip-card');
    fireEvent.mouseEnter(card);

    // Check if back content is visible
    expect(screen.getByText(mockFilm.description)).toBeVisible();
    expect(screen.getByText(mockFilm.director)).toBeVisible();

    fireEvent.mouseLeave(card);
    // Back content should not be visible after mouse leave
    const cardInner = screen.getByTestId('flip-card-inner');
    expect(cardInner).toHaveStyle({ transform: 'rotateY(0deg)' });
  });

  it('flips on click and shows close button on touch devices', () => {
    mockUseMediaQuery.mockReturnValue(true); // Touch device
    render(<FilmCard film={mockFilm} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    // Check if back content and close button are visible
    expect(screen.getByText(mockFilm.description)).toBeVisible();
    const closeButton = screen.getByLabelText('close');
    expect(closeButton).toBeVisible();

    // Click close button should flip card back
    fireEvent.click(closeButton);
    const cardInner = screen.getByTestId('flip-card-inner');
    expect(cardInner).toHaveStyle({ transform: 'rotateY(0deg)' });
  });

  it('calls onClick handler when provided', () => {
    mockUseMediaQuery.mockReturnValue(false); // Desktop device
    const handleClick = vi.fn();
    render(<FilmCard film={mockFilm} onClick={handleClick} />);

    const card = screen.getByTestId('flip-card');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalled();
  });

  it('shows loading state when loading prop is true', () => {
    mockUseMediaQuery.mockReturnValue(false); // Desktop device
    render(<FilmCard film={mockFilm} loading={true} />);

    const card = screen.getByTestId('flip-card');
    expect(card).toHaveStyle({ opacity: 0.7 });
  });
});
