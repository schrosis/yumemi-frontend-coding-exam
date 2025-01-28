import type { Meta, StoryObj } from "@storybook/react";
import { PopulationCompositionChart } from "./PopulationCompositionChart";

const meta: Meta<typeof PopulationCompositionChart> = {
  component: PopulationCompositionChart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PopulationCompositionChart>;

export const Default: Story = {
  args: {
    type: "totalPopulation",
    prefectures: [
      {
        prefectureId: 13,
        name: "東京都",
      },
      {
        prefectureId: 14,
        name: "神奈川県",
      },
    ],
    data: [
      {
        year: 2020,
        "13": {
          totalPopulation: 1000,
          youngPopulation: 500,
          workingAgePopulation: 300,
          olderPopulation: 200,
        },
        "14": {
          totalPopulation: 900,
          youngPopulation: 400,
          workingAgePopulation: 200,
          olderPopulation: 300,
        },
      },
      {
        year: 2021,
        "13": {
          totalPopulation: 1200,
          youngPopulation: 600,
          workingAgePopulation: 400,
          olderPopulation: 200,
        },
        "14": {
          totalPopulation: 1000,
          youngPopulation: 300,
          workingAgePopulation: 300,
          olderPopulation: 400,
        },
      },
      {
        year: 2022,
        "13": {
          totalPopulation: 1400,
          youngPopulation: 700,
          workingAgePopulation: 500,
          olderPopulation: 200,
        },
        "14": {
          totalPopulation: 1200,
          youngPopulation: 500,
          workingAgePopulation: 400,
          olderPopulation: 300,
        },
      },
    ],
  },
  render: (args) => (
    <div style={{ width: "100%", height: "250px" }}>
      <PopulationCompositionChart {...args} />
    </div>
  ),
};
