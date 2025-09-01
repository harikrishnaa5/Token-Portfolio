// const WatchListTable = () => {
//     return (
//         <div className="rounded-xl shadow-xl border border-[#FFFFFF14] overflow-hidden">
//             <table className="min-w-full divide-y divide-[#FFFFFF14]">
//                 <thead className="bg-[#27272A]">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs">Stock</th>
//                         <th className="px-6 py-3 text-left text-xs">Price</th>
//                         <th className="px-6 py-3 text-left text-xs">Change</th>
//                     </tr>
//                 </thead>
//                 <tbody className="py-3">
//                     <tr className="px-6">
//                         <td>Etherium</td>
//                         <td>$.45.000</td>
//                         <td>67.0%</td>
//                     </tr>
//                 </tbody>
//             </table>
//             {/* Pagination Footer Example */}
//             <div className="flex justify-between items-center p-4 border-t border-[#FFFFFF14] text-sm">
//                 <span></span>
//                 <span className="flex items-center gap-2">
//                     <button className="py-1 px-2">1 of 10 pages</button>
//                     <button className="py-1 px-2">Prev</button>
//                     <button className="py-1 px-2">Next</button>
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default WatchListTable;

import React, { useState, useRef, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { Token } from "../store/watchListSlice";

type WatchListTableProps = {
    watchlist: Token[];
    onHoldingsChange: (id: string, holdings: number) => void;
    onRemoveToken: (id: string) => void;
    onEditHoldingsClick: (token: Token) => void;
};

const Sparkline = ({ }: { prices: number[] }) => {
    return <div className="w-20 h-6 bg-gray-700 rounded select-none">Sparkline</div>;
};

const RowMenu = ({
    token,
    onEditHoldingsClick,
    onRemoveToken,
}: {
    token: Token;
    onEditHoldingsClick: (token: Token) => void;
    onRemoveToken: (id: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative flex justify-end">
            <button
                onClick={() => setOpen(!open)}
                className="px-2 py-0.5 text-[#71717A] hover:text-white"
                aria-label="Row menu"
            >
                &#x2026;
            </button>
            {open && (
                <div
                    ref={menuRef}
                    className="absolute right-4 w-36 bg-[#27272A] border border-[#FFFFFF14] shadow-lg z-10 rounded-lg overflow-hidden"
                    style={{
                        transformOrigin: "right bottom",
                        bottom: "calc(100% - 56px)",
                    }}
                >
                    <button
                        onClick={() => {
                            onEditHoldingsClick(token);
                            setOpen(false);
                        }}
                        className="flex items-center justify-start gap-1.5 w-full text-left px-4 py-2 text-sm text-white hover:bg-[#444] border-b border-b-[#FFFFFF14]"
                    >
                        <img src="/pencil-square.svg" alt="" className="pt-0.5" /> Edit Holdings
                    </button>
                    <button
                        onClick={() => {
                            onRemoveToken(token.id);
                            setOpen(false);
                        }}
                        className="flex gap-1.5 items-center justify-start w-full text-left px-4 py-2 text-sm text-[#FDA4AF] hover:bg-[#444]"
                    >
                        <img src="/trash.svg" alt="" className="pt-0.5" /> Remove
                    </button>
                </div>
            )}
        </div>
    );
};

const WatchListTable: React.FC<WatchListTableProps> = ({
    watchlist,
    onHoldingsChange,
    onRemoveToken,
    onEditHoldingsClick,
}) => {
    console.log(watchlist, "watchlist");
    const columns = React.useMemo(
        () => [
            {
                id: "token",
                header: "Token",
                accessorKey: "name",
                cell: (info: any) => (
                    <div className="flex items-center gap-2">
                        <img src={info.row.original.image} alt={info.row.original.name} className="w-6 h-6 rounded" />
                        <span>
                            {info.row.original.name} ({info.row.original.symbol.toUpperCase()})
                        </span>
                    </div>
                ),
            },
            {
                id: "price",
                header: "Price",
                accessorKey: "price",
                cell: (info: any) => `$${info.getValue().toFixed(2)}`,
            },
            {
                id: "priceChange24h",
                header: "24h %",
                accessorKey: "priceChange24h",
                cell: (info: any) => (
                    <span className={info.getValue() > 0 ? "text-green-500" : "text-red-500"}>
                        {info.getValue() > 0 ? "+" : ""}
                        {info.getValue().toFixed(2)}%
                    </span>
                ),
            },
            {
                id: "sparkline",
                header: "Sparkline (7d)",
                accessorKey: "sparkline",
                cell: (info: any) => <Sparkline prices={info.getValue()} />,
            },
            {
                id: "holdings",
                header: "Holdings",
                accessorKey: "holdings",
                cell: (info: any) => (
                    <input
                        type="number"
                        className="w-20 px-1 text-[#F4F4F5] rounded"
                        min={1}
                        value={info.getValue()}
                        onChange={(e) => onHoldingsChange(info.row.original.id, Number(e.target.value))}
                    />
                ),
            },
            {
                id: "value",
                header: "Value",
                cell: (info: any) => {
                    const value = info.row.original.price * info.row.original.holdings;
                    return `$${value.toFixed(2)}`;
                },
                meta: {
                    className: "text-[#F4F4F5]",
                },
            },
            {
                id: "rowMenu",
                cell: (info: any) => (
                    <RowMenu
                        token={info.row.original}
                        onEditHoldingsClick={onEditHoldingsClick}
                        onRemoveToken={onRemoveToken}
                    />
                ),
            },
        ],
        [onHoldingsChange, onRemoveToken, onEditHoldingsClick]
    );

    const table = useReactTable({
        data: watchlist,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    console.log(table.getRowModel(), " this is getrow model of table");
    // const portfolioTotal = React.useMemo(
    //     () => watchlist.reduce((acc, token) => acc + token.price * token.holdings, 0),
    //     [watchlist]
    // );

    return (
        <div className="rounded-xl shadow-xl border border-[#FFFFFF14] overflow-auto">
            <table className="w-full table-fixed divide-y divide-[#FFFFFF14]">
                <thead className="bg-[#27272A]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-6 py-3 text-left text-xs max-w-[150px] truncate">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-[#333] cursor-pointer">
                            {row.getVisibleCells().map((cell) => {
                                // const cellClassName = cell.column.columnDef.meta?.className || "";
                                return (
                                    <td
                                        key={cell.id}
                                        className={`px-6 py-3 align-middle max-w-[150px] truncate font-normal text-xs ${
                                            cell.column.id === "value" ? "text-white" : ""
                                        }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center p-4 border-t border-[#FFFFFF14] text-sm">
                <span></span>
                <span className="flex items-center gap-2">
                    <button className="py-1 px-2">1 of 10 pages</button>
                    <button className="py-1 px-2">Prev</button>
                    <button className="py-1 px-2">Next</button>
                </span>
            </div>
        </div>
    );
};

export default WatchListTable;
