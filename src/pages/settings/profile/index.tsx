import ProfileForm from './profile-form'
import ContentSection from '../components/content-section'
import { useTranslation } from "react-i18next";

export default function SettingsProfile() {
  const { t } = useTranslation();
  return (
    <ContentSection
      title={t('Profile')}
      desc={t('This is how others will see you on the site.')}
    >
      <ProfileForm />
    </ContentSection>
  )
}
