
import { ModuleData, BusinessProblem, CaseStudy, ModuleId } from './types';

export const MODULES: ModuleData[] = [
  {
    id: 0,
    title: "Real Business Problem",
    iconName: "AlertCircle",
    purpose: "Translate 'vague stress' into a specific, testable business question.",
    whatYouDo: [
      "Write down the primary complaint (e.g., 'Sales are low').",
      "Identify the timeframe of the change (e.g., 'Since last Tuesday').",
      "Define the scope - is it one SKU, one channel, or store-wide?",
      "Draft a hypothesis (e.g., 'I think the new Meta creative is attracting the wrong audience').",
      "Estimate the daily revenue loss to determine priority level."
    ],
    inputsOutputs: {
      inputs: ["Slack alerts", "Daily trade reports", "Ad manager status changes"],
      outputs: ["Testable Hypothesis", "Priority Score Card"]
    },
    example: "'ROAS is down' becomes 'Did the price increase on SKU-A lead to a significant drop in Checkout-to-Purchase conversion?'",
    nextStepLabel: "Go to Metric Map"
  },
  {
    id: 1,
    title: "Metric Map",
    iconName: "Network",
    purpose: "Understand the mathematical relationship between metrics to find the lever.",
    whatYouDo: [
      "Start with GMV and break it into: Traffic x Conversion x AOV.",
      "Identify which of those three 'trunk' metrics shifted most.",
      "Drill into 'Traffic' (CPC, CPM, CTR) vs 'Conversion' (ATC, Checkout).",
      "Label metrics as 'Levers' (CPC) or 'Outcomes' (ROAS).",
      "Check for lead-lag effects (e.g., high CPM today = low GMV next week)."
    ],
    inputsOutputs: {
      inputs: ["Google Analytics 4", "Shopify Analytics", "Advertising Dashboards"],
      outputs: ["Metric Hierarchy Map", "Baseline Performance Index"]
    },
    example: "If AOV is flat and Conversion is stable, but ROAS is down, the issue MUST be Traffic Cost (CPC/CPM).",
    nextStepLabel: "Go to Path Selector"
  },
  {
    id: 2,
    title: "Analysis Path Selector",
    iconName: "Route",
    purpose: "Choose the right thinking scaffold to solve the specific business problem.",
     whatYouDo: [
      "Determine if the issue is a Funnel leak, a Cohort shift, or an Experiment failure.",
      "Map the business problem to specific technical steps (SQL/Spreadsheets).",
      "Identify the 'Decision Memo' format needed for stakeholders.",
      "Set statistical confidence thresholds before looking at data.",
      "Isolate the primary comparison: Control group vs. Test group."
    ],
    inputsOutputs: {
      inputs: ["Business Problem", "Metric Map findings"],
      outputs: ["Ranked Analysis Path", "Selected Thinking Framework"]
    },
    example: "A drop in ROI requires a 'Funnel Efficiency' scaffold rather than an 'LTV Cohort' scaffold.",
    nextStepLabel: "Go to Analysis Library"
  },
  {
    id: 3,
    title: "Analysis Library",
    iconName: "Database",
    purpose: "Technical execution: calculating the numbers to see the truth.",
    whatYouDo: [
      "Clean raw data by removing duplicates or internal test orders.",
      "Calculate 'Post-Click' vs 'View-Through' attribution weights.",
      "Plot the conversion funnel - look for the 'leak' (e.g., 80% drop at shipping info).",
      "Segment results by Device (Mobile vs Desktop) and New vs Returning.",
      "Apply a 'Confidence Interval' check to ensure findings aren't random noise."
    ],
    inputsOutputs: {
      inputs: ["Raw CSV exports", "SQL database access", "BI tools"],
      outputs: ["Cleaned Data Set", "Visual Charts & Pivot Tables"]
    },
    example: "Segmenting CVR by browser reveals that Safari users are failing at checkout due to a tech bug.",
    nextStepLabel: "Go to Tool Translation"
  },
  {
    id: 4,
    title: "Tool Translation",
    iconName: "Terminal",
    purpose: "Map the logic to specific software workflows for ongoing monitoring.",
    whatYouDo: [
      "Write the SQL query to pull this data automatically next time.",
      "Create an Excel template with the specific formulas (VLOOKUP/Pivot).",
      "Set up an automated alert in Slack/Email for metric thresholds.",
      "Build a Looker/Tableau dashboard for executive visibility.",
      "Document the 'Data Dictionary' so the team knows what each column means."
    ],
    inputsOutputs: {
      inputs: ["Validated Analysis logic"],
      outputs: ["SQL Code Snippets", "Dashboard Templates", "Automated Alerts"]
    },
    example: "A complex cohort calculation in Module 3 is turned into a `SELECT DATE_TRUNC` query for a weekly auto-report.",
    nextStepLabel: "Go to Decision & Impact"
  },
  {
    id: 5,
    title: "Decision & Impact",
    iconName: "Rocket",
    purpose: "Communicate findings and trigger a specific business action.",
    whatYouDo: [
      "Write the 'TL;DR' summary - what happened and why it matters.",
      "Propose the 'Stop / Start / Continue' actions.",
      "Quantify the expected ROI of the recommendation.",
      "Prepare the 'Communication Memo' for stakeholders.",
      "Schedule the follow-up review to see if the action worked."
    ],
    inputsOutputs: {
      inputs: ["Charts from Module 3", "Context from Module 0"],
      outputs: ["Decision Memo", "Stakeholder Email", "Budget Reallocation Plan"]
    },
    example: "Instead of saying 'Ads are bad', say 'Cutting $5k from Audience A and moving it to Audience B will likely increase ROI by 0.5x based on the last 14 days.'",
    nextStepLabel: "Complete Journey"
  }
];

export const PROBLEMS: BusinessProblem[] = [
  {
    id: "roi_dropped",
    label: "ROI dropped",
    iconName: "TrendingDown",
    description: "Your return on spend is suddenly below target.",
    suggestedModules: [0, 1, 3],
    metricsToWatch: ["ROAS", "CPC", "CR", "CPM"],
    blueprints: {
      0: { title: "Framing the Drop", advice: "Isolate exactly which creative group or campaign started the decline. Don't assume it's store-wide.", action: "Draft a hypothesis: 'Recent CPM spikes in Top-of-Funnel are outstripping stable CVR.'" },
      1: { title: "Mapping the Lever", advice: "Prioritize CPC and CPM. If these are up while CVR is flat, your ads are simply too expensive.", action: "Compare last 7 days vs baseline for CPC by Campaign." },
      2: { title: "Selecting the Path", advice: "Choose the 'Ad Spend Efficiency' path. This focuses on marginal returns per ad set.", action: "Set a 95% confidence threshold for your creative test." },
      3: { title: "Library Execution", advice: "Run a 'CPM vs ROAS' correlation chart to see which audiences are saturating.", action: "Calculate 1st-day ROAS per creative." },
      4: { title: "Tool Setup", advice: "Build a 'Creative Fatigue' alert in Slack that triggers when CPC > $2.50.", action: "Write a JOIN query connecting UTMs to Shopify Orders." },
      5: { title: "Decision Making", advice: "Stop spend on campaigns with ROAS < 1.5x immediately. Reallocate to high-CTR legacy winners.", action: "Draft 'Urgent Ad Shift' memo for the CEO." }
    }
  },
  {
    id: "cvr_dropped",
    label: "Conversion Rate dropped",
    iconName: "MousePointerClick",
    description: "CVR is down despite steady traffic.",
    suggestedModules: [1, 3, 4],
    metricsToWatch: ["CR", "ATC Rate", "Checkout Start Rate"],
    blueprints: {
      0: { title: "Technical Frame", advice: "Check for site speed or tech bugs first. This is rarely a creative issue if traffic is the same.", action: "Hypothesize: 'New checkout update broke Mobile Safari.'" },
      1: { title: "Funnel Mapping", advice: "Drill into ATC (Add to Cart) and IC (Initiate Checkout). Where does the line break?", action: "Analyze ATC-to-Checkout conversion ratio." },
      2: { title: "Choosing the Framework", advice: "Use the 'Friction Funnel' framework. This isolates technical drop-offs from intent.", action: "Identify the high-drop funnel step." },
      3: { title: "Deep Dive", advice: "Segment your conversion funnel by Device and Browser. Look for outliers.", action: "Run a segment analysis: Chrome vs Safari." },
      4: { title: "Automation", advice: "Set up a GTM trigger to track 'Error messages' seen by users at checkout.", action: "Create a 'Friction Dashboard' in GA4." },
      5: { title: "The Solution", advice: "Brief the developers on the specific browser/device combo failing. Revert last code push.", action: "Write a bug report with impact quantified in lost GMV." }
    }
  },
  {
    id: "cac_high",
    label: "CAC too high",
    iconName: "UserPlus",
    description: "Acquisition cost is exceeding first-purchase margin.",
    suggestedModules: [3, 5],
    metricsToWatch: ["CAC", "CPM", "CTR", "1st Purchase Margin"],
    blueprints: {
      0: { title: "Margin Frame", advice: "Frame this as a 'Unit Economics' problem. How much can we actually afford to pay?", action: "Calculate 'Break-even CAC' based on COGS." },
      1: { title: "LTV Context", advice: "Look at Day-60 LTV. A high CAC might be fine if repeat rate is high.", action: "Map CAC to LTV for current cohorts." },
      2: { title: "Strategy Path", advice: "Select the 'Profitability Ceiling' scaffold to find your absolute spend limits.", action: "Establish a max-bid strategy." },
      3: { title: "Margin Analysis", advice: "Deduct COGS and Ad Spend from GMV to see true Contribution Margin.", action: "Build a pivot table for Contribution Margin per Channel." },
      4: { title: "Systemization", advice: "Connect your Shopify COGS data to your Ad Manager via an API tool like TripleWhale.", action: "Automate 'Net Profit' reporting." },
      5: { title: "Executive Memo", advice: "Recommend lowering daily caps on Meta until blended CAC drops below target.", action: "Quantify how much spend must be cut to reach profitability." }
    }
  },
  {
    id: "aov_low",
    label: "AOV too low",
    iconName: "ShoppingBag",
    description: "Basket sizes are shrinking.",
    suggestedModules: [1, 3],
    metricsToWatch: ["AOV", "UPT", "Discount Rate"],
    blueprints: {
      0: { title: "Basket Framing", advice: "Is it a price drop, or are people just buying fewer items per order?", action: "Compare Units Per Transaction (UPT) year-over-year." },
      1: { title: "Bundling Logic", advice: "Map which products are usually bought alone. These are your bundle targets.", action: "Identify 'Solo-Purchased' SKUs." },
      2: { title: "Growth Path", advice: "Use the 'Basket Affinity' framework to identify cross-sell opportunities.", action: "Map product pairings." },
      3: { title: "Data Mining", advice: "Perform a 'Market Basket Analysis' to find SKUs that correlate strongly with each other.", action: "Calculate SKU correlation coefficients." },
      4: { title: "Technical Trigger", advice: "Implement a 'Frequently Bought Together' widget based on the correlations found.", action: "Export bundle lists for the site team." },
      5: { title: "Strategic Proposal", advice: "Propose a 'Free Shipping at $X' threshold to push users to add one more item.", action: "Calculate the ideal shipping threshold to maximize margin." }
    }
  },
  {
    id: "retention_low",
    label: "Retention low",
    iconName: "UserCheck",
    description: "One-and-done customers are becoming the norm.",
    suggestedModules: [3, 4, 5],
    metricsToWatch: ["Retention Rate", "CLV", "Repeat Ratio"],
    blueprints: {
      0: { title: "Quality Frame", advice: "Is the problem the product or the acquisition source? Discount-hunters don't return.", action: "Hypothesize: 'Black Friday discount-seekers are low-LTV.'" },
      1: { title: "Cohort Mapping", advice: "Map repeat purchase rate by acquisition month. Are newer cohorts worse than older ones?", action: "Visualize 2nd-order time lag." },
      2: { title: "LTV Framework", advice: "Select the 'Cohort Decay' framework to identify the exact drop-off month.", action: "Determine the 'churn' window." },
      3: { title: "Cohort Analysis", advice: "Compare repeat rates between 'Discount' customers and 'Full Price' customers.", action: "Calculate LTV by Discount Code." },
      4: { title: "CRM Setup", advice: "Build an automated Klaviyo segment for customers who haven't returned after 45 days.", action: "Automate 'Win-back' triggers." },
      5: { title: "Strategic Move", advice: "Move 20% of acquisition budget to retention ads targeting high-intent lapsed users.", action: "Draft a 'Retention-First' growth plan." }
    }
  },
  {
    id: "promo_unclear",
    label: "Big promo results unclear",
    iconName: "Percent",
    description: "A major sale ended, but it's hard to tell if it actually drove incremental profit.",
    suggestedModules: [0, 3, 5],
    metricsToWatch: ["GMV", "Contribution Margin", "Discount Rate", "Incremental Lift"],
    blueprints: {
      0: { title: "Incrementality Frame", advice: "The core question isn't 'how much did we sell', but 'how much more did we sell vs a normal week'.", action: "Identify the 14-day 'Control Period' before the promo started." },
      1: { title: "Margin Sensitivity", advice: "Map the discount depth to the volume increase. Did a 20% discount drive >25% volume lift?", action: "Calculate 'Break-even Volume Lift' required for the discount." },
      2: { title: "Pre-Post Path", advice: "Choose the 'Pre-Post Incrementality' scaffold. This compares time-series behavior.", action: "Establish a baseline daily GMV average." },
      3: { title: "Halo Execution", advice: "Analyze 'Halo Effects'—did the promo on SKU-A lead to full-price sales of SKU-B?", action: "Calculate 'Attached Revenue' for promo items." },
      4: { title: "Promo Dashboard", advice: "Build a real-time 'Discount vs Margin' tracker in Looker for future sales.", action: "Automate daily Contribution Margin reporting during sale events." },
      5: { title: "Post-Mortem", advice: "Decide if the 'Customer Acquisition' quality was worth the 'Margin Compression'.", action: "Draft a 'Promo ROI Summary' recommending 15% vs 20% depth for the next event." }
    }
  }
];

export const CASES: CaseStudy[] = [
  {
    id: "case-a",
    title: "ROI Decline After Creative Refresh",
    category: "Media Buying",
    context: "A brand updated its hero videos on Meta. Spend increased, but ROAS dropped from 3.2x to 2.1x overnight.",
    hypothesisTree: [
      "New creative is attracting lower-quality traffic (High CTR, low CVR)",
      "Technical tracking issue with new UTM parameters",
      "Landing page mismatch with new video 'hook'"
    ],
    requiredData: ["Meta Ad Manager", "Shopify Orders", "GA4 Sessions"],
    analysisSteps: [
      "Isolate 'New' vs 'Old' creative performance in a side-by-side table",
      "Calculate Post-Click CVR for each creative group",
      "Compare Checkout-Start to Purchase ratio for the new traffic source"
    ],
    recommendation: "Revert 60% of spend to top-performing legacy creatives while testing a new 'hybrid' hook that better matches the landing page value prop.",
    emailTemplate: "Subject: Urgent Update: Ad Creative Performance Anomaly\n\nHi Team,\n\nI've analyzed the ROAS drop following Monday's creative launch. While the new videos have a 25% higher CTR, the Purchase CVR is 40% lower than our baseline.\n\nProposed Action: Revert spend to Legacy V3 video for 48 hours to stabilize revenue while we adjust the landing page for the new creative series.\n\nBest, [Name]",
    chartData: [
      { name: 'Mon (Old)', roas: 3.2, ctr: 1.2 },
      { name: 'Tue (Mixed)', roas: 2.8, ctr: 1.4 },
      { name: 'Wed (New)', roas: 2.1, ctr: 1.8 },
      { name: 'Thu (New)', roas: 1.9, ctr: 1.9 },
    ]
  },
  {
    id: "case-b",
    title: "Repeat Purchase Paradox",
    category: "Operations",
    context: "Monthly active customers are growing, but the % of repeat customers has dropped from 35% to 22% over 6 months.",
    hypothesisTree: [
      "New customer quality is lower due to aggressive promo acquisition",
      "Post-purchase email flow broke or has high unsubscribe rates",
      "Product quality/shipping issues causing one-time-buy frustration"
    ],
    requiredData: ["Customer Lifetime CSV", "Klaviyo Rates", "Support ticket volume"],
    analysisSteps: [
      "Run a 30/60/90 day Cohort Retention analysis",
      "Calculate Second-Order Time Lag by month of acquisition",
      "Filter retention by 'Discount Code Used' vs 'Full Price'"
    ],
    recommendation: "Shift budget from broad-market 'New Acquisition' to a 'Second-Order Upsell' campaign targeting month-3 customers with non-discounted bundles.",
    emailTemplate: "Subject: Strategic Shift: Optimizing Customer Retention\n\nHi Team,\n\nOur data shows our recent growth is driven by 'low-loyalty' discount seekers who aren't returning. Our 90-day retention has dropped significantly.\n\nStrategy: Implement a Month-2 product education sequence to increase perceived value before the next purchase window. Target: Increase repeat rate back to 30% by Q4.\n\nBest, [Name]",
    chartData: [
      { name: 'Jan', repeatRate: 35 },
      { name: 'Feb', repeatRate: 33 },
      { name: 'Mar', repeatRate: 30 },
      { name: 'Apr', repeatRate: 28 },
      { name: 'May', repeatRate: 25 },
      { name: 'Jun', repeatRate: 22 },
    ]
  }
];
