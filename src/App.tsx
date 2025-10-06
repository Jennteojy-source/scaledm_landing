import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import CarouselAdsV2 from './CarouselAdsV2';
import ScaleDMAutomation from './ScaleDMAutomation';
import ManyChatComparison from './ManyChatComparison';
import ManyChatComparisonV2 from './ManyChatComparisonV2';

const NavigationHeader: React.FC = () => {
  const location = useLocation();
  
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/916', label: '916' },
    { path: '/animation', label: 'Anim' },
    { path: '/features', label: 'Features' },
    { path: '/carousel-ads', label: 'Carousel' },
    { path: '/carousel-ads-v2', label: 'CarouselV2' },
    { path: '/ig-post', label: 'IG1' },
    { path: '/ig-post-2', label: 'IG2' },
    { path: '/ig-post-3', label: 'IG3' },
    { path: '/ig-post-4', label: 'IG4' },
    { path: '/ig-post-5', label: 'IG5' },
    { path: '/scaledm-automation', label: 'Auto' },
    { path: '/manychat-comparison', label: 'ManyChat' },
    { path: '/manychat-comparison-v2', label: 'ManyChatV2' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '8px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      justifyContent: 'center',
      fontSize: '12px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: location.pathname === route.path ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '11px',
            fontWeight: '500'
          }}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <NavigationHeader />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        paddingTop: '50px'
      }}>
        <Routes>
          <Route path="/" element={<AdLanding />} />
          <Route path="/916" element={<AdLanding916 />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/carousel-ads" element={<CarouselAds />} />
          <Route path="/carousel-ads-v2" element={<CarouselAdsV2 />} />
          <Route path="/ig-post" element={<InstagramPost />} />
          <Route path="/ig-post-2" element={<InstagramPost2 />} />
          <Route path="/ig-post-3" element={<InstagramPost3 />} />
          <Route path="/ig-post-4" element={<InstagramPost4 />} />
          <Route path="/ig-post-5" element={<Instagram5 />} />
          <Route path="/scaledm-automation" element={<ScaleDMAutomation />} />
          <Route path="/manychat-comparison" element={<ManyChatComparison />} />
          <Route path="/manychat-comparison-v2" element={<ManyChatComparisonV2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
