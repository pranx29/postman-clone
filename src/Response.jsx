import "./styles/Response.css";
import IntialImage from "./assets/images/intial-postman.svg";
import ErrorImage from "./assets/images/error-postman.png";
import Tabs from "./Tabs";
import { RESPONSE_TABS } from "./js/constants";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function Response({ response }) {
    const [tab, setTab] = useState(RESPONSE_TABS.BODY);
    const [language, setLanguage] = useState("");
    const [data, setData] = useState("");

    const getStatus = (response) => {
    
        if (!response || !response.status) {
            return "Error";
        } else if (response.status == 404) {
            return `${response.status} Not Found`;
        } else if (response.status == 500) {
            return `${response.status} Internal Server Error`;
        } else if (response.status == 200 || response.status == 201) {
            return `${response.status} OK`;
        } else {
            return `${response.status} Error`;
        }
    };

    useEffect(() => {
        if (response?.headers?.["content-type"]?.includes("text/html")) {
            setLanguage("html");
            setData(response.data);
        } else if (
            response?.headers?.["content-type"]?.includes("application/json")
        ) {
            setLanguage("json");
            setData(JSON.stringify(response.data, null, 2));
        } else {
            setLanguage("text");
            setData(response.data);
        }
    }, [response]);

    return (
        <div className="response-container">
            <div className="response-header">
                {response.status ? (
                    <>
                        <Tabs
                            tabs={RESPONSE_TABS}
                            setTab={setTab}
                            activeTab={tab}
                        />
                        <div className="response-details">
                            <div
                                className={
                                    "response-status" +
                                    (response?.status == 200 ||
                                    response?.status == 201
                                        ? " success"
                                        : " error")
                                }
                            >
                                <span>{getStatus(response)}</span>
                            </div>
                            <div className="seperator"></div>
                            <div className="response-time">
                                <span> {response.duration} ms</span>
                            </div>
                            <div className="seperator"></div>
                            <div className="response-size">
                                <span>{response.size}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <h3>Response</h3>
                )}
            </div>

            <div className="response-body">
                {!response && (
                    <div className="response-info">
                        <img
                            src={IntialImage}
                            alt="response-image"
                            className="response-image"
                        />
                        <p className="response-message">
                            Enter the URL and click Send to get a response
                        </p>
                    </div>
                )}

                {response.isAxiosError && !response.status && (
                    <div className="response-info">
                        <img
                            src={ErrorImage}
                            alt="response-image"
                            className="response-image"
                        />
                        <p className="response-message">
                            Could not send request
                        </p>
                        <div className="response-error">
                            {`Error: ${response.code}`}
                        </div>
                    </div>
                )}

                {response.status && (
                    <div className="response-data">
                        {tab === RESPONSE_TABS.BODY && (
                            <Editor
                                className="editor"
                                defaultLanguage="json"
                                value={data || "{}"}
                                language={language}
                                options={{
                                    readOnly: true,
                                    minimap: {
                                        enabled: false,
                                    },
                                    wordWrap: "on",
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        )}
                        {tab === RESPONSE_TABS.HEADERS && response.headers && (
                            <div className="response-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Key</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(response.headers).map(
                                            ([key, value]) => (
                                                <tr key={key}>
                                                    <td>{key}</td>
                                                    <td>{value}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
