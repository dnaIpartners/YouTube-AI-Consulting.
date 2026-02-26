import React, { useState, useEffect } from 'react';
import { encryptData, decryptData } from '../lib/crypto';
import { testApiKey } from '../lib/youtube';
import { X, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onSave }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const encryptedKey = localStorage.getItem('yt_api_key');
      if (encryptedKey) {
        setApiKey(decryptData(encryptedKey));
      }
      setStatus('idle');
      setMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestAndSave = async () => {
    if (!apiKey.trim()) {
      setStatus('error');
      setMessage('API 키를 입력해주세요.');
      return;
    }

    setStatus('testing');
    setMessage('연결 테스트 중...');

    try {
      await testApiKey(apiKey.trim());
      setStatus('success');
      setMessage('연결 성공! 안전하게 저장되었습니다.');
      
      const encrypted = encryptData(apiKey.trim());
      localStorage.setItem('yt_api_key', encrypted);
      onSave(apiKey.trim());
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'API 키 테스트에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-indigo-600" />
            YouTube API 키 설정
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              YouTube Data API v3 Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
            />
            <p className="mt-2 text-xs text-gray-500">
              입력하신 키는 암호화되어 브라우저 로컬 스토리지에만 저장됩니다.
            </p>
          </div>

          {status !== 'idle' && (
            <div className={cn(
              "p-3 rounded-lg flex items-start gap-2 text-sm",
              status === 'testing' && "bg-blue-50 text-blue-700",
              status === 'success' && "bg-green-50 text-green-700",
              status === 'error' && "bg-red-50 text-red-700"
            )}>
              {status === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <span>{message}</span>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleTestAndSave}
              disabled={status === 'testing'}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'testing' ? '테스트 중...' : '테스트 및 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
