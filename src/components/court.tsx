import Plot from "react-plotly.js";
import initial_state from "../assets/initial_state.json";
import courtImage from "../assets/court_image.jpg";

function DrawPlotlyCourt() {
  const layout: Partial<Plotly.Layout> = {
    images: [
      {
        source: courtImage,
        x: 0,
        y: 180,
        xref: "x",
        yref: "y",
        sizex: 470,
        sizey: 520,
        opacity: 1.0,
        layer: "below",
        xanchor: "center",
        yanchor: "middle",
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
    x: [-250],
    y: [-52.5],
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
