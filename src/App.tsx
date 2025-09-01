import "./App.css";
import Header from "./components/Header";
import PortfolioTotal from "./components/PortfolioTotal";
import WatchList from "./components/WatchList";

function App() {
    return (
        <div className="min-h-screen max-w-full overflow-x-hidden">
            <Header />
            <div className="w-full p-6 flex flex-col md:gap-12">
                <PortfolioTotal />
                <WatchList />
            </div>
        </div>
    );
}

export default App;
