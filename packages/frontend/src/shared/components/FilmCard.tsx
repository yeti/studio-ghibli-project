import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';

interface FilmCardProps {
  film: {
    id: string;
    title: string;
    description: string;
    director: string;
    release_date: string;
    running_time: string;
    rt_score: string;
    color: string;
    image?: string;
  };
  onClick?: () => void;
  loading?: boolean;
}

const FlipCard = styled(Card)({
  position: 'relative',
  width: '100%',
  height: '300px',
  cursor: 'pointer',
  perspective: '1000px',
  borderRadius: '16px',
  border: '2px solid white',
  background: 'transparent',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)',
  },
  // Responsive height for single column layouts
  '@media (max-width: 600px)': {
    height: '450px', // Taller on mobile (single column)
  },
  '@media (min-width: 601px) and (max-width: 960px)': {
    height: '350px', // Medium height on tablet
  },
  '@media (min-width: 961px)': {
    height: '300px', // Standard height on desktop (multi-column)
  },
});

const FlipCardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>(({ isFlipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const CardSide = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
});

const CardFront = styled(CardSide)<{ color: string }>(({ color }) => ({
  background: 'transparent',
  color: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
  overflow: 'hidden',
  backfaceVisibility: 'hidden',
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: '#666',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '4px',
  zIndex: 2,
  '&:hover': {
    background: 'rgba(255, 255, 255, 1)',
  },
});

const CardBack = styled(CardSide)({
  background: 'white',
  color: '#333',
  transform: 'rotateY(180deg)',
  padding: '0',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: '16px',
  border: '2px solid white',
  overflowY: 'auto',
  overflowX: 'hidden',
  backfaceVisibility: 'hidden',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '3px',
    '&:hover': {
      background: '#a8a8a8',
    },
  },
});

const FilmTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.1rem',
  textAlign: 'center',
  marginBottom: '16px',
  color: 'white',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  lineHeight: 1.2,
});

const FilmImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 30%',
  '@media (min-width: 960px)': {
    objectPosition: 'center',
  },
  borderRadius: '16px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
  border: '2px solid white',
});

const BackTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: '12px',
  color: '#333',
});

const BackText = styled(Typography)({
  lineHeight: 1.4,
  marginBottom: '8px',
  color: '#666',
});

const DetailRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.9rem',
  gap: '8px',
});

const DetailLabel = styled('span')({
  fontWeight: 400,
  color: '#666',
  fontSize: '0.85rem',
});

const DetailValue = styled('span')({
  fontWeight: 600,
  color: '#333',
  fontSize: '0.85rem',
});

const RatingChip = styled(Chip)({
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '0.8rem',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
});

const ArrowButton = styled(Box)({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&::after': {
    content: '""',
    width: '0',
    height: '0',
    borderLeft: '6px solid #333',
    borderTop: '4px solid transparent',
    borderBottom: '4px solid transparent',
  },
});

// Helper function to format release date
const formatReleaseDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

export const FilmCard: React.FC<FilmCardProps> = ({
  film,
  onClick,
  loading = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');

  // Simple mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent,
        );
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();
  }, []);

  const handleMouseEnter = () => {
    // Only hover on desktop (not mobile or touch devices)
    if (!isTouchDevice && !isMobile) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    // Only hover on desktop (not mobile or touch devices)
    if (!isTouchDevice && !isMobile) {
      setIsFlipped(false);
    }
  };

  const handleClick = () => {
    // For mobile/touch devices, always allow flipping
    if (isTouchDevice || isMobile) {
      setIsFlipped(!isFlipped);
    }

    // Always call onClick for film fetching
    if (onClick) {
      onClick();
    }
  };

  return (
    <FlipCard
      data-testid="flip-card"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        opacity: loading ? 0.7 : 1,
      }}
    >
      <FlipCardInner data-testid="flip-card-inner" isFlipped={isFlipped}>
        {/* Front of card */}
        <CardFront color={film.color}>
          {film.image && (
            <FilmImage
              src={film.image}
              alt={`${film.title} poster`}
              onError={(e) => {
                console.warn(`Failed to load image for ${film.title}:`, e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log(`Successfully loaded image for ${film.title}`);
              }}
            />
          )}
        </CardFront>

        {/* Back of card */}
        <CardBack>
          {(isTouchDevice || isMobile) && (
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              size="small"
              aria-label="close"
            >
              ✕
            </CloseButton>
          )}
          <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* Top Quarter - Movie Image */}
            <Box
              sx={{
                position: 'relative',
                height: '40%',
                overflow: 'hidden',
                borderRadius: '16px 16px 0 0',
                flexShrink: 0,
              }}
            >
              {film.image && (
                <Box
                  component="img"
                  src={film.image}
                  alt={`${film.title} poster`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                  onError={(e) => {
                    console.warn(
                      `Failed to load back image for ${film.title}:`,
                      e,
                    );
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </Box>

            {/* Bottom Two-Thirds - Scrollable Content */}
            <Box
              sx={{
                flex: 1,
                padding: { xs: '16px', sm: '20px' },
                overflowY: 'auto',
                overflowX: 'hidden',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c1c1c1',
                  borderRadius: '3px',
                  '&:hover': {
                    background: '#a8a8a8',
                  },
                },
              }}
            >
              <BackText
                variant="body2"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  color: '#666',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                {film.description}
              </BackText>

              <DetailRow sx={{ mb: 1.5 }}>
                <DetailLabel>Runtime:</DetailLabel>
                <DetailValue>{film.running_time} min</DetailValue>
              </DetailRow>

              <DetailRow sx={{ mb: 1.5 }}>
                <DetailLabel>Director:</DetailLabel>
                <DetailValue>{film.director}</DetailValue>
              </DetailRow>

              <DetailRow sx={{ mb: 3 }}>
                <DetailLabel>Released:</DetailLabel>
                <DetailValue>
                  {formatReleaseDate(film.release_date)}
                </DetailValue>
              </DetailRow>

              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}
              >
                <Box
                  component="img"
                  src="/assets/rotten_tomato.png"
                  alt="Rotten Tomatoes"
                  sx={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    color: '#2E7D32',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    lineHeight: 1,
                  }}
                >
                  {film.rt_score}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardBack>
      </FlipCardInner>
    </FlipCard>
  );
};
