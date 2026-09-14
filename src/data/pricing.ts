export type ServiceKey = 'website' | 'webapp' | 'shopify';

// Keep draft amounts in one place, but do not publish them until they are approved.
export const pricing = {
  showPrices: false,
  currency: 'USD',
  amounts: { website: 450, webapp: 900, shopify: 1200 },
} as const satisfies {
  showPrices: boolean;
  currency: string;
  amounts: Record<ServiceKey, number>;
};
