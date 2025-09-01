const PortfolioTotal = () => {
    return (
        <div className="bg-[#27272A] rounded-xl p-6 grid grid-cols-2 gap-5 md:h-72">
            <div className="flex flex-col gap-5">
                <h4 className="font-medium">Portfolio Total</h4>
                <h1 className="text-[#F4F4F5] md:text-[56px] m-0 leading-none">$10,275.08</h1>
                <div className="flex-grow flex flex-col justify-end">
                    <h4 className="text-xs">Last updated: 3:42:12 PM</h4>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h4 className="font-medium">Portfolio Total</h4>
                <span className="w-full flex gap-5">
                    <div className="dounut-chart md:w-40 md:h-40"></div>
                    <div className="flex flex-col gap-4 flex-1">
                        <p className="text-sm">Bitcoin (BTC)</p>
                        <p className="text-sm">Bitcoin (BTC)</p>
                        <p className="text-sm">Bitcoin (BTC)</p>
                        <p className="text-sm">Bitcoin (BTC)</p>
                        <p className="text-sm">Bitcoin (BTC)</p>
                        <p className="text-sm">Bitcoin (BTC)</p>
                    </div>
                    <div className="flex flex-col gap-4 items-end flex-1">
                        <p className="text-sm">22.0%</p>
                        <p className="text-sm">22.0%</p>
                        <p className="text-sm">22.0%</p>
                        <p className="text-sm">22.0%</p>
                        <p className="text-sm">22.0%</p>
                        <p className="text-sm">22.0%</p>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default PortfolioTotal;
