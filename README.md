# Next.js Posts Application

A modern, responsive web application built with Next.js that fetches and displays posts from the JSONPlaceholder API. This application demonstrates best practices for building web applications with Next.js, React, and TypeScript.

![Next.js Posts App](/screenshot.png)

## Features

- **Server and Client Components**: Utilizes Next.js 15's architecture for optimal performance
- **Responsive Design**: Clean UI that works well on all device sizes
- **Search Functionality**: Search posts by title or content with debounced input
- **Pagination**: Navigate through posts with a clean pagination interface
- **Sorting**: Sort posts by title in ascending or descending order
- **Author Filtering**: View posts by a specific author
- **Dark Mode Support**: Automatically adapts to user's system preference
- **Skeleton Loaders**: Smooth loading states with skeleton placeholders
- **Performance Optimized**: Uses React hooks like useMemo and useCallback

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern React patterns
- **JSONPlaceholder API**: Demo REST API for posts and users

## Project Structure

The project follows a modular architecture:

```
src/
├── app/               # Next.js App Router
├── components/        # Reusable UI components
├── constants/         # Application constants
├── hooks/             # Custom React hooks
├── services/          # API services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/next-posts-app.git
   cd next-posts-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Home Page**: View all posts with pagination
- **Search**: Type in the search box to filter posts by title or content
- **Sorting**: Click the "Sort By Name" button to toggle sorting order
- **Author Filter**: Click "More from this author" on any post to view posts by that author
- **Post Details**: Click on a post title to view full post details

## Performance Optimizations

- **Debounced Search**: Prevents excessive API calls while typing
- **Memoization**: Optimizes component rendering with useMemo and useCallback
- **Skeleton Loaders**: Improves perceived performance during loading
- **Dynamic Imports**: Code-splitting for improved load times

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the free API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling utilities
