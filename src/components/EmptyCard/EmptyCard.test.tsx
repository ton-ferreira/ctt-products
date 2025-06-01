import { render, screen } from "@testing-library/react";
import EmptyCard from "./EmptyCard";

describe("EmptyCard", () => {
  it("should render title and description", () => {
    const title = "No items found.";
    const description = "Something descriptive...";
    render(<EmptyCard title={title} description={description} />);

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
