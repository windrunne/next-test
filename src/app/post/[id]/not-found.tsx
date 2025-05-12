import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Post Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        The post you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
} 