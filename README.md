# Studio Ghibli Films - Interactive React Application

> A responsive React + GraphQL application showcasing Studio Ghibli films with interactive flip cards, mobile support, and comprehensive error handling.

## 🚀 Project Overview

This project is a modern web application that displays Studio Ghibli films in an interactive card format. Users can:

- **Browse Featured Films**: View 4 initial film buttons that transform into interactive cards
- **Interactive Cards**: Hover on desktop or click on mobile to flip cards and see film details
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **View All Films**: Access the complete Studio Ghibli film catalog via a floating action button
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

### Key Features

- ✅ **3D Flip Animation**: Smooth card flip transitions
- ✅ **Mobile-First Design**: Touch interactions and responsive layouts
- ✅ **GraphQL Integration**: Type-safe API communication
- ✅ **Error Boundaries**: Graceful error handling throughout the app
- ✅ **Loading States**: Visual feedback during data fetching
- ✅ **Rotten Tomatoes Integration**: Film ratings with custom styling

## 📋 Setup Instructions

### Prerequisites

- **Node.js**: Version 20.11 or higher
- **npm**: Package manager (we used npm instead of pnpm)

### Installation & Setup

1. **Clone and navigate to the project**:

   ```bash
   git clone <repository-url>
   cd studio-ghibli-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   # Backend environment
   echo "LOG_LEVEL=info
   NODE_ENV=development
   PORT=4000
   GRAPHQL_PATH=/graphql" > packages/backend/.env

   # Frontend environment (for mobile testing)
   echo "VITE_GRAPHQL_URL=http://localhost:4000/graphql" > packages/frontend/.env
   ```

4. **Start the development servers**:

   **Backend (GraphQL Server)**:

   ```bash
   cd packages/backend
   npm run dev
   ```

   The GraphQL server will start on `http://localhost:4000`

   **Frontend (React App)**:

   ```bash
   cd packages/frontend
   npm run dev
   ```

   The React app will start on `http://localhost:3000`

   **For mobile testing**:

   ```bash
   cd packages/frontend
   npm run dev:host
   ```

   This exposes the frontend to your local network for mobile device testing.

## 🏗️ Project Structure

```
studio-ghibli-project/
├── packages/
│   ├── backend/                 # GraphQL server
│   │   ├── src/
│   │   │   ├── schemaModules/   # GraphQL schema definitions
│   │   │   ├── services/        # External API integration
│   │   │   └── server.ts        # Express + Apollo Server setup
│   │   └── .env                 # Backend environment variables
│   └── frontend/                # React application
│       ├── src/
│       │   ├── modules/home/    # Main Home component
│       │   ├── shared/components/ # Reusable components
│       │   ├── graphql/         # GraphQL queries and types
│       │   └── tests/           # Test files
│       └── .env                 # Frontend environment variables
└── tasks/                       # Development task tracking
    └── tasks-prd-studio-ghibli.md
```

## 🧪 Testing

### Run All Tests

```bash
# Frontend tests
cd packages/frontend
npm test

# Backend tests
cd packages/backend
npm test
```

### Test Coverage

- ✅ **50 Frontend Tests**: Component, integration, and error handling tests
- ✅ **9 Backend Tests**: Service and GraphQL query tests
- ✅ **Error Handling**: Comprehensive error boundary and GraphQL error tests
- ✅ **Responsive Design**: Mobile and desktop interaction tests

## 📝 Dev-Tasks Process

This project follows a structured development workflow documented in `tasks/tasks-prd-studio-ghibli.md`:

### Completed Tasks

1. **✅ Core Setup**: Project initialization and basic structure
2. **✅ GraphQL Backend**: Apollo Server with Studio Ghibli API integration
3. **✅ React Frontend**: Basic component structure and routing
4. **✅ Interactive Film Cards**: 3D flip animation with responsive design
5. **✅ Testing & Error Handling**: Comprehensive test suite and error boundaries

### Development Workflow

- **Task Tracking**: Each feature is broken down into specific tasks
- **Testing**: Tests run after each major feature completion
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Mobile Testing**: Real device testing with network exposure

## ⏱️ Time Spent

**Total Development Time**: ~4 hours

### Breakdown:

- **Setup & Architecture**: 30 minutes
- **GraphQL Backend**: 45 minutes
- **React Frontend**: 1 hour
- **Interactive Cards**: 1.5 hours
- **Mobile Responsiveness**: 30 minutes
- **Error Handling**: 30 minutes
- **Testing**: 45 minutes

## 🎯 Technology Choices & Rationale

### **Frontend Stack**

- **React 18**: Modern component-based architecture
- **TypeScript**: Type safety and better developer experience
- **Material-UI (MUI)**: Consistent design system and responsive components
- **Apollo Client**: Type-safe GraphQL client with caching
- **Vite**: Fast development server and build tool

### **Backend Stack**

- **Node.js + Express**: Lightweight, fast server
- **Apollo Server**: GraphQL server with excellent TypeScript support
- **Nexus**: Schema-first GraphQL development
- **Axios**: Reliable HTTP client for external API calls

### **Architecture Decisions**

- **Monorepo Structure**: Shared dependencies and easier development
- **GraphQL**: Type-safe API with flexible querying
- **Error Boundaries**: Graceful error handling at component level
- **Responsive Design**: Mobile-first approach with touch interactions

## 🚧 Challenges Encountered

### **1. Mobile Testing Setup**

- **Challenge**: Testing on physical mobile devices required network exposure
- **Solution**: Used `--host` flag and local IP configuration

### **2. GraphQL Type Generation**

- **Challenge**: Ensuring type safety between frontend and backend
- **Solution**: Implemented proper GraphQL code generation workflow

### **3. Touch vs Hover Interactions**

- **Challenge**: Different interaction patterns for mobile vs desktop
- **Solution**: Used `useMediaQuery` for accurate device detection

### **4. Image Loading Errors**

- **Challenge**: External API images sometimes fail to load
- **Solution**: Implemented graceful fallbacks and error logging

### **5. Test Reliability**

- **Challenge**: Console.log expectations in tests became outdated
- **Solution**: Updated tests to check for actual UI elements instead

## ⚠️ Known Limitations

### **Current Limitations**

- **External API Dependency**: Relies on Studio Ghibli API availability
- **Image Loading**: Some film images may fail to load from external API
- **No Caching**: No persistent caching of film data
- **No Authentication**: No user accounts or personalization features

### **Browser Compatibility**

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Not Supported**: Internet Explorer, older mobile browsers

## 🔮 Future Improvements

### **Short Term (1-2 weeks)**

- **Caching Layer**: Implement Redis or in-memory caching for film data
- **Image Optimization**: Add image compression and lazy loading
- **Search Functionality**: Add film search and filtering
- **Favorites System**: Allow users to save favorite films

### **Medium Term (1-2 months)**

- **User Accounts**: Authentication and personalized experiences
- **Offline Support**: Service worker for offline film browsing
- **Advanced Animations**: More sophisticated card animations
- **Internationalization**: Multi-language support

### **Long Term (3+ months)**

- **PWA Features**: Installable app with push notifications
- **Social Features**: Share films and user reviews
- **Advanced Analytics**: User behavior tracking and insights
- **API Rate Limiting**: Implement proper rate limiting and monitoring

## 🛠️ Available Scripts

### Backend (`packages/backend/`)

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm test             # Run test suite
```

### Frontend (`packages/frontend/`)

```bash
npm run dev          # Start development server
npm run dev:host     # Start with network exposure (mobile testing)
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run test suite
```

## 📞 Support

For questions or issues:

1. Check the test suite for expected behavior
2. Review the error handling components
3. Verify environment variables are set correctly
4. Ensure both backend and frontend servers are running

---

**Built with ❤️ using React, GraphQL, and TypeScript**
