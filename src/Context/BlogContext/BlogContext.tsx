import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../UserContext/UserContext';

// Define Blog Post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image?: string;
}

// Blog Context
interface BlogContextType {
  posts: BlogPost[];
  categories: string[];
  filterByCategory: (category: string) => void;
  selectedCategory: string;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

// Blog Provider
export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Top Tech Trends in 2025',
      excerpt: 'Discover the latest innovations shaping the tech world.',
      content: 'Full content about tech trends...',
      category: 'Technology',
      date: '2025-05-01',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '2',
      title: 'Sustainable Fashion Tips',
      excerpt: 'Learn how to shop sustainably with these tips.',
      content: 'Full content about sustainable fashion...',
      category: 'Fashion',
      date: '2025-04-20',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '3',
      title: 'Smart Home Gadgets',
      excerpt: 'Explore the best gadgets for your home.',
      content: 'Full content about smart home gadgets...',
      category: 'Technology',
      date: '2025-04-15',
      image: 'https://via.placeholder.com/300',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...new Set(posts.map((post) => post.category))];

  // Filter posts based on user preferences if user is logged in
  useEffect(() => {
    if (user && user.preferredCategories.length > 0) {
      setSelectedCategory(user.preferredCategories[0]);
    }
  }, [user]);

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <BlogContext.Provider value={{ posts, categories, filterByCategory, selectedCategory }}>
      {children}
    </BlogContext.Provider>
  );
};
