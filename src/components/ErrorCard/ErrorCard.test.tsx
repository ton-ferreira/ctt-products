import { render, screen } from "@testing-library/react";
import ErrorCard from "./ErrorCard";

describe("ErrorCard", () => {
  it("should show a text when it renders", () => {
    const errorMessage = "[404] Error message is missing!!!";
    render(<ErrorCard errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage));
  });
});
