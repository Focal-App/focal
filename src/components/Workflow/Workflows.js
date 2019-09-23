import React from "react";
import Checkmark from "UI/Checkmark";

const Workflows = ({ workflows, apiHandler, setWorkflows }) => {
    return (
        <section className="client-workflow--container">
            <section className="client-workflows">
                {workflows.map(workflow => <Workflow key={workflow.uuid} workflow={workflow} />)}
            </section>
        </section>
    )
}

export default Workflows;

const Workflow = ({ workflow }) => {
    const { workflow_name, completed_tasks, tasks, uuid } = workflow
    return (
        <section className="workflow--container">
            <div className="client-page--header">
                <h1>{workflow_name}</h1>
                <h4>{completed_tasks} / {tasks.length} Tasks Completed</h4>
            </div>
            <section className="task--container">
                {tasks.map(task => <Task key={task.uuid} task={task} />)}
            </section>
        </section>
    )
}

const Task = ({ task }) => {
    const { is_completed, uuid, step } = task
    return (
        <div className="task">
            <Checkmark size="large" completed={is_completed} />
            <div className="task-label">
                <h3>{step}</h3>
            </div>
        </div>
    )
}