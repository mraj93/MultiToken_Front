import React from "react";

const NFTMarketSidebar = () =>  {

    const filters = [
        'All',
        'Art',
        'Collectibles',
        'Music'
        // Add more filters as needed
    ];
    return (
        <>
            <aside className="sidebar">
                <h2>Filters</h2>
                <ul className="filter-list">
                    {filters.map((filter, index) => (
                        <li key={index}>{filter}</li>
                    ))}
                </ul>
            </aside>
        </>
    );
};

export default NFTMarketSidebar;