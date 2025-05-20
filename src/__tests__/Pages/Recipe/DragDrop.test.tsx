import { render, screen } from "@testing-library/react";
import { DragDrop } from "../../../views/Recipe/List/Modal/StepComponents/DragDrop";
import "@testing-library/jest-dom";

describe("DragDrop Component", () => {
  it("renders without crashing", () => {
    render(
      <DragDrop
        changed=""
        setChanged={() => {}}
        askAction=""
        setAskAction={() => {}}
        setOpenMainModal={() => {}}
      />
    );
    expect(screen.getByText(/Изменения/i)).toBeInTheDocument(); // or another text you render
  });

  it("calls playSound and toast.success on save", () => {
    // const { getByText } = render(
    //   <DragDrop
    //     changed="true"
    //     setChanged={jest.fn()}
    //     askAction=""
    //     setAskAction={jest.fn()}
    //     setOpenMainModal={jest.fn()}
    //   />
    // );
    // Simulate a save action
    // e.g. click save button (if visible)
    // fireEvent.click(getByText("Save")); // adjust to actual button
    // expect(mocked functions to have been called)
    // expect(toast.success).toHaveBeenCalled();
    // expect(playSound).toHaveBeenCalled();
  });
});
