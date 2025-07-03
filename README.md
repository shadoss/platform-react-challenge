# Cat Lovers App

A modern React application for cat enthusiasts, built with React, TypeScript, and Tailwind CSS. The app integrates with TheCatAPI to provide a delightful experience for exploring and saving your favorite cat images.

## Features

The application consists of three main views:

1. **Random Cats**: Displays a grid of random cat images with a "Load More" button. Clicking on any image opens a modal with detailed information and options to mark as favorite.

2. **Breeds**: Shows a list of cat breeds. Clicking on a breed opens a modal with details about that breed and related images.

3. **Favorites**: Displays all the cat images you've marked as favorites, with the option to remove them from your collection.

## UI Design

The UI is designed following the Tailwind UI blocks style, featuring:

- Clean, modern interface with consistent spacing and typography
- Responsive design that works well on mobile, tablet, and desktop
- Interactive components with hover and focus states
- Accessible UI elements with proper ARIA attributes

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Query**: For data fetching, caching, and state management
- **React Router**: For handling navigation and routing
- **Headless UI**: For accessible UI components
- **Heroicons**: For beautiful, consistent icons
- **Zustand**: For local state management
- **Axios**: For API requests

## SEO Optimization

The application is optimized for search engines with:

- Semantic HTML structure
- Meta tags for each page
- JSON-LD structured data following schema.org standards
- Canonical URLs
- Open Graph meta tags for social sharing

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
src/
├── api/            # API services and client configuration
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── store/          # Zustand store definitions
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Component Library

The application includes a comprehensive set of reusable UI components:

- **Button**: Versatile button component with various styles, sizes, and states
- **Card**: Flexible card component for displaying content in a structured format
- **Modal**: Accessible modal dialog for displaying detailed information
- **Loading**: Various loading indicators for different contexts
- **Error**: Error message components for different scenarios

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

### Environment Variables

This project uses environment variables to store sensitive information like API keys. To set up the environment variables:

1. Copy the `.env.example` file to a new file named `.env`
2. Replace the placeholder values with your actual API keys

```
VITE_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.thecatapi.com/v1
```

You can obtain an API key from [TheCatAPI](https://developers.thecatapi.com/).

### Running the Application

To start the development server:

```
npm run dev
```

or

```
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To build the application for production:

```
npm run build
```

or

```
yarn build
```

This will create a `dist` directory with optimized production build.

To preview the production build locally:

```
npm run preview
```

or

```
yarn preview
```


