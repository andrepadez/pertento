import { COMPANY_SIZES } from 'misc';

export const companyId = 621;
export const websiteId = 2993;
export const experimentId = 1577;
export const variantId = 3434;

export const mockExperiment = {
  name: 'Experiment from Testing',
  websiteId,
  companyId,
  parentCompanyId: 1,
  testing: true,
};

export const mockVariant = {
  experimentId,
  name: 'Blue Variant',
  testing: true,
};

export const mockWebsite = {
  companyId,
  parentCompanyId: 1,
  url: 'https://testing004.pertento.ai/',
};

export const mockCompany = {
  parentCompanyId: companyId,
  name: 'Mock Company',
  size: COMPANY_SIZES[0],
};

export const mockDeviceTargeting = {
  device: 'Desktop',
  experimentId,
  testing: true,
};

export const mockUrlTargeting = {
  experimentId,
  condition: 'contains',
  url: 'https://www.example.com',
  testing: true,
};

export const mockChange = {
  variantId: 672,
  action: 'replace',
  property: 'html',
  value:
    '<button type="button" data-dismiss="modal" aria-label="Stäng" class="close modal-close">\n  <svg class="svg-icon w-3rem h-3rem svg-icon-light align-middle">\n    <use xlink:href="#close-1"></use>\n  </svg>\n</button>',
  tagName: 'BUTTON',
  prevValue: null,
  selector:
    'HTML:nth-child(1)>BODY:nth-child(2)>DIV:nth-child(3)>DIV:nth-child(1)>DIV:nth-child(1)>DIV:nth-child(1)>BUTTON:nth-child(2)',
  tagNames: null,
  prevValues: null,
  friendlySelector: null,
  friendlySelectorIndex: null,
  selectors: null,
  friendlySelectors: null,
  friendlySelectorIndexes: null,
};
