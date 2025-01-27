import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(<Checkbox label="Test Checkbox" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
