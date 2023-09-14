import Plot from "react-plotly.js";

function DrawPlotlyCourt() {
  const layout: Partial<Plotly.Layout> = {
    xaxis: {
      range: [-250, 250],
      showgrid: false,
      showticklabels: false,
    },
    yaxis: {
      range: [-52.5, 417.5],
      showgrid: false,
      showticklabels: false,
    },
    showlegend: false,
  };

  // Define your scatter trace data
  const scatterTrace: Partial<Plotly.PlotData> = {
    type: "scatter",
    x: [16],
    y: [66],
    mode: "markers",
    marker: {
      opacity: 1.0,
      size: 5,
    },
  };

  return (
    <Plot
      data={[scatterTrace]}
      layout={layout}
      config={{ displayModeBar: false }}
      style={{ width: 500, height: 470 }}
    />
  );
}

export default DrawPlotlyCourt;
