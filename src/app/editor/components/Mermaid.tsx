'use client';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const MermaidChart = ({ chart, caption } : { chart: string, caption: string }) => {
  const ref = useRef(null);
  const [chartEl, setChartEl] = useState<ReactElement<any, any> | null>(null);

  useEffect(() => {
    if (ref && ref.current) {
      mermaid.init(undefined, ref.current);
    }
  }, [chartEl]);

  useEffect(() => {
    if (!chartEl) {
      setChartEl(
        <div className="max-w-lg flex justify-center flex-col items-center mermaid" ref={ref}>
          {chart}
        </div>
      );
    }
  }, [chart, chartEl])

  return <figure className="flex justify-center flex-col items-center my-4">
    {chartEl}
    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{caption}</figcaption>
  </figure>
};

export default MermaidChart;