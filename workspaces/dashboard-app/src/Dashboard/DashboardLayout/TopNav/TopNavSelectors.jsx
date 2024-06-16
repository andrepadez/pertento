import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Separator } from 'shadcn/separator';
import { Combobox } from 'components/Combobox';
import { useOrganizations } from '@/state/useOrganizations';
import { useWebsites } from '@/state/useWebsites';
import { useAuth } from 'hooks/useAuth';

export const TopNavSelectors = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { options: organizations, organization, setOrganization } = useOrganizations();
  const { options: websites, website, setWebsite } = useWebsites();

  if (!user || !organizations || !websites) return null;

  const onChangeOrganization = (value) => {
    setOrganization(value);
    if (/\/experiments\/\d+/.test(pathname)) {
      setTimeout(() => navigate('/experiments'));
    }
  };

  const onChangeWebsite = (value) => {
    if (website?.id === value) return;
    setWebsite(value);
    if (/\/experiments\/\d+/.test(pathname)) {
      setTimeout(() => navigate('/experiments'));
    }
  };

  return (
    <div className="hidden gap-8 md:flex lg:flex-row">
      <Separator className="mt-3 h-10 bg-[#667085]" orientation="vertical" />
      {user.company.type === 'Agency' && (
        <>
          <div className="flex flex-col justify-center">
            <Combobox
              options={[{ value: '00000', label: '+ Create New', href: '/organizations?create' }, ...organizations]}
              value={organization?.id}
              onChange={onChangeOrganization}
              className="w-52 lg:w-60 xl:w-80"
            />
          </div>
          <Separator className="mt-3 h-10 bg-[#667085]" orientation="vertical" />
        </>
      )}
      {websites && (
        <div className="flex flex-col justify-center">
          <Combobox
            options={[{ value: '00000', label: '+ Create New', href: '/websites?create' }, ...websites]}
            value={website?.id}
            onChange={onChangeWebsite}
            className="w-52 lg:w-60 xl:w-80"
          />
        </div>
      )}
    </div>
  );
};
