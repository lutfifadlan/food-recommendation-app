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
      <h1 className="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 flex items-center justify-center text-center">
        {t('title1')}
      </h1>
      <h1 className="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 flex items-center justify-center text-center">
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
      <Button onClick={handleGenerate} disabled={loading} className="flex items-center justify-center mt-4">
        {loading ? t('generatingButton') : t('generateButton')}
      </Button>
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
