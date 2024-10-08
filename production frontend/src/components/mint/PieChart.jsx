// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const COLORS = ["#030D03", "#06AE0B"];

export default function PieChartArea() {
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
        {/* <Tooltip /> */}
        {/* <Legend /> */}
      </PieChart>
    </div>
  );
}
