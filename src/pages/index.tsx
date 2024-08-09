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
    <div className="min-h-screen flex flex-col items-center justify-center bg-light dark:bg-dark">
      <Meteors number={50} />
      <h1 className="text-3xl font-bold mb-2 transition-colors duration-300 flex items-center justify-center">
        {t('title1')}
      </h1>
      <h1 className="text-3xl font-bold mb-2 transition-colors duration-300 flex items-center justify-center">
        {t('title2')}
      </h1>
      
      <div className="w-3/4">
        <div className="flex items-center justify-center">
          <ModeToggle />
          &nbsp;
          &nbsp;
          <LanguageSwitcher />
          &nbsp;
          &nbsp;
          <Input
            type="text"
            placeholder={t('inputPlaceholder')}
            className="w-72 mt-4 mb-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={loading} className="flex flex-col items-center justify-center">
            {loading ? t('generatingButton') : t('generateButton')}
        </Button>
      <div className="w-1/2 mt-4">
        {recommendation.breakfast && (
          <div>
            <strong>{t('breakfast')}</strong>
            <ReactMarkdown>{recommendation.breakfast}</ReactMarkdown>
            <br />
          </div>
        )}
        {recommendation.lunch && (
          <div>
            <strong>{t('lunch')}</strong>
            <ReactMarkdown>{recommendation.lunch}</ReactMarkdown>
            <br />
          </div>
        )}
        {recommendation.dinner && (
          <div>
            <strong>{t('dinner')}</strong>
            <ReactMarkdown>{recommendation.dinner}</ReactMarkdown>
            <br />
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
