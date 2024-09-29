import { Typography } from "antd";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetPackagePercent } from "../../hooks/useStatisticsApi";
import moment from "moment";
import { vndFormat } from "../../utils/price-vnd";

function ColumnChart({ periods }) {
  const { Title } = Typography;

  const {
    data = [],
    isLoading,
    error,
  } = useGetPackagePercent({
    startDate: periods.startDate,
    endDate: periods.endDate,
  });

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Tháng " + moment(periods.startDate).format("MM")],
      },
      yaxis: {
        title: {
          text: "Doanh thu lợi nhuận theo tháng (VND)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + vndFormat(val);
          },
        },
      },
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const newSeries = data.map((item) => ({
        name: item.packageName,
        data: [item.totalRevenue], // Assuming totalRevenue is an array of monthly revenues
      }));

      setChartData((prevState) => ({
        ...prevState,
        series: newSeries,
      }));
    }
  }, [data]);

  console.log(chartData);

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Thống kê doanh thu từng gói theo tháng</Title>
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={320}
        />
      </div>

      {/* <div className="chart-vistior">
        <Title level={5}>Hoạt động người dùng</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
      </div> */}
    </>
  );
}

export default ColumnChart;
