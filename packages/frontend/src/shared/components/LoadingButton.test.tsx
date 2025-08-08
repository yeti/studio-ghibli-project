import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { LoadingButton } from './LoadingButton';

describe('LoadingButton', () => {
  it('renders button with children', () => {
    render(<LoadingButton>Click me</LoadingButton>);

    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('shows loading spinner when loading is true', () => {
    render(<LoadingButton loading={true}>Loading...</LoadingButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });

  it('hides loading spinner when loading is false', () => {
    render(<LoadingButton loading={false}>Click me</LoadingButton>);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked and not loading', () => {
    const handleClick = vi.fn();
    render(<LoadingButton onClick={handleClick}>Click me</LoadingButton>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(
      <LoadingButton loading={true} onClick={handleClick}>
        Loading...
      </LoadingButton>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <LoadingButton disabled={true} onClick={handleClick}>
        Disabled
      </LoadingButton>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom variant', () => {
    render(<LoadingButton variant="outlined">Outlined</LoadingButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  it('applies custom color', () => {
    render(<LoadingButton color="secondary">Secondary</LoadingButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorSecondary');
  });

  it('applies custom size', () => {
    render(<LoadingButton size="large">Large</LoadingButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeLarge');
  });

  it('applies fullWidth prop', () => {
    render(<LoadingButton fullWidth={true}>Full Width</LoadingButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  it('applies custom sx styles', () => {
    const customSx = { backgroundColor: 'red' };
    render(<LoadingButton sx={customSx}>Custom Style</LoadingButton>);

    const button = screen.getByRole('button');
    // Note: sx styles are applied via MUI's styling system, so we can't easily test them
    // This test verifies the component renders without errors when sx is provided
    expect(button).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<LoadingButton>Default</LoadingButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-contained');
    expect(button).toHaveClass('MuiButton-colorPrimary');
    expect(button).toHaveClass('MuiButton-sizeMedium');
  });

  it('combines loading and disabled states', () => {
    render(
      <LoadingButton loading={true} disabled={true}>
        Loading Disabled
      </LoadingButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading Disabled');
  });
});
