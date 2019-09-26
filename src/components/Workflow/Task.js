import React, { useState } from "react";
import Checkmark from "UI/Checkmark";
import DataAdapter from "utilities/api/dataAdapter";
import Endpoints from "utilities/api/apiEndpoint";
import Loader from "UI/Loader";
import "./Task.scss";

const Task = ({ task, setErrors, apiHandler, updateTask, workflow_uuid }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const values = Object.assign({}, task, { is_completed: !task.is_completed });
        const transformedValues = DataAdapter.toApiReadyClient(values);
        const { data, errors } = await apiHandler.put(Endpoints.updateTask(task.uuid), transformedValues);
        setLoading(false);
        if (data) {
            updateTask(workflow_uuid, DataAdapter.toTaskModel(data))
        } else {
            setErrors(errors);
        }
    }

    const { is_completed, step } = task;
  
    return (
        <div className="task">
            <div data-testid="todo-checkmark" className="checkmark-container" onClick={() => handleClick()} >
                {
                    loading 
                    ? <Loader size="small" />
                    : <Checkmark size="large" completed={is_completed} />
                }
            </div>

            <div className={`task-label ${is_completed ? 'task-label--complete' : 'task-label--incomplete'}`}>
                <h3>{step}</h3>
            </div>
        </div>
    )
}

export default Task;