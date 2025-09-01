import { useEffect, useState } from "react";
import type { Token } from "../store/watchListSlice";

type DialogComponentProps = {
    onClose: () => void;
    showModal: boolean;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    selectedToken: Token[];
    trending: Token[];
    tokens: Token[];
    setSelectedToken: React.Dispatch<React.SetStateAction<Token[]>>;
    isDisabled: boolean;
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    onAddTokens: () => void;
};

const DialogComponent: React.FC<DialogComponentProps> = ({
    onClose,
    showModal,
    // searchTerm,
    setSelectedToken,
    // onSearchChange,
    selectedToken,
    // trending,
    tokens,
    isDisabled,
    setIsDisabled,
    onAddTokens,
}) => {
    console.log(tokens, "tokens");
    const [isVisible, setIsVisible] = useState(showModal);
    useEffect(() => {
        if (showModal) setIsVisible(true);
        else {
            const lag = setTimeout(() => {
                setIsVisible(false);
                setSelectedToken([]);
            }, 200);
            return () => clearTimeout(lag);
        }
    }, [showModal]);
    useEffect(() => {
        if (selectedToken.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [selectedToken]);
    if (!isVisible) {
        return null;
    }
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center bg-[#212124D9] p-6 transition-opacity duration-200 ease-in-out opacity-100 ${
                showModal ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full md:w-[640px] h-[480px] rounded-xl border border-[#FFFFFF14] bg-[#212124] flex flex-col overflow-hidden"
            >
                <header className="w-full border-b border-[#FFFFFF14] py-3 px-4">
                    <input
                        type="search"
                        placeholder="Search tokens (e.g., ETH, SOL)..."
                        list="search-options"
                        autoComplete="false"
                        className="w-full bg-transparent focus:outline-none text-[#F4F4F5] placeholder-gray-400 font-normal text-sm"
                    />
                    {/* <datalist id="search-options">
                        <option value="Apple" />
                        <option value="Banana" />
                        <option value="Cherry" />
                        <option value="Date" />
                        <option value="Elderberry" />
                    </datalist> */}
                </header>
                <div className="text-[#71717A] text-xs font-medium pt-3 pb-1 pl-4">Trending</div>
                <section className="flex-grow overflow-y-auto pl-2 section-scrollbar">
                    {tokens.length === 0 ? (
                        <div className="flex justify-center pt-4">No Tokens found</div>
                    ) : (
                        tokens.map((token) => {
                            const isSelected = selectedToken.some((selected) => selected.id === token.id);

                            return (
                                <div
                                    key={token.id}
                                    onClick={() =>
                                        setSelectedToken((prev) => {
                                            const alreadySelected = prev.some((selected) => selected.id === token.id);
                                            if (alreadySelected) {
                                                return prev.filter((selected) => selected.id !== token.id);
                                            } else {
                                                return [...prev, { ...token, holdings: 1 }];
                                            }
                                        })
                                    }
                                    className={`p-2 flex items-center gap-3 hover:bg-[#A9E8510F] ${
                                        isSelected ? "bg-[#A9E8510F]" : ""
                                    } rounded-md cursor-pointer`}
                                >
                                    <img
                                        src={token.image}
                                        alt={token.name}
                                        className="rounded w-6 h-6 border-2 border-[#212124]"
                                    />
                                    <h4 className="text-[#F4F4F5] flex-grow">
                                        {token.name} ({token.symbol.toUpperCase()})
                                    </h4>
                                    <div className="flex gap-3 items-center">
                                        {isSelected && <img src="/star.svg" className="w-[10.7px] h-[10.22px]" alt="" />}
                                        {isSelected && <img src="/check_circle.svg" alt="" />}
                                        {!isSelected && <img src="/radio_button_unchecked.svg" alt="" />}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </section>
                <footer className="bg-[#27272A] py-3 px-4 border-t border-[#FFFFFF14] flex justify-end">
                    <button
                        disabled={isDisabled}
                        onClick={onAddTokens}
                        className={`px-3 py-2 border ${
                            isDisabled ? "border-[#FFFFFF14] text-[#52525B]" : "border[#1F6619] bg-[#A9E851] text-[#18181B]"
                        } rounded-md text-sm font-medium`}
                    >
                        Add to Wishlist
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default DialogComponent;
