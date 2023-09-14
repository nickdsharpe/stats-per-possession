import Plot from "react-plotly.js";

function DrawPlotlyCourt() {
  const courtImage = "court_image.jpg";

  const layout: Partial<Plotly.Layout> = {
    images: [
      {
        source: courtImage,
        x: 250,
        y: -52.5,
        xref: "x",
        yref: "y",
        sizex: 1,
        sizey: 1,
        opacity: 1.0,
        layer: "below",
        xanchor: "right",
        yanchor: "bottom",
      },
    ],
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
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default DrawPlotlyCourt;
