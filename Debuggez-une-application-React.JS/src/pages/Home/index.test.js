import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    // Implementation de ce test
    render(<Home />);
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });
  it("a list a people is displayed", async () => {
    // Implementation de ce test
    render(<Home />);
    expect(screen.getByTestId("people-list")).toBeInTheDocument();
  });
  it("a footer is displayed", () => {
    // Implementation de ce test
    render(<Home />);
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();    
  });
  it("an event card, with the last event, is displayed", () => {
    // Implementation de ce test
    render(<Home />);
    expect(screen.getByTestId("last-event")).toBeInTheDocument();
  });
});