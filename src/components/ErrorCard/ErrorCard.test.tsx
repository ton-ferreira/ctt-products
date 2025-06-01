import { render, screen } from "@testing-library/react";

describe("ErrorCard", () => {
  it("should show a text when it renders", () => {
    const error = "[404] Error message is missing!!!";
    render(<ErrorCard error={error} />);
    expect(screen.getByText(error));
  });
});
