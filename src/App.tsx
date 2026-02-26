/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ApiKeyModal } from './components/ApiKeyModal';
import { decryptData } from './lib/crypto';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Analyzer } from './components/Analyzer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'analyzer'>('home');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const encryptedKey = localStorage.getItem('yt_api_key');
    if (encryptedKey) {
      setApiKey(decryptData(encryptedKey));
    }
  }, []);

  const handleStart = () => {
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
    } else {
      setCurrentPage('analyzer');
    }
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (currentPage === 'home') {
      setCurrentPage('analyzer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header
        onOpenSettings={() => setIsApiKeyModalOpen(true)}
        onNavigateHome={() => setCurrentPage('home')}
      />

      {currentPage === 'home' ? (
        <Home onStart={handleStart} />
      ) : (
        <Analyzer apiKey={apiKey} onRequireApiKey={() => setIsApiKeyModalOpen(true)} />
      )}

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}
