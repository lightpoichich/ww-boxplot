---
name: boxplot
description: A customizable boxplot component for visualizing statistical data distribution with quartiles and outliers
keywords: boxplot, statistics, data visualization, quartiles, outliers, chart
---

#### Boxplot
***Purpose:***
A statistical visualization component that displays the distribution of data through quartiles, median, and potential outliers, helping users identify patterns and anomalies in their datasets.

***Features:***
- Visualize data distribution with quartiles, median, and whiskers
- Highlight outliers with customizable markers
- Configure colors for each boxplot element
- Show/hide labels with customizable formatting
- Support for currency formatting with locale options
- Responsive design that adapts to container dimensions
- Customizable axis and label styling

***Properties:***
- data: array - The dataset to visualize (array of numbers)
- showOutliers: boolean - Toggle visibility of outlier points
- showLabels: boolean - Toggle visibility of value labels
- currencyFormat: boolean - Enable currency formatting for labels
- currencyCode: string - Currency code for formatting (e.g., 'USD', 'EUR')
- currencyLocale: string - Locale for currency formatting (e.g., 'en-US', 'fr-FR')
- labelFormat: boolean - Enable number formatting for non-currency labels
- labelPrecision: number - Number of decimal places for formatted labels
- boxColor: string - Color of the main box (Q1-Q3)
- whiskerColor: string - Color of the whiskers (min-max lines)
- medianColor: string - Color of the median line
- outlierColor: string - Color of outlier points
- labelColor: string - Color of value labels
- boxWidth: string - Width of the box as percentage of container
- boxHeight: string - Height of the box in pixels
- orientation: 'horizontal'|'vertical' - Direction of the boxplot

***Notes:***
- The component automatically calculates quartiles, median, and identifies outliers
- For best results, provide a dataset with at least 5 values
- Currency formatting takes precedence over number formatting when both are enabled
- The boxplot adapts to the container size while maintaining proper statistical proportions
