/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Typography } from "antd";
import ReactApexChart from "react-apexcharts";
import { useGetPackagePercent } from "../../hooks/useStatisticsApi";
import { useEffect, useState } from "react";

function PieChart({ periods }) {
  const { Title } = Typography;

  const { data, isLoading, error } = useGetPackagePercent({
    startDate: periods.startDate,
    endDate: periods.endDate,
  });

  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (data && isMounted) {
      setChartData(data.map((item) => item.percent));
      setChartLabels(data.map((item) => item.packageName));
    }

    return () => {
      isMounted = false;
    };
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const options = {
    labels: chartLabels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "top",
          },
        },
      },
    ],
  };

  const series = chartData;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Thống kê gói được sử dụng</Title>
        </div>
      </div>

      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={options}
          series={series}
          type="pie"
          height={320}
        />
      </div>
    </>
  );
}

export default PieChart;
