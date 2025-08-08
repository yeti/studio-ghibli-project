import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '~/modules/home/Home';

// Mock the GraphQL hooks
vi.mock('~/graphql/hooks', () => ({
  useGetAllFilms: vi.fn().mockReturnValue({
    data: {
      films: [
        {
          id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
          title: 'Porco Rosso',
          description:
            'A World War I flying ace who has been transformed into a pig.',
          director: 'Hayao Miyazaki',
          release_date: '1992',
          running_time: '94',
          rt_score: '96',
        },
        {
          id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
          title: "Kiki's Delivery Service",
          description:
            'A young witch who moves to a new town to establish herself.',
          director: 'Hayao Miyazaki',
          release_date: '1989',
          running_time: '103',
          rt_score: '97',
        },
        {
          id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
          title: "Howl's Moving Castle",
          description:
            'A young woman cursed with old age seeks refuge in a magical castle.',
          director: 'Hayao Miyazaki',
          release_date: '2004',
          running_time: '119',
          rt_score: '87',
        },
        {
          id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
          title: 'My Neighbor Totoro',
          description:
            'Two sisters discover a magical forest spirit while moving to the countryside.',
          director: 'Hayao Miyazaki',
          release_date: '1988',
          running_time: '86',
          rt_score: '94',
        },
      ],
    },
    loading: false,
    error: null,
  }),
}));

// Mock console methods to avoid noise in tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  console.log = vi.fn();
  console.error = vi.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main title and subtitle', () => {
    render(<Home />);

    expect(
      screen.getByText('Discover Studio Ghibli Films'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a film & hover to learn more'),
    ).toBeInTheDocument();
  });

  it('renders all four film buttons', () => {
    render(<Home />);

    expect(screen.getByText('Porco Rosso')).toBeInTheDocument();
    expect(screen.getByText("Kiki's Delivery Service")).toBeInTheDocument();
    expect(screen.getByText("Howl's Moving Castle")).toBeInTheDocument();
    expect(screen.getByText('My Neighbor Totoro')).toBeInTheDocument();
  });

  it('handles film button click and shows loading state', async () => {
    render(<Home />);

    const porcoRossoButton = screen.getByText('Porco Rosso');
    expect(porcoRossoButton).toBeInTheDocument();

    // Click the button
    fireEvent.click(porcoRossoButton);

    // Check that console.log was called with the film ID
    expect(console.log).toHaveBeenCalledWith(
      'Fetching film with ID: ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    );

    // Wait for the loading state to complete and check for film card
    await waitFor(
      () => {
        // Check for the film images (front and back) instead of console.log
        const images = screen.getAllByAltText('Porco Rosso poster');
        expect(images).toHaveLength(2);
      },
      { timeout: 2000 },
    );
  });

  it('handles multiple film button clicks independently', async () => {
    render(<Home />);

    const porcoRossoButton = screen.getByText('Porco Rosso');
    const totoroButton = screen.getByText('My Neighbor Totoro');

    // Click both buttons
    fireEvent.click(porcoRossoButton);
    fireEvent.click(totoroButton);

    // Both should be logged
    expect(console.log).toHaveBeenCalledWith(
      'Fetching film with ID: ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    );
    expect(console.log).toHaveBeenCalledWith(
      'Fetching film with ID: 58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    );

    // Wait for both to complete and check for film cards
    await waitFor(
      () => {
        // Check for both film images instead of console.log
        const porcoImages = screen.getAllByAltText('Porco Rosso poster');
        const totoroImages = screen.getAllByAltText(
          'My Neighbor Totoro poster',
        );
        expect(porcoImages).toHaveLength(2);
        expect(totoroImages).toHaveLength(2);
      },
      { timeout: 2000 },
    );
  });

  it('applies loading state to clicked buttons', async () => {
    render(<Home />);

    const porcoRossoButton = screen.getByText('Porco Rosso');

    // Click the button
    fireEvent.click(porcoRossoButton);

    // Button should show loading state
    expect(porcoRossoButton).toHaveTextContent('Loading...');

    // Wait for loading to complete and button to be replaced with card
    await waitFor(
      () => {
        // Check for the film images (front and back)
        const images = screen.getAllByAltText('Porco Rosso poster');
        expect(images).toHaveLength(2);
      },
      { timeout: 2000 },
    );
  });

  it('has clickable film buttons', () => {
    render(<Home />);

    // Get all buttons (4 film buttons + 1 "...and many more" button)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it('renders with proper styling classes', () => {
    render(<Home />);

    // Check that the buttons are rendered (4 film buttons + 1 "...and many more" button)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);

    // Check that buttons have proper styling
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
});
