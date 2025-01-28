import { render } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import { PopulationCompositionChart } from "./PopulationCompositionChart";

describe("PopulationCompositionChart Component", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    };
  });

  test("matches the snapshot", () => {
    const { asFragment } = render(
      <PopulationCompositionChart
        type="totalPopulation"
        prefectures={[{ prefectureId: 13, name: "東京都" }]}
        data={[
          {
            year: 2021,
            "13": {
              totalPopulation: 1000,
              youngPopulation: 500,
              workingAgePopulation: 300,
              olderPopulation: 200,
            },
          },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
