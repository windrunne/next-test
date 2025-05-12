'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { logSearch } from '@/app/actions';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_DELAY);
  const isInitialMount = useRef(true);

  const currentParams = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  const updateUrl = useCallback((newSearchTerm: string) => {
    const params = new URLSearchParams(currentParams);
    
    if (newSearchTerm) {
      params.set('q', newSearchTerm);
    } else {
      params.delete('q');
    }
    
    const currentQ = currentParams.get('q') || '';
    if (currentQ !== newSearchTerm) {
      params.set('page', '1');
    }
    
    router.push(`/?${params.toString()}`);
  }, [currentParams, router]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    updateUrl(debouncedSearchTerm);
  }, [debouncedSearchTerm, updateUrl]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('q')?.toString() || '';
    
    await logSearch(formData);
    
    const params = new URLSearchParams(searchParams.toString());
    
    const currentQ = params.get('q') || '';
    const hasSearchChanged = currentQ !== searchTerm;
    
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    
    if (hasSearchChanged) {
      params.set('page', '1');
    }
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <input
          type="text"
          name="q"
          placeholder="Search posts by title or content..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full py-2 px-4 focus:outline-none dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
} 