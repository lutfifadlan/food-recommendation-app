import { useRouter } from 'next/router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (value: string) => {
    router.push(router.pathname, router.asPath, { locale: value });
  };

  return (
    <Select onValueChange={changeLanguage} value={locale}>
      <SelectTrigger className="w-16" defaultValue="id">
        <SelectValue>
          {locale === 'id' ? (
            <div className="flex items-center">
              <ReactCountryFlag countryCode="ID" svg style={{ width: '20px', height: '20px' }} />
            </div>
          ) : (
            <div className="flex items-center">
              <ReactCountryFlag countryCode="US" svg style={{ width: '20px', height: '20px' }} />
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent defaultValue="id">
        <SelectItem value="id">
          <div className="flex items-center justify-center font-poppins">
            <ReactCountryFlag countryCode="ID" svg style={{ width: '20px', height: '20px' }} className='mr-2' />
            Bahasa Indonesia
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex items-center justify-center font-poppins">
            <ReactCountryFlag countryCode="US" svg style={{ width: '20px', height: '20px' }} className='mr-2' />
            English
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
