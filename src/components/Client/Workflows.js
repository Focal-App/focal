import React from "react";
import { Checkbox } from "components/UI/FormParts";

const Workflows = ({ workflows, apiHandler, setWorkflows }) => {
    return (
        <section className="client-workflow--container">
            <section className="client-workflows">
                {workflows.map(workflow => <Workflow workflow={workflow} />)}
            </section>
        </section>
    )
}

export default Workflows;

const Workflow = ({ workflow }) => {
    const { workflow_name, order, completed_tasks, incomplete_tasks, tasks, uuid } = workflow
    return (
        <section className="workflow--container">
            <div key={uuid} className="client-page--header">
                <h1>{workflow_name}</h1>
                <h4>{completed_tasks} / {tasks.length} Tasks Completed</h4>
            </div>
            <section className="task--container">
                {tasks.map(task => <Task task={task} />)}
            </section>
        </section>
    )
}

const Task = ({ task }) => {
    const { is_completed, uuid, step } = task
    return (
        <div key={uuid} className="task">
            <input type="checkbox" checked={is_completed} />
            <div className="task-label">
                <h3>{step}</h3>
            </div>
        </div>
    )
}