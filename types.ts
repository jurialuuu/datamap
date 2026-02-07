
export type ModuleId = 0 | 1 | 2 | 3 | 4 | 5;

export type ModuleStatus = 'to-learn' | 'mastered' | 'needs-review';

export interface ModuleData {
  id: ModuleId;
  title: string;
  purpose: string;
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
