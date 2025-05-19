import { WrapperCard } from "../../components/UI/WrapperCard";
import { render, screen } from "@testing-library/react";

test("renders greeting with given name", () => {
  render(<WrapperCard classes="">children</WrapperCard>);
  const WrapperCardPage = screen.getByText(/children/i);
  expect(WrapperCardPage).toBeInTheDocument();
});
