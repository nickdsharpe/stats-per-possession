import Plot from "react-plotly.js";
import initial_state from "../assets/initial_state.json";
import courtImage from "../assets/court_image.jpg";

function DrawPlotlyCourt() {
  const layout: Partial<Plotly.Layout> = {
    images: [
      {
        source: courtImage,
        x: 0,
        y: -52.5,
        xref: "x",
        yref: "y",
        sizex: 500,
        sizey: 470,
        opacity: 1.0,
        layer: "below",
        xanchor: "center",
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
    x: [-250, 0],
    y: [-52.5, 237.5],
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
      style={{ width: 950, height: 940 }}
    />
  );
}

export default DrawPlotlyCourt;
