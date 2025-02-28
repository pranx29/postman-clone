import React, { useState } from "react";
import "./styles/Tabs.css";

export default function Tab({ tabs, activeTab, setTab }) {
    return (
        <div className="tab-container">
            {Object.values(tabs).map((tab) => (
                <button
                    key={tab}
                    className={`tab-button ${
                        activeTab === tab ? "active" : ""
                    }`}
                    onClick={() => setTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
