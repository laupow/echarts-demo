document.addEventListener('DOMContentLoaded', (event) => {

  function generateMockData(dataPoints, minValue, maxValue, fixedDecimal) {
    const data = [];
    const currentTime = new Date();
    for (let i = dataPoints - 1; i >= 0; i--) {
      const time = new Date(currentTime.getTime() - i * 60000);
      const value = (Math.random() * (maxValue - minValue) + minValue).toFixed(fixedDecimal);
      data.push([time, value]);
    }
    return data;
  }

  function generateConstantData(dataPoints, constantValue) {
    const data = [];
    const currentTime = new Date();

    for (let i = 0; i < dataPoints; i++) {
      const time = new Date(currentTime.getTime() - (dataPoints - i) * 60000);
      data.push([time, constantValue]);
    }
    return data;
  }

  // Helper function to generate realistic metric data
  function generateMetricData(dataPoints, initialLoad, maxLoad, isStable = false) {
    const data = [];
    const currentTime = new Date();
    let currentLoad = initialLoad;

    for (let i = 0; i < dataPoints; i++) {
      const time = new Date(currentTime.getTime() - (dataPoints - i) * 60000);
      let value;

      if (i < dataPoints * 0.3) {
        currentLoad += (maxLoad - currentLoad) * (Math.random() * 0.1);
      } else if (i < dataPoints * 0.7) {
        currentLoad = maxLoad + (isStable ? 0 : Math.random() * 0.1 - 0.05);
      } else {
        currentLoad *= 0.95 - (Math.random() * 0.05);
      }

      value = currentLoad > 0 ? currentLoad : 0; // Ensure the value doesn't go below 0
      data.push([time, value]);
    }
    return data;
  }

  // General chart initialization function
  function initChart(chartDomId, chartOptions) {
    const chartDom = document.getElementById(chartDomId);
    const myChart = echarts.init(chartDom, 'customTheme', {
      width: 600,
      height: 400
    });
    myChart.setOption(chartOptions);
    window.addEventListener('resize', myChart.resize);
    return myChart;
  }

  // System Load Average Chart
  function generateRealisticLoadData(dataPoints, initialLoad, maxLoad) {
    const data = [];
    const currentTime = new Date();

    // The initial load is lower than the max to simulate a rise
    let currentLoad = initialLoad;
    for (let i = 0; i < dataPoints; i++) {
      const time = new Date(currentTime.getTime() - (dataPoints - i) * 60000);
      let value;

      if (i < dataPoints * 0.3) {
        // Non-linear rise to peak
        currentLoad += (maxLoad - currentLoad) * (Math.random() * 0.1);
      } else if (i < dataPoints * 0.7) {
        // Sustain near max with small variations
        currentLoad = maxLoad + (Math.random() * 0.1 - 0.05);
      } else {
        // Gradual decrease to almost 0
        currentLoad *= 0.95 - (Math.random() * 0.05);
      }

      value = currentLoad > 0 ? currentLoad : 0; // Ensure the value doesn't go below 0
      data.push([time, value]);
    }
    return data;
  }

  // Generate data for the 1-minute, 5-minute, and 15-minute load averages
  const loadAverageData1min = generateRealisticLoadData(60, 0.2, 0.7);
  const loadAverageData5min = generateRealisticLoadData(60, 0.2, 0.5);
  const loadAverageData15min = generateRealisticLoadData(60, 0.2, 0.3);

  // Adjust the chart options to include these realistic data sets
  const loadAverageOptions = {
    title: {
      text: 'System Load Average',
      textStyle: {
        color: 'white'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    series: [
      {
        name: '1-min Average',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: loadAverageData1min
      },
      {
        name: '5-min Average',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: loadAverageData5min
      },
      {
        name: '15-min Average',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: loadAverageData15min
      }
    ]
  };


  // CPU Utilization Chart
  const cpuUtilizationOptions = {
    title: {
      text: 'CPU Utilization (%)'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    series: [{
      name: 'CPU',
      type: 'line',
      data: generateMockData(60, 0, 100, 2)
    }]
  };

  // Memory Utilization Chart
  const memoryUtilizationOptions = {
    title: {
      text: 'Memory Utilization (%)'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    series: [{
      name: 'Memory',
      type: 'line',
      data: generateMockData(60, 0, 100, 2)
    }]
  };

  // Network Throughput Chart
  const networkThroughputOptions = {
    title: {
      text: 'Network Throughput (Mbps)'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      min: 0,
      max: 100 // Assuming the max throughput is 100 Mbps for mock data
    },
    series: [{
      name: 'Throughput',
      type: 'line',
      showSymbol: false,
      data: generateMockData(60, 10, 100, 2) // Throughput varies between 10 Mbps to 100 Mbps
    }]
  };

  // Network Latency Chart
  const networkLatencyOptions = {
    title: {
      text: 'Network Latency (ms)'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      min: 0,
      max: 500 // Assuming the max latency is 500 ms for mock data
    },
    series: [{
      name: 'Latency',
      type: 'line',
      showSymbol: false,
      data: generateMockData(60, 50, 500, 0) // Latency varies between 50 ms to 500 ms
    }]
  };

  // Network Availability Chart
  const networkAvailabilityOptions = {
    title: {
      text: 'Network Availability (%)'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      min: 90, // Assuming the network is usually above 90% availability
      max: 100
    },
    series: [{
      name: 'Availability',
      type: 'line',
      showSymbol: false,
      data: generateMockData(60, 90, 100, 2) // Availability varies between 90% to 100%
    }]
  };

  // Generating data for each metric
  const cpuUtilizationData = generateMetricData(60, 10, 90); // CPU utilization between 10% and 90%
  const memoryUtilizationData = generateMetricData(60, 20, 80); // Memory utilization between 20% and 80%
  const networkThroughputData = generateMetricData(60, 20, 100); // Network throughput between 20 Mbps and 100 Mbps

  // Adjust the chart options for each chart
  // Assuming that you have initial chart option setups like loadAverageOptions
  // Update each chart's data similar to below:
  cpuUtilizationOptions.series[0].data = cpuUtilizationData;
  memoryUtilizationOptions.series[0].data = memoryUtilizationData;
  networkThroughputOptions.series[0].data = networkThroughputData;

  // Generate network availability data always at 100%
  const networkAvailabilityData = generateConstantData(60, 100);
  networkAvailabilityOptions.series[0].data = networkAvailabilityData;

  initChart('loadAverageChart', loadAverageOptions);
  initChart('cpuUtilizationChart', cpuUtilizationOptions);
  initChart('memoryUtilizationChart', memoryUtilizationOptions);
  initChart('networkThroughputChart', networkThroughputOptions);
  initChart('networkLatencyChart', networkLatencyOptions);
  initChart('networkAvailabilityChart', networkAvailabilityOptions);

});
