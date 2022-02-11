import { FunctionComponent, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

interface PartyChartProps {
  demVotes: number;
  repVotes: number;
  indVotes: number;
  isSenate: boolean;
}

interface GraphData {
  name: string;
  value: number;
  abvMajority?: number;
}

const HOUSE_SEATS = 435;
const SENATE_SEATS = 50;


const renderActiveShape = (props: any) => {
  // mostly from tutorial in docs
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  let subtitle;
  if (payload.abvMajority) {
    const numAbove = payload.abvMajority;
    const sign = numAbove > 0 ? "+" : "";
    const val = numAbove == 0 ? "tie" : "" + numAbove;
    subtitle = sign + val;
  }


  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${subtitle})`}
      </text>
    </g>
  );
};

const seatsAboveMajority = (partySeats: number, totalSeats: number): number => {
  return partySeats - Math.floor(totalSeats / 2);
}

const COLORS = ['#1F4394', '#DB332A', '#6AB022', "#eeeee"];

const PartyChart: FunctionComponent<PartyChartProps> = (props: PartyChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(Math.floor(Math.random() * 2));

  const num_seats = props.isSenate ? SENATE_SEATS : HOUSE_SEATS;

  let data: GraphData[] = [
    {
      name: 'Democrat', value: props.demVotes,
      abvMajority: seatsAboveMajority(props.demVotes, num_seats)
    },
    {
      name: 'Republican', value: props.repVotes,
      abvMajority: seatsAboveMajority(props.repVotes, num_seats)
    },
  ];

  if (props.indVotes) data.push({
    name: 'Independent', value: props.indVotes,
    abvMajority: seatsAboveMajority(props.indVotes, num_seats)
  });
  let undecided = num_seats - props.demVotes - props.repVotes - props.indVotes
  if (undecided > 0) data.push({ name: "Undecided", value: undecided })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={400}>
        <Pie

          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          paddingAngle={2}
          endAngle={180}
          innerRadius={60}
          outerRadius={80}
          minAngle={5}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, i) => { setActiveIndex(i) }}
        >
          {/* color the sections */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PartyChart;