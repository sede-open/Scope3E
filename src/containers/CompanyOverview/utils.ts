export const getCompanySize = (numberOfEmployees: number | null, t: any) => {
  if (numberOfEmployees === null) {
    return '-';
  }
  if (numberOfEmployees > 1001) {
    return t('companyOverview:size.enterprise');
  }
  if (numberOfEmployees > 500) {
    return t('companyOverview:size.large');
  }
  if (numberOfEmployees > 250) {
    return t('companyOverview:size.small');
  }
  return t('companyOverview:size.micro');
};
