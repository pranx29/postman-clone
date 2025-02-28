import "./styles/Headers.css";
import TrashIcon from "./components/Icons/Trash";

export default function Headers({ headers, onHeadersUpdate, onHeaderDelete }) {
    return (
        <div className="headers">
            <div className="headers-header">
                <h4>Headers</h4>
            </div>
            <div className="headers-body">
                <table className="headers-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {headers.map((header, index) => (
                            <tr key={index}>
                                <td className="checkbox-td">
                                    {index !== headers.length - 1 && (
                                        <input
                                            type="checkbox"
                                            className="headers-checkbox"
                                            onChange={(e) =>
                                                onHeadersUpdate(
                                                    index,
                                                    "checked",
                                                    e.target.checked
                                                )
                                            }
                                            checked={header.checked}
                                        />
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="headers-input"
                                        placeholder={
                                            header.value || header.description
                                                ? ""
                                                : "Key"
                                        }
                                        value={header.key}
                                        onChange={(e) =>
                                            onHeadersUpdate(
                                                index,
                                                "key",
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="headers-input"
                                        placeholder={
                                            header.key || header.description
                                                ? ""
                                                : "Value"
                                        }
                                        value={header.value}
                                        onChange={(e) =>
                                            onHeadersUpdate(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="headers-input"
                                        placeholder={
                                            header.key || header.value
                                                ? ""
                                                : "Description"
                                        }
                                        value={header.description}
                                        onChange={(e) =>
                                            onHeadersUpdate(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                                {index !== headers.length - 1 && (
                                    <td className="delete-td">
                                        <button
                                            className="headers-delete-btn"
                                            onClick={() =>
                                                onHeaderDelete(index)
                                            }
                                        >
                                            <TrashIcon />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
