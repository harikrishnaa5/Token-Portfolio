import DialogComponent from "./DialogComponent";
import WatchListTable from "./WatchListTable";
import { useEffect, useState } from "react";
import type { Token } from "../store/watchListSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToken, removeToken, updateHoldings } from "../store/watchListSlice";
import type { AppDispatch, RootState } from "../store/store";

const WatchList = () => {
    const [showModal, setShowModal] = useState(false);
    const [tokens, setTokens] = useState<Token[]>([]);
    const [trending, setTrending] = useState<Token[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedToken, setSelectedToken] = useState<Token[]>([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const dispatch = useDispatch<AppDispatch>();
    const watchlist = useSelector((state: RootState) => state.watchlist.items);
    const onClose = () => {
        setShowModal(false);
    };
    const handleAddTokens = () => {
        console.log(tokens, "token");
        selectedToken.forEach((token) => {
            dispatch(addToken(token));
        });
        setSelectedToken([]);
        setShowModal(false);
        setIsDisabled(true);
    };

    const handleRemoveToken = (id: string) => {
        // dispatch your redux remove token action here
        dispatch(removeToken(id));
    };

    const handleEditHoldingsClick = (token: Token) => {
        // Optionally open a modal or focus holdings input for editing
        console.log("Edit holdings clicked for", token);
    };

    const handleHoldingsChange = (id: string, holdings: number) => {
        dispatch(updateHoldings({ id, holdings }));
    };

    useEffect(() => {
        if (!showModal) return;

        const fetchTrending = async () => {
            try {
                const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
                const data = await res.json();
                const trendTokens = data.coins.map((c: any) => ({
                    id: c.item.id,
                    name: c.item.name,
                    symbol: c.item.symbol,
                    image: c.item.small,
                }));
                setTrending(trendTokens);
            } catch (error) {
                console.error("Trending fetch error:", error);
                setTrending([]);
            }
        };

        const fetchTokens = async () => {
            try {
                const res = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
                );
                const data = await res.json();
                const tokenList = data.map((t: any) => ({
                    id: t.id,
                    name: t.name,
                    symbol: t.symbol,
                    image: t.image,
                    price: t.current_price,
                    priceChange24h: t.price_change_24h,
                }));
                setTokens(tokenList);
            } catch (error) {
                console.error("Tokens fetch error:", error);
                setTokens([]);
            }
        };

        fetchTrending();
        fetchTokens();
    }, [showModal]);

    return (
        <div className="flex flex-col gap-4">
            <span className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <img src="/star.svg" alt="" />
                    <h2 className="font-medium text-2xl text-[#F4F4F5]">Watchlist</h2>
                </div>
                <div className="flex gap-3">
                    <button className="text-white flex items-center gap-3 font-medium rounded-md bg-[#FFFFFF0A] py-2 px-3 text-sm m-0 leading-none">
                        <img src="/refresh.svg" alt="" className="text-[#A1A1AA] m-0 leading-none" />
                        Refresh Prices
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#A9E851] flex items-center gap-2 text-[#18181B] font-medium rounded-md py-2 px-3 text-sm m-0 leading-none"
                    >
                        <img src="/plus-mini.svg" alt="" className="m-0 leading-none" />
                        Add Token
                    </button>
                </div>
            </span>
            <WatchListTable
                watchlist={watchlist}
                onHoldingsChange={handleHoldingsChange}
                onRemoveToken={handleRemoveToken}
                onEditHoldingsClick={handleEditHoldingsClick}
            />
            <DialogComponent
                showModal={showModal}
                onClose={onClose}
                // searchTerm={searchTerm}
                // onSearchChange={setSearchTerm}
                selectedToken={selectedToken}
                tokens={tokens}
                // trending={trending}
                setSelectedToken={setSelectedToken}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                onAddTokens={handleAddTokens}
            />
        </div>
    );
};

export default WatchList;
