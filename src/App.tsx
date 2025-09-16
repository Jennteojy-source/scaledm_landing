import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdLanding from './AdLanding';
import AdLanding916 from './AdLanding916';
import Animation from './Animation';
import FeaturesPage from './FeaturesPage';
import InstagramPost from './InstagramPost';
import InstagramPost2 from './InstagramPost2';

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
        <div style={{ width: 'min(100vw, 100vh)', height: 'min(100vw, 100vh)' }}>
          <Routes>
            <Route path="/" element={<AdLanding />} />
            <Route path="/916" element={<AdLanding916 />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/ig-post" element={<InstagramPost />} />
            <Route path="/ig-post-2" element={<InstagramPost2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
