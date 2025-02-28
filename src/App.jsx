import RequestPanel from "./RequestPanel";
import "./styles/App.css";
import { REQUEST_TABS, METHODS } from "./js/constants";
import Tabs from "./Tabs";
import Params from "./Params";
import Headers from "./Headers";
import Response from "./Response";
import { useState } from "react";
import api from "./js/api";

function App() {
    const [tab, setTab] = useState(REQUEST_TABS.PARAMS);
    const [url, setBaseUrl] = useState("");
    const [method, setMethod] = useState(METHODS.GET);
    const [params, setParams] = useState([
        { key: "", value: "", description: "", checked: true },
    ]);
    const [headers, setHeaders] = useState([
        { key: "", value: "", description: "", checked: true },
    ]);
    const [response, setResponse] = useState("");

    function constructUrl(currentBaseUrl, currentParams) {
        try {
            const url = new URL(currentBaseUrl);
            const urlWithoutQuery = `${url.origin}${url.pathname}`;
            const constructedUrl = new URL(urlWithoutQuery);

            currentParams.forEach((param) => {
                if ((param.checked && param.key) || param.value) {
                    constructedUrl.searchParams.append(param.key, param.value);
                }
            });

            return constructedUrl.toString();
        } catch (error) {
            const params = new URLSearchParams();
            currentParams.forEach((param) => {
                if ((param.checked && param.key) || param.value) {
                    params.append(param.key, param.value);
                }
            });

            const queryString = params.toString();
            return queryString ? `?${queryString}` : "";
        }
    }

    function parseUrl(url) {
        if (!url) {
            return {
                baseUrl: "",
                newParams: [
                    { key: "", value: "", description: "", checked: true },
                ],
            };
        }

        if (url.startsWith("?")) {
            const urlParams = new URLSearchParams(url);
            const newParams = [];

            urlParams.forEach((value, key) => {
                newParams.push({ key, value, description: "", checked: true });
            });

            if (newParams.length === 0) {
                newParams.push({
                    key: "",
                    value: "",
                    description: "",
                    checked: true,
                });
            }

            addEmptyParamRow(newParams.length - 1, newParams);

            return { baseUrl: url, newParams };
        }

        try {
            const parsedUrl = new URL(url);
            const newParams = [];

            parsedUrl.searchParams.forEach((value, key) => {
                newParams.push({ key, value, description: "", checked: true });
            });

            if (newParams.length === 0) {
                newParams.push({
                    key: "",
                    value: "",
                    description: "",
                    checked: true,
                });
            }

            addEmptyParamRow(newParams.length - 1, newParams);

            return {
                baseUrl: parsedUrl.origin + parsedUrl.pathname,
                newParams,
            };
        } catch (error) {
            return {
                baseUrl: url,
                newParams: [
                    { key: "", value: "", description: "", checked: true },
                ],
            };
        }
    }

    const updateParamsAndUrl = (newParams) => {
        setParams(newParams);
        const newUrl = constructUrl(url, newParams);
        setBaseUrl(newUrl);
    };

    const handleUrlChange = (newUrl) => {
        const { url, newParams } = parseUrl(newUrl);
        setBaseUrl(newUrl);
        setParams(newParams);
    };

    const updateParams = (index, field, value) => {
        let updatedParams = params.map((param, i) => {
            if (i === index) {
                return { ...param, [field]: value };
            }
            return param;
        });

        // Check if we need to add a new row
        addEmptyParamRow(index, updatedParams);
        updateParamsAndUrl(updatedParams);
    };

    function addEmptyParamRow(index, param) {
        const isLastRow = index === param.length - 1;
        const isLastRowEmpty =
            param[index].key === "" &&
            param[index].value === "" &&
            param[index].description === "";
        if (isLastRow && !isLastRowEmpty) {
            param.push({
                key: "",
                value: "",
                description: "",
                checked: true,
            });
        }
    }

    const deleteParam = (index) => {
        if (params.length > 1) {
            const updatedParams = params.filter((_, i) => i !== index);
            updateParamsAndUrl(updatedParams);
        }
    };

    const updateHeaders = (index, field, value) => {
        let updatedHeaders = headers.map((header, i) => {
            if (i === index) {
                return { ...header, [field]: value };
            }
            return header;
        });

        addEmptyHeaderRow(index, updatedHeaders);
        setHeaders(updatedHeaders);
    };

    const addEmptyHeaderRow = (index, header) => {
        const isLastRow = index === header.length - 1;
        const isLastRowEmpty =
            header[index].key === "" &&
            header[index].value === "" &&
            header[index].description === "";
        if (isLastRow && !isLastRowEmpty) {
            header.push({
                key: "",
                value: "",
                description: "",
                checked: true,
            });
        }
    };

    const deleteHeader = (index) => {
        if (headers.length > 1) {
            const updatedHeaders = headers.filter((_, i) => i !== index);
            setHeaders(updatedHeaders);
        }
    };

    const handleSendClick = () => {
        api({
            url: parseUrl(url).baseUrl,
            method: method,
            params: params.reduce((data, param) => {
                if (param.checked && param.key) {
                    data[param.key] = param.value;
                }
                return data;
            }, {}),
            headers: headers.reduce((data, header) => {
                if (header.checked && header.key) {
                    data[header.key] = header.value;
                }
                header = data;
                return data || {};
            }),
        })
            .catch((e) => e)
            .then((response) => {
                setResponse(response);
            });
    };

    return (
        <div className="container">
            <section className="request-section">
                <RequestPanel
                    method={method}
                    setMethod={setMethod}
                    url={url}
                    onUrlChange={handleUrlChange}
                    onSendClick={handleSendClick}
                />

                <Tabs tabs={REQUEST_TABS} activeTab={tab} setTab={setTab} />

                {tab === REQUEST_TABS.PARAMS && (
                    <Params
                        onParamsUpdate={updateParams}
                        onParamDelete={deleteParam}
                        params={params}
                    />
                )}

                {tab === REQUEST_TABS.HEADERS && (
                    <Headers
                        headers={headers}
                        onHeaderDelete={deleteHeader}
                        onHeadersUpdate={updateHeaders}
                    />
                )}
            </section>
            <section className="response-section">
                <Response response={response} />
            </section>
        </div>
    );
}

export default App;
