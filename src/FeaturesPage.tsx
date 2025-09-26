import React from 'react';
import { motion } from 'framer-motion';

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30 blur-sm"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-300 rounded-full opacity-40 blur-sm"></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-orange-200 rounded-full opacity-50 blur-sm"></div>
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-orange-400 rounded-full opacity-60 blur-sm"></div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-orange-300 rounded-full opacity-70 blur-sm"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              User Interaction Flow
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how customers interact with your Instagram posts and convert to sales
            </p>
          </motion.div>

          {/* Main Flow Container */}
          <div className="relative">
            {/* Left Panel - Social Media Post */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-md mx-auto"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Post Header */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  W
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">watch_shop</div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                  </svg>
                </div>
              </div>

              {/* Ad Content */}
              <div className="relative bg-white border-2 border-gray-200 rounded-xl p-4 mb-4">
                {/* Brick wall background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl opacity-50"></div>
                
                {/* Ad Text */}
                <div className="relative z-10">
                  <div className="text-orange-600 font-bold text-lg mb-2" style={{ fontFamily: 'cursive' }}>
                    Only This Week!
                  </div>
                  <div className="text-2xl font-black text-gray-800 mb-2">
                    Black Friday
                  </div>
                  <div className="bg-red-600 text-white text-center py-1 px-3 rounded text-sm font-bold mb-4">
                    MEGA SALE
                  </div>
                  
                  {/* Watch Image Placeholder */}
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Button */}
                  <div className="bg-red-600 text-white text-center py-2 px-4 rounded-lg font-bold mb-2">
                    ORDER NOW
                  </div>
                  
                  {/* Contact Info */}
                  <div className="text-sm text-gray-600 mb-2">323-517-4946</div>
                  <div className="text-sm text-gray-600">www.yourwebsite.com</div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    50% OFF
                  </div>
                </div>
              </div>

              {/* Social Media Actions */}
              <div className="flex items-center space-x-6 mb-3">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </div>

              {/* Call to Action */}
              <div className="text-sm text-gray-600">
                Comment "Order" to buy the watch !!!
              </div>
            </motion.div>

            {/* Arrow 1 - From post to comment */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <svg className="w-8 h-8 text-orange-500 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeDasharray="5,5"/>
                </svg>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Bottom Panel - Comment Reply */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-4 mb-8 max-w-md mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
                  J
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm">johnsie_jock_01</div>
                </div>
                <div className="text-xs text-gray-400 mr-2">3d</div>
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              
              <div className="text-gray-800 font-medium mb-2">Order</div>
              <div className="text-xs text-gray-500">Just Now Reply</div>
            </motion.div>

            {/* Arrow 2 - From comment to product page */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <svg className="w-8 h-8 text-orange-500 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" strokeDasharray="5,5"/>
                </svg>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Right Panel - Product Page/DM */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              {/* Header with back button */}
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
                  J
                </div>
                <div className="font-semibold text-gray-800">johnsie_jock_01</div>
              </div>

              {/* Product Content */}
              <div className="relative bg-white border-2 border-gray-200 rounded-xl p-4 mb-4">
                {/* Brick wall background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl opacity-50"></div>
                
                {/* Ad Text */}
                <div className="relative z-10">
                  <div className="text-orange-600 font-bold text-lg mb-2" style={{ fontFamily: 'cursive' }}>
                    Only This Week!
                  </div>
                  <div className="text-2xl font-black text-gray-800 mb-2">
                    Black Friday
                  </div>
                  <div className="bg-red-600 text-white text-center py-1 px-3 rounded text-sm font-bold mb-4">
                    MEGA SALE
                  </div>
                  
                  {/* Watch Image Placeholder */}
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="text-sm text-gray-600 mb-4">333-377-494</div>
                  
                  {/* Product Description Lines */}
                  <div className="space-y-2 mb-4">
                    <div className="h-2 bg-gray-300 rounded"></div>
                    <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  
                  {/* Buy Now Button */}
                  <div className="bg-white border-2 border-gray-800 text-gray-800 text-center py-3 px-6 rounded-lg font-bold mb-4">
                    Buy Now!
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    50% OFF
                  </div>
                  
                  {/* Logo */}
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    W
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
