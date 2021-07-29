import { FunctionalComponent } from "preact";
import { Home } from "./routes/home";
import "milligram/dist/milligram.min.css"

export const App: FunctionalComponent = () => {
  return <Home />;
};
