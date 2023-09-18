import Plot from "react-plotly.js";
import courtImage from "../assets/court_image.png";
import example_data from "../assets/example_data.json";

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
        sizing: "stretch",
      },
    ],
    xaxis: {
      range: [-250, 250],
      showgrid: false,
      showticklabels: false,
      visible: false,
    },
    yaxis: {
      range: [-52.5, 417.5],
      showgrid: false,
      showticklabels: false,
      visible: false,
    },
    showlegend: false,
    hovermode: false,
    dragmode: false,
  };

  // Create Marker data for selected shot locations
  const scatterData: any = [];

  example_data["ovr_data"]["shooting_locations"].forEach((location) => {
    const coordinates = location[0] as [number, number];
    const isGreenMarker = location[1] === 1;

    const scatterTrace = {
      type: "scatter",
      mode: "markers",
      x: [coordinates[0]],
      y: [coordinates[1]],
      marker: {
        color: isGreenMarker ? "rgba(0, 0, 0, 0)" : "f05443",
        size: 25,
        symbol: isGreenMarker ? "circle" : "x",
        line: {
          color: isGreenMarker ? "54e35a" : "rgba(0, 0, 0, 0)",
          width: 7,
        },
      },
    };

    scatterData.push(scatterTrace);
  });

  return (
    <Plot
      data={scatterData}
      layout={layout}
      config={{ displayModeBar: false, scrollZoom: false }}
      style={{ width: 1000, height: 940 }}
    />
  );
}

export default DrawPlotlyCourt;
