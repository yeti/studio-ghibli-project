import { render, screen } from '@testing-library/react';
import { FilmCard } from '~/shared/components/FilmCard';

const mockFilm = {
  id: '123',
  title: 'Spirited Away',
  description: 'A magical journey',
  director: 'Hayao Miyazaki',
  release_date: '2001',
  running_time: '125',
  rt_score: '97',
  color: '#FF6B35',
  image: 'spirited-away.jpg',
};

describe('Responsive Design Tests', () => {
  describe('FilmCard Component Responsive Design', () => {
    it('should render card with responsive dimensions', () => {
      render(<FilmCard film={mockFilm} />);

      const card = screen.getByTestId('flip-card');
      expect(card).toBeInTheDocument();

      // Check that the card has responsive styling
      expect(card).toHaveStyle({ width: '100%' });
    });

    it('should render responsive image with proper sizing', () => {
      render(<FilmCard film={mockFilm} />);

      const images = screen.getAllByAltText('Spirited Away poster');
      expect(images).toHaveLength(2); // Front and back images

      // Check that images have responsive styling
      images.forEach((image) => {
        expect(image).toHaveStyle({ width: '100%' });
      });
    });

    it('should render card content with proper structure', () => {
      render(<FilmCard film={mockFilm} />);

      // Check that the card renders without errors
      const card = screen.getByTestId('flip-card');
      expect(card).toBeInTheDocument();

      // Check that the card inner element exists
      const cardInner = screen.getByTestId('flip-card-inner');
      expect(cardInner).toBeInTheDocument();
    });

    it('should handle responsive text rendering', () => {
      render(<FilmCard film={mockFilm} />);

      // Check that the description is rendered
      expect(screen.getByText('A magical journey')).toBeInTheDocument();

      // Check that the director is rendered
      expect(screen.getByText('Hayao Miyazaki')).toBeInTheDocument();

      // Check that the runtime is rendered
      expect(screen.getByText('125 min')).toBeInTheDocument();
    });

    it('should render Rotten Tomatoes score with proper styling', () => {
      render(<FilmCard film={mockFilm} />);

      // Check that the score is rendered
      expect(screen.getByText('97%')).toBeInTheDocument();

      // Check that the Rotten Tomatoes image is rendered
      const rtImage = screen.getByAltText('Rotten Tomatoes');
      expect(rtImage).toBeInTheDocument();
    });
  });

  describe('Responsive Layout Tests', () => {
    it('should render with proper card structure', () => {
      render(<FilmCard film={mockFilm} />);

      const card = screen.getByTestId('flip-card');
      expect(card).toBeInTheDocument();

      // Check that the card has proper styling classes
      expect(card).toHaveClass('MuiCard-root');
    });

    it('should handle image loading gracefully', () => {
      render(<FilmCard film={mockFilm} />);

      const images = screen.getAllByAltText('Spirited Away poster');
      expect(images).toHaveLength(2);

      // Check that images have proper attributes
      images.forEach((image) => {
        expect(image).toHaveAttribute('src');
        expect(image).toHaveAttribute('alt');
      });
    });
  });
});
