import "./styles/RequestPanel.css";
import { METHODS, METHOD_COLORS } from "./js/constants";
import { useState } from "react";

export default function RequestPanel({
    method,
    setMethod,
    url,
    onUrlChange,
    onSendClick,
}) {
    const [isValid, setIsValid] = useState(true);
    const validateUrl = (url) => {
        try {
            new URL(url);
            setIsValid(true);
            return true;
        } catch (error) {
            setIsValid(false);
            return false;
        }
    };

    return (
        <div className="request-panel">
            <div className="request-wrapper">
                <select
                    className="request-option"
                    onChange={(e) => setMethod(e.target.value)}
                    style={{
                        color: METHOD_COLORS[method] || METHOD_COLORS.GET,
                    }}
                >
                    {Object.entries(METHODS).map(([key, method]) => (
                        <option value={method} key={key}>
                            {method}
                        </option>
                    ))}
                </select>
                <div className="separator"></div>
                <input
                    required
                    type="url"
                    className={`url-bar ${isValid ? "" : "invalid"}`}
                    placeholder="Enter URL or paste text"
                    onChange={(e) => {
                        onUrlChange(e.target.value);
                        setIsValid(true);
                    }}
                    value={url}
                />
            </div>
            <button
                type="submit"
                className="send-button"
                onClick={(e) =>
                    e.preventDefault && validateUrl(url) && onSendClick()
                }
            >
                Send
            </button>
        </div>
    );
}
