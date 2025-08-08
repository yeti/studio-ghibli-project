# Product Requirements Document: Studio Ghibli Films Application

## Introduction/Overview

Create a responsive React application that displays Studio Ghibli film information using a GraphQL backend that integrates with the public Studio Ghibli API. The application will feature an interactive interface where users can click on film buttons to fetch and display detailed film information in an engaging card format.

## Goals

1. **Core Functionality**: Implement a fully functional film browsing application with GraphQL integration
2. **User Experience**: Create an intuitive, responsive interface that works seamlessly on desktop and mobile
3. **Technical Excellence**: Demonstrate clean code architecture with proper TypeScript typing and GraphQL integration
4. **Performance**: Ensure fast loading times and smooth interactions
5. **Mobile-First**: Optimize for mobile devices down to 320px width
6. **Testing**: Maintain code quality with comprehensive testing

## User Stories

1. **As a user**, I want to see four film buttons so that I can easily browse available Studio Ghibli films
2. **As a user**, I want to click on a film button so that I can view detailed information about that specific film
3. **As a user**, I want to see loading states so that I know the application is working when fetching data
4. **As a user**, I want to see film cards with images and titles so that I can quickly identify films
5. **As a user**, I want to interact with cards (hover on desktop, click on mobile) so that I can view additional film details
6. **As a user**, I want the application to work well on my mobile device so that I can browse films anywhere
7. **As a user**, I want to see all remaining films so that I can discover more Studio Ghibli content

## Functional Requirements

### Frontend Requirements

1. **Film Button Interface**: Display four buttons, each containing the name of one specified Studio Ghibli film
2. **Event-Driven Interaction**: Buttons must respond to click events and fetch specific film data
3. **Loading States**: Buttons must show loading state when clicked and data is being fetched
4. **GraphQL Integration**: Frontend must use GraphQL queries with properly typed hooks (useQuery, useLazyQuery)
5. **Code Generation**: Use GraphQL codegen to generate typed hooks and queries
6. **Card Display**: Replace clicked buttons with cards showing movie image and title
7. **Interactive Cards**: Cards must flip on hover (desktop) or click (mobile) to reveal:
   - Movie banner
   - Description
   - Director
   - Release date
   - Runtime
   - Rotten Tomatoes score
8. **Mobile Responsive**: Application must work well on mobile devices
   - Cards reorganize into single column layout on mobile
   - Application looks good and functions properly down to 320px width
   - Touch interactions work smoothly for card flipping on mobile
9. **Design Compliance**: Follow Zeplin designs for visual consistency

### Backend Requirements

10. **GraphQL Server**: Create resolvers that fetch data from the Studio Ghibli API
11. **GraphQL Schema**: Update the Schema (objectTypes) to properly type resolver data
12. **API Integration**: Connect to the public Studio Ghibli API to retrieve film information
13. **Error Handling**: Implement proper error handling for API failures

### Bonus Requirements

14. **"...rest" Button**: Add an additional button that hits a different GraphQL resolver to pull and display all remaining Studio Ghibli films using the same card interface

## Non-Goals (Out of Scope)

- User authentication or user management
- Film search or filtering functionality
- Film reviews or ratings system
- Offline functionality or caching
- Advanced animations beyond card flipping
- Custom film data management
- User preferences or favorites

## Design Considerations

- Follow Zeplin designs for visual consistency
- Implement smooth card flip animations
- Use responsive design principles
- Ensure accessibility standards are met
- Maintain consistent spacing and typography
- Use appropriate loading indicators

## Technical Considerations

- Use existing project structure with React, GraphQL, and TypeScript
- Implement GraphQL codegen for type safety
- Follow Apollo Client patterns for data fetching
- Ensure proper error boundaries and loading states
- Use existing styling system (styled-components or CSS modules)
- Maintain test coverage with Jest and React Testing Library
- Follow conventional commit format for git commits

## Success Metrics

1. **Functionality**: All core features work as specified
2. **Performance**: Application loads quickly and responds smoothly to user interactions
3. **Mobile Experience**: Application works flawlessly on mobile devices down to 320px
4. **Code Quality**: Clean, readable code with proper TypeScript typing
5. **Testing**: Comprehensive test coverage for all major components
6. **User Experience**: Intuitive interface with smooth animations and proper loading states

## Film Data

The four main films to implement:

| Film Title              | API ID                                 |
| ----------------------- | -------------------------------------- |
| Porco Rosso             | `ebbb6b7c-945c-41ee-a792-de0e43191bd8` |
| Kiki's Delivery Service | `ea660b10-85c4-4ae3-8a5f-41cea3648e3e` |
| Howl's Moving Castle    | `cd3d059c-09f4-4ff3-8d63-bc765a5184fa` |
| My Neighbor Totoro      | `58611129-2dbc-4a81-a72f-77ddfc1b1b49` |

## Open Questions

1. Should we implement error retry mechanisms for failed API calls?
2. Do we need to implement any specific accessibility features beyond basic ARIA labels?
3. Should we add any analytics tracking for user interactions?
4. Do we need to implement any specific browser compatibility requirements?
5. Should we add any specific SEO optimizations for the application?
