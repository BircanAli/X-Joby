import { useState } from "react";

import BarChartComponent from "./BarChartComponent.jsx";
import AreaChartsComponent from "./AreaChartsComponent.jsx";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartsComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
