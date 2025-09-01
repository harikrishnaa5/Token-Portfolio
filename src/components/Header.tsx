const Header = () => {
    return (
        <div className="flex justify-between items-center px-[10px] py-[6px] w-full text-white font-medium">
            <span className="flex items-center gap-2">
                <img src="/header-logo.svg" alt="" />
                <h4 className="text-[20px]">Token Portfolio</h4>
            </span>
            <button className="bg-[#A9E851] border border-[#1F6619] py-2 px-3 rounded-[100px] text-black flex gap-2 justify-center items-center">
                <img src="/wallet.svg" alt="" />
                <p className="m-0 leading-none">Connect Wallet</p>
            </button>
        </div>
    );
};

export default Header;
