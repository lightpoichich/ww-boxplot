<template>
  <div class="boxplot-container" :style="containerStyle">
    <svg
      class="boxplot-svg"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- Whiskers -->
      <line
        :x1="orientation === 'vertical' ? boxCenter : min"
        :y1="orientation === 'vertical' ? min : boxCenter"
        :x2="orientation === 'vertical' ? boxCenter : q1"
        :y2="orientation === 'vertical' ? q1 : boxCenter"
        :stroke="whiskerColor"
        :stroke-width="whiskerWidth"
      />
      <line
        :x1="orientation === 'vertical' ? boxCenter : q3"
        :y1="orientation === 'vertical' ? q3 : boxCenter"
        :x2="orientation === 'vertical' ? boxCenter : max"
        :y2="orientation === 'vertical' ? max : boxCenter"
        :stroke="whiskerColor"
        :stroke-width="whiskerWidth"
      />

      <!-- Min and Max caps -->
      <line
        :x1="orientation === 'vertical' ? boxCenter - capWidth / 2 : min"
        :y1="orientation === 'vertical' ? min : boxCenter - capWidth / 2"
        :x2="orientation === 'vertical' ? boxCenter + capWidth / 2 : min"
        :y2="orientation === 'vertical' ? min : boxCenter + capWidth / 2"
        :stroke="whiskerColor"
        :stroke-width="whiskerWidth"
      />
      <line
        :x1="orientation === 'vertical' ? boxCenter - capWidth / 2 : max"
        :y1="orientation === 'vertical' ? max : boxCenter - capWidth / 2"
        :x2="orientation === 'vertical' ? boxCenter + capWidth / 2 : max"
        :y2="orientation === 'vertical' ? max : boxCenter + capWidth / 2"
        :stroke="whiskerColor"
        :stroke-width="whiskerWidth"
      />

      <!-- Box -->
      <rect
        :x="orientation === 'vertical' ? boxCenter - boxWidth / 2 : q1"
        :y="orientation === 'vertical' ? q1 : boxCenter - boxWidth / 2"
        :width="orientation === 'vertical' ? boxWidth : q3 - q1"
        :height="orientation === 'vertical' ? q3 - q1 : boxWidth"
        :fill="boxFill"
        :stroke="boxStroke"
        :stroke-width="boxStrokeWidth"
        rx="2"
        ry="2"
      />

      <!-- Median line -->
      <line
        :x1="orientation === 'vertical' ? boxCenter - boxWidth / 2 : median"
        :y1="orientation === 'vertical' ? median : boxCenter - boxWidth / 2"
        :x2="orientation === 'vertical' ? boxCenter + boxWidth / 2 : median"
        :y2="orientation === 'vertical' ? median : boxCenter + boxWidth / 2"
        :stroke="medianColor"
        :stroke-width="medianWidth"
      />

      <!-- Outliers -->
      <template v-if="showOutliers && outliers.length > 0">
        <circle
          v-for="(outlier, index) in outliers"
          :key="index"
          :cx="orientation === 'vertical' ? boxCenter : getScaledValue(outlier)"
          :cy="orientation === 'vertical' ? getScaledValue(outlier) : boxCenter"
          :r="outlierRadius"
          :fill="outlierFill"
          :stroke="outlierStroke"
          :stroke-width="outlierStrokeWidth"
        />
      </template>

      <!-- Labels avec positionnement alterné pour éviter les chevauchements -->
      <template v-if="showLabels">
        <!-- Min - décalé à gauche/en haut -->
        <text
          :x="orientation === 'vertical' ? boxCenter - boxWidth / 2 - 10 : min"
          :y="orientation === 'vertical' ? min : boxCenter - boxWidth / 2 - 5"
          :text-anchor="orientation === 'vertical' ? 'end' : 'middle'"
          :dominant-baseline="orientation === 'vertical' ? 'middle' : 'auto'"
          :fill="labelColor"
          :font-size="labelFontSize"
        >
          {{ formatValue(minValue) }}
        </text>
        
        <!-- Q1 - position normale à droite/en bas -->
        <text
          :x="orientation === 'vertical' ? boxCenter + boxWidth / 2 + 10 : q1"
          :y="orientation === 'vertical' ? q1 : boxCenter + boxWidth / 2 + 15"
          :text-anchor="orientation === 'vertical' ? 'start' : 'middle'"
          :dominant-baseline="orientation === 'vertical' ? 'middle' : 'hanging'"
          :fill="labelColor"
          :font-size="labelFontSize"
        >
          {{ formatValue(q1Value) }}
        </text>
        
        <!-- Median - décalé plus loin à droite/en bas (emphase) -->
        <text
          :x="orientation === 'vertical' ? boxCenter + boxWidth / 2 + 25 : median"
          :y="orientation === 'vertical' ? median : boxCenter + boxWidth / 2 + 25"
          :text-anchor="orientation === 'vertical' ? 'start' : 'middle'"
          :dominant-baseline="orientation === 'vertical' ? 'middle' : 'hanging'"
          :fill="labelColor"
          :font-size="labelFontSize"
          font-weight="bold"
        >
          {{ formatValue(medianValue) }}
        </text>
        
        <!-- Q3 - décalé à gauche/en haut -->
        <text
          :x="orientation === 'vertical' ? boxCenter - boxWidth / 2 - 10 : q3"
          :y="orientation === 'vertical' ? q3 : boxCenter - boxWidth / 2 - 5"
          :text-anchor="orientation === 'vertical' ? 'end' : 'middle'"
          :dominant-baseline="orientation === 'vertical' ? 'middle' : 'auto'"
          :fill="labelColor"
          :font-size="labelFontSize"
        >
          {{ formatValue(q3Value) }}
        </text>
        
        <!-- Max - position normale à droite/en bas -->
        <text
          :x="orientation === 'vertical' ? boxCenter + boxWidth / 2 + 10 : max"
          :y="orientation === 'vertical' ? max : boxCenter + boxWidth / 2 + 15"
          :text-anchor="orientation === 'vertical' ? 'start' : 'middle'"
          :dominant-baseline="orientation === 'vertical' ? 'middle' : 'hanging'"
          :fill="labelColor"
          :font-size="labelFontSize"
        >
          {{ formatValue(maxValue) }}
        </text>
      </template>
    </svg>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    content: { 
      type: Object, 
      required: true 
    },
    uid: { 
      type: String, 
      required: true 
    },
    /* wwEditor:start */
    wwEditorState: { 
      type: Object, 
      required: true 
    },
    /* wwEditor:end */
  },
  setup(props) {
    // Editor state
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Get values from content with defaults
    const minValue = computed(() => props.content?.minValue ?? 0);
    const q1Value = computed(() => props.content?.q1Value ?? 25);
    const medianValue = computed(() => props.content?.medianValue ?? 50);
    const q3Value = computed(() => props.content?.q3Value ?? 75);
    const maxValue = computed(() => props.content?.maxValue ?? 100);
    const outlierValues = computed(() => props.content?.outlierValues ?? []);
    const orientation = computed(() => props.content?.orientation ?? 'vertical');

    // Styling properties
    const width = computed(() => props.content?.width ?? 200);
    const height = computed(() => props.content?.height ?? 400);
    const padding = computed(() => props.content?.padding ?? 40);
    const boxWidth = computed(() => props.content?.boxWidth ?? 50);
    const capWidth = computed(() => props.content?.capWidth ?? boxWidth.value);
    const boxFill = computed(() => props.content?.boxFill ?? '#e9ecef');
    const boxStroke = computed(() => props.content?.boxStroke ?? '#495057');
    const boxStrokeWidth = computed(() => props.content?.boxStrokeWidth ?? 2);
    const whiskerColor = computed(() => props.content?.whiskerColor ?? '#495057');
    const whiskerWidth = computed(() => props.content?.whiskerWidth ?? 2);
    const medianColor = computed(() => props.content?.medianColor ?? '#dc3545');
    const medianWidth = computed(() => props.content?.medianWidth ?? 2);
    const showOutliers = computed(() => props.content?.showOutliers ?? true);
    const outlierRadius = computed(() => props.content?.outlierRadius ?? 4);
    const outlierFill = computed(() => props.content?.outlierFill ?? '#dc3545');
    const outlierStroke = computed(() => props.content?.outlierStroke ?? '#495057');
    const outlierStrokeWidth = computed(() => props.content?.outlierStrokeWidth ?? 1);
    const showLabels = computed(() => props.content?.showLabels ?? true);
    const labelColor = computed(() => props.content?.labelColor ?? '#212529');
    const labelFontSize = computed(() => props.content?.labelFontSize ?? 12);

    // ✨ FONCTION FORMATVALUE CORRIGÉE ✨
    const formatValue = (value) => {
      if (value === undefined || value === null) {
        return value;
      }

      const useCurrency = props.content?.currencyFormat || false;
      const locale = props.content?.currencyLocale || 'en-US';
      const currency = props.content?.currencyCode || 'USD';
      const decimals = props.content?.decimalPlaces ?? 0;

      try {
        if (useCurrency) {
          // Format avec currency ET décimales
          return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          }).format(value);
        } else {
          // Format sans currency MAIS avec décimales
          return new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          }).format(value);
        }
      } catch (error) {
        console.error('Number formatting error:', error);
        // Fallback simple
        return decimals === 0 
          ? Math.round(value).toString() 
          : value.toFixed(decimals);
      }
    };

    // Calculate the viewBox based on orientation
    const viewBox = computed(() => {
      const w = orientation.value === 'vertical' ? width.value : height.value;
      const h = orientation.value === 'vertical' ? height.value : width.value;
      return `0 0 ${w} ${h}`;
    });

    // Calculate the center of the box
    const boxCenter = computed(() => {
      return orientation.value === 'vertical' 
        ? width.value / 2 
        : height.value / 2;
    });

    // Calculate the data range
    const dataRange = computed(() => {
      const allValues = [
        minValue.value, 
        q1Value.value, 
        medianValue.value, 
        q3Value.value, 
        maxValue.value, 
        ...outlierValues.value
      ];

      const min = Math.min(...allValues);
      const max = Math.max(...allValues);

      // Add a small buffer to the range
      const buffer = (max - min) * 0.1;
      return {
        min: min - buffer,
        max: max + buffer
      };
    });

    // Scale a value to the SVG coordinate space
    const getScaledValue = (value) => {
      const { min, max } = dataRange.value;
      const range = max - min;

      if (range === 0) return padding.value; // Prevent division by zero

      const availableSpace = orientation.value === 'vertical' 
        ? height.value - 2 * padding.value 
        : width.value - 2 * padding.value;

      const scaled = ((value - min) / range) * availableSpace + padding.value;

      // For vertical orientation, we need to invert the y-coordinate
      return orientation.value === 'vertical' 
        ? height.value - scaled 
        : scaled;
    };

    // Scaled coordinates for the boxplot elements
    const min = computed(() => getScaledValue(minValue.value));
    const q1 = computed(() => getScaledValue(q1Value.value));
    const median = computed(() => getScaledValue(medianValue.value));
    const q3 = computed(() => getScaledValue(q3Value.value));
    const max = computed(() => getScaledValue(maxValue.value));
    const outliers = computed(() => outlierValues.value);

    // Container style - fluid sizing for WeWeb editor
    const containerStyle = computed(() => ({
      boxSizing: 'border-box',
      overflow: 'visible',
      border: 'none',
    }));

    return {
      // Dimensions and orientation
      width,
      height,
      orientation,
      viewBox,
      boxCenter,
      containerStyle,

      // Scaled coordinates
      min,
      q1,
      median,
      q3,
      max,
      outliers,

      // Styling
      boxWidth,
      capWidth,
      boxFill,
      boxStroke,
      boxStrokeWidth,
      whiskerColor,
      whiskerWidth,
      medianColor,
      medianWidth,
      showOutliers,
      outlierRadius,
      outlierFill,
      outlierStroke,
      outlierStrokeWidth,
      showLabels,
      labelColor,
      labelFontSize,

      // Values for labels
      minValue,
      q1Value,
      medianValue,
      q3Value,
      maxValue,

      // Helper functions
      getScaledValue,
      formatValue,
      isEditing
    };
  }
};
</script>

<style lang="scss" scoped>
.boxplot-container {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
}

.boxplot-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
