import "./styles/Params.css";
import TrashIcon from "./components/Icons/Trash";

export default function Params({ params, onParamsUpdate, onParamDelete }) {

    return (
        <div className="params">
            <div className="params-header">
                <h4>Query Params</h4>
            </div>
            <div className="params-body">
                <table className="params-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {params.map((param, index) => (
                            <tr key={index}>
                                <td className="checkbox-td">
                                    {index !== params.length - 1 && (
                                        <input
                                            type="checkbox"
                                            className="params-checkbox"
                                            onChange={(e) =>
                                                onParamsUpdate(
                                                    index,
                                                    "checked",
                                                    e.target.checked
                                                )
                                            }
                                            checked={param.checked}
                                        />
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="params-input"
                                        placeholder={
                                            param.value || param.description
                                                ? ""
                                                : "Key"
                                        }
                                        value={param.key}
                                        onChange={(e) =>
                                            onParamsUpdate(
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
                                        className="params-input"
                                        placeholder={
                                            param.key || param.description
                                                ? ""
                                                : "Value"
                                        }
                                        value={param.value}
                                        onChange={(e) =>
                                            onParamsUpdate(
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
                                        className="params-input"
                                        placeholder={
                                            param.key || param.value
                                                ? ""
                                                : "Description"
                                        }
                                        value={param.description}
                                        onChange={(e) =>
                                            onParamsUpdate(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                                {index !== params.length - 1 && (
                                    <td className="delete-td">
                                        <button
                                            className="params-delete-btn"
                                            onClick={() => onParamDelete(index)}
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
