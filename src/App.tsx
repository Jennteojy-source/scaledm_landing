import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdLanding from './AdLanding';
import AdLanding916 from './AdLanding916';
import Animation from './Animation';
import FeaturesPage from './FeaturesPage';
import InstagramPost from './InstagramPost';
import InstagramPost2 from './InstagramPost2';
import InstagramPost3 from './InstagramPost3';
import InstagramPost4 from './InstagramPost4';
import Instagram5 from './Instagram5';
import CarouselAds from './CarouselAds';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/" element={<AdLanding />} />
          <Route path="/916" element={<AdLanding916 />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/carousel-ads" element={<CarouselAds />} />
          <Route path="/ig-post" element={<InstagramPost />} />
          <Route path="/ig-post-2" element={<InstagramPost2 />} />
          <Route path="/ig-post-3" element={<InstagramPost3 />} />
          <Route path="/ig-post-4" element={<InstagramPost4 />} />
          <Route path="/ig-post-5" element={<Instagram5 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
