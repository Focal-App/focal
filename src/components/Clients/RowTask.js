import React, { useState } from "react";
import Endpoints from "utilities/api/apiEndpoint";
import DataAdapter from "utilities/api/dataAdapter";
import Checkmark from "UI/Checkmark";
import Loader from "UI/Loader";

const RowTask = ({ task, apiHandler, setClientsRefetch, setErrors }) => {
    const {
        is_completed ,
        step,
        category
    } = task;

    const [success, setSuccess] = useState(false);
    const [fetchNext, setFetchNext] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(is_completed);

    const handleClick = async () => {
        setLoading(true);
        const values = Object.assign({}, task, { is_completed: !task.is_completed });
        const transformedValues = DataAdapter.toApiReadyClient(values);
        const { data, errors } = await apiHandler.put(Endpoints.updateTask(task.uuid), transformedValues);
        setLoading(false);
        if (data) {
            setIsCompleted(true);
            setSuccess(true);
            setTimeout(() => {
                setFetchNext(true)
            }, 800)
        } else {
            setErrors(errors);
        }
    }

    if (success && fetchNext) {
        setClientsRefetch(true)
    }
    return (
        <div data-testid="todo-checkmark" className={`clients--task`} onClick={() => handleClick()}>
            {loading
                ? <Loader size="small" />
                : <Checkmark size="small" completed={isCompleted} />
            }
            <div className={`task-label ${success && `clients--task-completed`}`}>
                <div className="client--category">{category}</div>
                <div className="client--stage">{step}</div>
            </div>
        </div>
    )
}

export default RowTask;