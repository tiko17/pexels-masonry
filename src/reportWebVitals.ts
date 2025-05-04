import { ReportHandler, Metric } from 'web-vitals';

type MetricRating = 'good' | 'needs-improvement' | 'poor';

interface ExtendedMetric extends Metric {
  rating?: MetricRating;
  navigationType?: string;
}

const formatMetric = (metric: ExtendedMetric) => {
  const color = metric.rating === 'good' ? 'green' : 
                metric.rating === 'needs-improvement' ? 'orange' : 'red';
                
  return [
    `${metric.name} (${metric.rating || 'unknown'}):`,
    `Value: ${Math.round(metric.value * 100) / 100}`,
    `ID: ${metric.id}`,
    `Navigation Type: ${metric.navigationType || 'N/A'}`
  ].join('\n');
};

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Cumulative Layout Shift
      getCLS(metric => {
        console.log('%c Core Web Vital: CLS', 'font-weight: bold;');
        console.log('%c' + formatMetric(metric as ExtendedMetric), `color: ${(metric as ExtendedMetric).rating === 'good' ? 'green' : 'red'}`);
        onPerfEntry(metric);
      });
      
      // First Input Delay
      getFID(metric => {
        console.log('%c Core Web Vital: FID', 'font-weight: bold;');
        console.log('%c' + formatMetric(metric as ExtendedMetric), `color: ${(metric as ExtendedMetric).rating === 'good' ? 'green' : 'red'}`);
        onPerfEntry(metric);
      });
      
      // First Contentful Paint
      getFCP(metric => {
        console.log('%c Performance Metric: FCP', 'font-weight: bold;');
        console.log('%c' + formatMetric(metric as ExtendedMetric), `color: ${(metric as ExtendedMetric).rating === 'good' ? 'green' : 'red'}`);
        onPerfEntry(metric);
      });
      
      // Largest Contentful Paint
      getLCP(metric => {
        console.log('%c Core Web Vital: LCP', 'font-weight: bold;');
        console.log('%c' + formatMetric(metric as ExtendedMetric), `color: ${(metric as ExtendedMetric).rating === 'good' ? 'green' : 'red'}`);
        onPerfEntry(metric);
      });
      
      // Time to First Byte
      getTTFB(metric => {
        console.log('%c Performance Metric: TTFB', 'font-weight: bold;');
        console.log('%c' + formatMetric(metric as ExtendedMetric), `color: ${(metric as ExtendedMetric).rating === 'good' ? 'green' : 'red'}`);
        onPerfEntry(metric);
      });
    });
  }
};

export default reportWebVitals; 