
export type ModuleId = 0 | 1 | 2 | 3 | 4 | 5;

export type ModuleStatus = 'to-learn' | 'mastered' | 'needs-review';

export interface ModuleData {
  id: ModuleId;
  title: string;
  purpose: string;
  iconName: string;
  whatYouDo: string[];
  inputsOutputs: {
    inputs: string[];
    outputs: string[];
  };
  example: string;
  nextStepLabel: string;
}

export interface BusinessProblem {
  id: string;
  label: string;
  iconName: string;
  description: string;
  // Tailored advice for every single module in the map
  blueprints: Record<ModuleId, {
    title: string;
    advice: string;
    action: string;
  }>;
  suggestedModules: ModuleId[];
  metricsToWatch: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  context: string;
  hypothesisTree: string[];
  requiredData: string[];
  analysisSteps: string[];
  recommendation: string;
  emailTemplate: string;
  chartData: any[];
}

export enum AppTab {
  Map = 'map',
  Cases = 'cases',
  About = 'about'
}

export const DEFINITIONS: Record<string, string> = {
  "GMV": "Gross Merchandise Volume: Total value of merchandise sold through the store over a period.",
  "ROAS": "Return on Ad Spend: Revenue generated for every dollar spent on advertising (Revenue / Spend).",
  "CPC": "Cost Per Click: The price you pay for each click in your marketing campaigns.",
  "CPM": "Cost Per Mille: The cost for 1,000 impressions (views) of an advertisement.",
  "CTR": "Click-Through Rate: Percentage of people who click an ad after seeing it.",
  "CVR": "Conversion Rate: Percentage of visitors who complete a purchase.",
  "CR": "Conversion Rate: Same as CVR. The percentage of visitors who purchase.",
  "CAC": "Customer Acquisition Cost: The total cost to acquire a new customer.",
  "LTV": "Lifetime Value: Average revenue a customer generates throughout their relationship with you.",
  "CLV": "Customer Lifetime Value: Same as LTV.",
  "AOV": "Average Order Value: The average amount spent per transaction.",
  "UPT": "Units Per Transaction: Average number of items purchased in a single order.",
  "ATC": "Add To Cart: Percentage of sessions where an item was added to the cart.",
  "IC": "Initiate Checkout: Percentage of sessions that reach the checkout stage.",
  "Cohort": "A group of customers who made their first purchase in the same time period.",
  "Funnel": "The visual representation of steps a user takes toward a conversion.",
  "Unit Economics": "The revenues and costs of your business model on a per-customer basis.",
  "Contribution Margin": "Revenue minus variable costs (COGS, shipping, ad spend).",
  "SKU": "Stock Keeping Unit: A unique identifier for each distinct product.",
  "UTM": "Urchin Tracking Module: Tags added to a URL to track the source of traffic."
};
