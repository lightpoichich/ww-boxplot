export default {
editor: {
label: {
en: 'Boxplot',
},
icon: 'chart-bar',
},
properties: {
// Data values
minValue: {
label: { en: 'Minimum Value' },
type: 'Number',
section: 'settings',
bindable: true,
defaultValue: 0,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The minimum value (lower whisker) of the boxplot',
},
propertyHelp: {
tooltip: 'The minimum value (lower whisker) of the boxplot',
},
/* wwEditor:end */
},
q1Value: {
label: { en: 'Q1 Value' },
type: 'Number',
section: 'settings',
bindable: true,
defaultValue: 25,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The first quartile (25th percentile) value of the boxplot',
},
propertyHelp: {
tooltip: 'The first quartile (25th percentile) value of the boxplot',
},
/* wwEditor:end */
},
medianValue: {
label: { en: 'Median Value' },
type: 'Number',
section: 'settings',
bindable: true,
defaultValue: 50,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The median (50th percentile) value of the boxplot',
},
propertyHelp: {
tooltip: 'The median (50th percentile) value of the boxplot',
},
/* wwEditor:end */
},
q3Value: {
label: { en: 'Q3 Value' },
type: 'Number',
section: 'settings',
bindable: true,
defaultValue: 75,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The third quartile (75th percentile) value of the boxplot',
},
propertyHelp: {
tooltip: 'The third quartile (75th percentile) value of the boxplot',
},
/* wwEditor:end */
},
maxValue: {
label: { en: 'Maximum Value' },
type: 'Number',
section: 'settings',
bindable: true,
defaultValue: 100,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The maximum value (upper whisker) of the boxplot',
},
propertyHelp: {
tooltip: 'The maximum value (upper whisker) of the boxplot',
},
/* wwEditor:end */
},
outlierValues: {
label: { en: 'Outlier Values' },
type: 'Array',
section: 'settings',
bindable: true,
defaultValue: [],
options: {
expandable: true,
getItemLabel(_, index) {
return `Outlier ${index + 1}`;
},
item: {
type: 'Number',
defaultValue: 0,
}
},
/* wwEditor:start */
bindingValidation: {
type: 'Array',
tooltip: 'An array of outlier values to display on the boxplot',
},
propertyHelp: {
tooltip: 'An array of outlier values to display on the boxplot',
},
/* wwEditor:end */
},
orientation: {
label: { en: 'Orientation' },
type: 'TextRadioGroup',
section: 'settings',
bindable: true,
defaultValue: 'vertical',
options: {
choices: [
{ value: 'vertical', title: 'Vertical', icon: 'align-left' },
{ value: 'horizontal', title: 'Horizontal', icon: 'align-top' },
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The orientation of the boxplot: "vertical" or "horizontal"',
},
propertyHelp: {
tooltip: 'Choose whether to display the boxplot vertically or horizontally',
},
/* wwEditor:end */
},

// Padding
padding: {
label: { en: 'Padding' },
type: 'Number',
section: 'settings',
bindable: true,
defaultValue: 40,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The padding around the boxplot in pixels',
},
propertyHelp: {
tooltip: 'The padding around the boxplot in pixels',
},
/* wwEditor:end */
},

// Box styling
boxWidth: {
label: { en: 'Box Width' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 50,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The width of the box in pixels',
},
propertyHelp: {
tooltip: 'The width of the box in pixels',
},
/* wwEditor:end */
},
capWidth: {
label: { en: 'Cap Width' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 50,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The width of the whisker caps in pixels',
},
propertyHelp: {
tooltip: 'The width of the whisker caps in pixels',
},
/* wwEditor:end */
},
boxFill: {
label: { en: 'Box Fill Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#e9ecef',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The fill color of the box',
},
propertyHelp: {
tooltip: 'The fill color of the box',
},
/* wwEditor:end */
},
boxStroke: {
label: { en: 'Box Stroke Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#495057',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The stroke color of the box',
},
propertyHelp: {
tooltip: 'The stroke color of the box',
},
/* wwEditor:end */
},
boxStrokeWidth: {
label: { en: 'Box Stroke Width' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 2,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The stroke width of the box in pixels',
},
propertyHelp: {
tooltip: 'The stroke width of the box in pixels',
},
/* wwEditor:end */
},

// Whisker styling
whiskerColor: {
label: { en: 'Whisker Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#495057',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The color of the whiskers',
},
propertyHelp: {
tooltip: 'The color of the whiskers',
},
/* wwEditor:end */
},
whiskerWidth: {
label: { en: 'Whisker Width' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 2,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The width of the whiskers in pixels',
},
propertyHelp: {
tooltip: 'The width of the whiskers in pixels',
},
/* wwEditor:end */
},

// Median styling
medianColor: {
label: { en: 'Median Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#dc3545',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The color of the median line',
},
propertyHelp: {
tooltip: 'The color of the median line',
},
/* wwEditor:end */
},
medianWidth: {
label: { en: 'Median Width' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 2,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The width of the median line in pixels',
},
propertyHelp: {
tooltip: 'The width of the median line in pixels',
},
/* wwEditor:end */
},

// Outlier styling
showOutliers: {
label: { en: 'Show Outliers' },
type: 'OnOff',
section: 'style',
bindable: true,
defaultValue: true,
/* wwEditor:start */
bindingValidation: {
type: 'boolean',
tooltip: 'Whether to show outliers on the boxplot',
},
propertyHelp: {
tooltip: 'Toggle to show or hide outliers on the boxplot',
},
/* wwEditor:end */
},
outlierRadius: {
label: { en: 'Outlier Radius' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 4,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The radius of the outlier circles in pixels',
},
propertyHelp: {
tooltip: 'The radius of the outlier circles in pixels',
},
/* wwEditor:end */
},
outlierFill: {
label: { en: 'Outlier Fill Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#dc3545',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The fill color of the outlier circles',
},
propertyHelp: {
tooltip: 'The fill color of the outlier circles',
},
/* wwEditor:end */
},
outlierStroke: {
label: { en: 'Outlier Stroke Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#495057',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The stroke color of the outlier circles',
},
propertyHelp: {
tooltip: 'The stroke color of the outlier circles',
},
/* wwEditor:end */
},
outlierStrokeWidth: {
label: { en: 'Outlier Stroke Width' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 1,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The stroke width of the outlier circles in pixels',
},
propertyHelp: {
tooltip: 'The stroke width of the outlier circles in pixels',
},
/* wwEditor:end */
},

// Label styling
showLabels: {
label: { en: 'Show Labels' },
type: 'OnOff',
section: 'style',
bindable: true,
defaultValue: true,
/* wwEditor:start */
bindingValidation: {
type: 'boolean',
tooltip: 'Whether to show value labels on the boxplot',
},
propertyHelp: {
tooltip: 'Toggle to show or hide value labels on the boxplot',
},
/* wwEditor:end */
},
currencyFormat: {
label: { en: 'Currency Format' },
type: 'OnOff',
section: 'settings',
bindable: true,
defaultValue: false,
/* wwEditor:start */
bindingValidation: {
type: 'boolean',
tooltip: 'Enable or disable currency formatting for labels'
},
propertyHelp: {
tooltip: 'When enabled, values will be displayed as currency'
}
/* wwEditor:end */
},
currencyCode: {
label: { en: 'Currency Code' },
type: 'Text',
section: 'settings',
bindable: true,
defaultValue: 'USD',
hidden: content => !content.currencyFormat,
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The currency code to use for formatting (e.g., USD, EUR, GBP)'
},
propertyHelp: {
tooltip: 'Specify the three-letter ISO currency code (e.g., USD, EUR, GBP)'
}
/* wwEditor:end */
},
currencyLocale: {
label: { en: 'Currency Locale' },
type: 'Text',
section: 'settings',
bindable: true,
defaultValue: 'en-US',
hidden: content => !content.currencyFormat,
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The locale to use for currency formatting (e.g., en-US, fr-FR)'
},
propertyHelp: {
tooltip: 'Specify the locale for currency formatting (e.g., en-US, fr-FR)'
}
/* wwEditor:end */
},
labelColor: {
label: { en: 'Label Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#212529',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'The color of the value labels',
},
propertyHelp: {
tooltip: 'The color of the value labels',
},
/* wwEditor:end */
},
labelFontSize: {
label: { en: 'Label Font Size' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 12,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The font size of the value labels in pixels',
},
propertyHelp: {
tooltip: 'The font size of the value labels in pixels',
},
/* wwEditor:end */
},
decimalPlaces: {
label: { en: 'Decimal Places' },
type: 'Number',
section: 'style',
bindable: true,
defaultValue: 0,
/* wwEditor:start */
bindingValidation: {
type: 'number',
tooltip: 'The number of decimal places to show in value labels',
},
propertyHelp: {
tooltip: 'The number of decimal places to show in value labels',
},
/* wwEditor:end */
},
},
};
