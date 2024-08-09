import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import LanguageSwitcher from '@/components/language-switcher';
import { useRouter } from 'next/router';
import nextI18NextConfig from '../../next-i18next.config';
import Meteors from '@/components/magicui/meteors';

export default function Home() {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<{ breakfast: string; lunch: string; dinner: string }>({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude},${longitude}`);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    // Clear recommendations when the locale changes
    setRecommendation({
      breakfast: '',
      lunch: '',
      dinner: ''
    });
  }, [locale]);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location, language: locale }),
    });
    const data = await response.json();
    setRecommendation({
      breakfast: data.breakfast,
      lunch: data.lunch,
      dinner: data.dinner
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light dark:bg-dark px-4">
      <Meteors number={50} />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-black dark:bg-gradient-to-r dark:from-gray-200 dark:to-gray-500">
        {t('title1')}
      </h1>
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-black dark:bg-gradient-to-r dark:from-gray-200 dark:to-gray-500">
        {t('title2')}
      </h1>
      
      <div className="w-full md:w-3/4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <ModeToggle />
          <LanguageSwitcher />
          <Input
            type="text"
            placeholder={t('inputPlaceholder')}
            className="w-full md:w-72 mt-4 mb-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.18 107.68" width="60" height="60">
          <defs>
          <style>{`.cls-1{fill:#231f20;}`}</style>
          </defs>
          <path className="cls-1" d="M-1913.25,1254.17a8.16,8.16,0,0,0-3.27.38c-1.35.37-2.92.92-4.54,1.48-3.21,1.18-6.6,2.45-8.6,3.1-1.53.47-3.15,1.15-4.83,1.77s-3.35,1.26-5,1.67c-.79.2-2.83.42-4.8.7s-3.88.62-4.41,1.29a.92.92,0,0,0-.19.25.42.42,0,0,0-.06.35s0,0,0,.08a24.59,24.59,0,0,0,2.57,7.59,176.7,176.7,0,0,1-33.05,12.93,114.6,114.6,0,0,1-17.42,3.59,52.61,52.61,0,0,1-17.62-.68,33,33,0,0,1-6.49-2.24,29.14,29.14,0,0,1-3-1.61c-.48-.3-.94-.65-1.41-1a12.45,12.45,0,0,1-1.36-1,26,26,0,0,1-4.67-4.94,30.6,30.6,0,0,1-3.29-5.92,39.83,39.83,0,0,1-2-6.49,49.1,49.1,0,0,1-.83-6.73,57.05,57.05,0,0,1,1-13.49,77.13,77.13,0,0,1,9.57-25.16,61.16,61.16,0,0,1,3.7-5.53,38.11,38.11,0,0,1,4.4-4.83,29.49,29.49,0,0,1,5.1-3.88,20.81,20.81,0,0,1,5.64-2.42,13.24,13.24,0,0,1,5.56-.16,11.63,11.63,0,0,1,5,2.22c2.91,2.25,4.74,6,5.58,9.91a30.88,30.88,0,0,1,0,12.34,47.24,47.24,0,0,1-4,12.11,43.87,43.87,0,0,1-16.85,18.8,38.53,38.53,0,0,1-11.88,4.59,39.92,39.92,0,0,1-12.76.51,33.78,33.78,0,0,1-11.25-3.58,30.52,30.52,0,0,1-9.19-7.54,32.82,32.82,0,0,1-7.58-22,30.28,30.28,0,0,1,2.68-11.15,65.42,65.42,0,0,1,5.9-10.4c4.56-6.74,9.83-13.43,13.18-20.87,1.31-3-1.29-3.14-2.85-.32-4.31,7.49-10.23,14.17-15.09,21.54a51.94,51.94,0,0,0-6,11.83,32.26,32.26,0,0,0-1.59,13.21,36.71,36.71,0,0,0,3.65,12.94,37.82,37.82,0,0,0,8.15,10.9,36.17,36.17,0,0,0,11.81,7.05,39.75,39.75,0,0,0,13.57,2.27,42.64,42.64,0,0,0,13.71-2.39,41.82,41.82,0,0,0,12.19-6.71,46.69,46.69,0,0,0,9.47-10.08,50.26,50.26,0,0,0,6.28-12.24,50.57,50.57,0,0,0,1.87-6.63,39.23,39.23,0,0,0,.86-6.87,29.62,29.62,0,0,0-2.56-13.62,18.19,18.19,0,0,0-4.19-5.76,16.13,16.13,0,0,0-6.28-3.48,16.54,16.54,0,0,0-7.17-.26,21.15,21.15,0,0,0-6.64,2.41,37,37,0,0,0-10.38,8.72,64.64,64.64,0,0,0-7.33,11.28,80.55,80.55,0,0,0-8.37,25.48,58.59,58.59,0,0,0-.43,13.7,41.38,41.38,0,0,0,3.56,13.59,30.76,30.76,0,0,0,9,11.38,35,35,0,0,0,13.12,6.09,59.43,59.43,0,0,0,18.78,1q4.65-.43,9.23-1.31l4.51-.92c1.51-.33,3-.71,4.5-1.06a153.62,153.62,0,0,0,34.45-13.14c.47.6,1,1.2,1.46,1.78,1.15,1.29,1.71,3.37,4.29,2.61a8.81,8.81,0,0,0,2.11-1,33.58,33.58,0,0,0,5.59-4.63c1.73-1.79,3.39-3.55,4.78-5.07.35-.37,1.49-1.51,2.92-3s3.15-3.46,4.68-5.43c.78-1,1.53-1.93,2.19-2.83s1.22-1.78,1.67-2.51C-1913.22,1255.25-1912.81,1254.26-1913.25,1254.17Z" transform="translate(2069.25 -1185.9)"></path>
        </svg>
        &nbsp;
        <Button onClick={handleGenerate} disabled={loading} className="flex items-center justify-center mt-4">
          {loading ? t('generatingButton') : t('generateButton')}
        </Button>
      </div>
      <div className="w-full md:w-1/2 mt-4 px-4 md:px-0">
        {recommendation.breakfast && (
          <div className="mb-4">
            <strong>{t('breakfast')}</strong>
            <ReactMarkdown>{recommendation.breakfast}</ReactMarkdown>
          </div>
        )}
        {recommendation.lunch && (
          <div className="mb-4">
            <strong>{t('lunch')}</strong>
            <ReactMarkdown>{recommendation.lunch}</ReactMarkdown>
          </div>
        )}
        {recommendation.dinner && (
          <div className="mb-4">
            <strong>{t('dinner')}</strong>
            <ReactMarkdown>{recommendation.dinner}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'id', ['common'], nextI18NextConfig)),
  },
});
