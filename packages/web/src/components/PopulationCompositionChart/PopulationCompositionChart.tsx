import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PopulationComposition = {
  totalPopulation: number;
  youngPopulation: number;
  workingAgePopulation: number;
  olderPopulation: number;
};

type Prefecture = {
  prefectureId: number;
  name: string;
};

export type PopulationCompositionChartProps = {
  type: keyof Omit<PopulationComposition, "year">;
  prefectures: Prefecture[];
  data: {
    year: number;
    [prefectureId: number]: PopulationComposition;
  }[];
};

export const PopulationCompositionChart: React.FC<
  PopulationCompositionChartProps
> = ({ type, prefectures, data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 30,
          right: 20,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" padding={{ left: 0, right: 50 }}>
          <Label value="年度" offset={0} position="insideBottomRight" />
        </XAxis>
        <YAxis padding={{ top: 30, bottom: 0 }}>
          <Label value="人口数" offset={0} position="insideTopLeft" />
        </YAxis>
        <Legend />
        <Tooltip />
        {prefectures.map((prefecture) => (
          <Line
            key={prefecture.prefectureId}
            dataKey={`${prefecture.prefectureId}.${type}`}
            name={prefecture.name}
            stroke={`#${Math.floor(prefecture.prefectureId * (255 ** 3 / 100)).toString(16)}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
