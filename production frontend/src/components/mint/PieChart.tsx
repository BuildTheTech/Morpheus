// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#030D03", "#06AE0B"];

interface PieChartAreaProps {
  percent: number;
}

export default function PieChartArea({ percent }: PieChartAreaProps) {
  const data = [
    { name: "Group A", value: 100 - percent },
    { name: "Group B", value: percent },
  ];

  return (
    <div className="-rotate-90">
      <PieChart width={260} height={260}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={130}
          fill="#030D03"
          dataKey="value"
          stroke="non"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              style={{ outline: "none", border: "none" }}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
