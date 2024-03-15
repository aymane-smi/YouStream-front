import { QueryClient, QueryClientProvider } from "react-query";
import { Navbar } from "./Navbar";
import {render, screen} from "@testing-library/react"

describe("testing navabr", ()=>{
    let client:QueryClient;
    beforeAll(()=>{
        client = new QueryClient(); 
    
    });
    it("check navabr text", ()=>{
        render(
            <QueryClientProvider client={client}>
                <Navbar />
            </QueryClientProvider>
        );
        const alt1 = screen.getByAltText("youstream icon");
        const alt2 = screen.getByAltText("youstream image");
        expect(alt1).toBeInTheDocument();
        expect(alt2).toBeInTheDocument();
    });
});