import { RenderResult, render, screen } from "@testing-library/react";
import Account from "./page";

describe("testing account page", ()=>{
    let page: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    beforeEach(()=>{
        page = render(<Account />);
    });
    it("check the loading of the page", ()=>{
        //page = render(<Account />);
        const text = page.queryByText("Profile Settings");
        expect(text).toBeInTheDocument();
    });
    it("check that the inputs are disabled", ()=>{
        const input1 = screen.getByTestId("username_input");
        const input2 = screen.getByTestId("password_input");
        expect(input1).toBeDisabled();
        expect(input2).toBeDisabled();
    })
});