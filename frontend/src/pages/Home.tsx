import React, { useState, useEffect } from 'react';

import Navigation from '../components/Navigation';
import HeroBanner from '../components/HeroBanner';
import TilesPreview from '../components/TilesPreview';
import AdCarousel from '../components/AdCarousel';
import AdDetailModal from '../components/AdDetailModal';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [relatedAds, setRelatedAds] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('recommended');

  /* Track mouse for background glow */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* Sample ads */
  const allAds = [
    {
      id: 101,
      title: 'Nike: Just Do It Campaign',
      type: 'PROMOTED',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
      rating: '4.9',
      votes: '256K',
      tags: ['Athletic', 'Motivational'],
      genre: 'Sports',
    },
    {
      id: 201,
      title: "McDonald's: I'm Lovin' It",
      type: 'PROMOTED',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=500&fit=crop',
      rating: '4.6',
      votes: '298K',
      tags: ['Fast Food', 'Family'],
      genre: 'Food',
    },
    {
      id: 301,
      title: 'Zara: Fast Fashion Leader',
      type: 'PROMOTED',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
      rating: '4.7',
      votes: '289K',
      tags: ['Trendy', 'Affordable'],
      genre: 'Fashion',
    },
  ];

  const handleCardClick = (ad: any) => {
    setSelectedAd(ad);

    const filtered = allAds
      .filter(item => item.genre === ad.genre && item.id !== ad.id)
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 3);

    setRelatedAds(filtered);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Subtle Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute h-72 w-72 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-3xl"
          style={{
            left: `${(mousePosition.x / window.innerWidth) * 100}%`,
            top: `${(mousePosition.y / window.innerHeight) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Hero */}
      

      {/* Animated Tiles Section */}
      <TilesPreview />

      {/* Category Filters */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Browse by Category</h3>

        <div className="flex flex-wrap gap-4">
          {[
            { key: 'sports', label: '🏈 Sports', gradient: 'from-blue-500 to-cyan-500' },
            { key: 'food', label: '🍔 Food', gradient: 'from-orange-500 to-red-500' },
            { key: 'fashion', label: '👗 Fashion', gradient: 'from-pink-500 to-rose-500' },
            { key: 'recommended', label: '💫 Recommended', gradient: 'from-purple-500 to-indigo-500' },
          ].map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === cat.key
                  ? `bg-gradient-to-r ${cat.gradient} shadow-lg`
                  : 'bg-gray-900 hover:bg-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Category Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            {selectedCategory === 'sports' && '🏈 Sports Campaigns'}
            {selectedCategory === 'food' && '🍔 Food Campaigns'}
            {selectedCategory === 'fashion' && '👗 Fashion Campaigns'}
            {selectedCategory === 'recommended' && '💫 Recommended Campaigns'}
          </h2>

          <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold">
            See All →
          </button>
        </div>

        <AdCarousel
          category={selectedCategory as any}
          onCardClick={handleCardClick}
        />
      </section>

      {/* Trending */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <button className="text-purple-400 hover:text-purple-300 font-semibold">
            See All →
          </button>
        </div>

        <AdCarousel category="trending" onCardClick={handleCardClick} />
      </section>

      {/* Top Performers */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Top Performers</h2>
          <button className="text-purple-400 hover:text-purple-300 font-semibold">
            See All →
          </button>
        </div>

        <AdCarousel category="top" onCardClick={handleCardClick} />
      </section>

      {/* Modal */}
      {selectedAd && (
        <AdDetailModal
          ad={selectedAd}
          relatedAds={relatedAds}
          onClose={handleCloseModal}
        />
      )}

      <Footer />
    </div>
  );
};

export default Home;
