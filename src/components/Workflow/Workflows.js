import React, { useState } from "react";
import Error from "UI/Error";
import Task from "components/Task/Task";

const Workflows = ({ workflows, apiHandler, setWorkflows }) => {
    const updateTask = (workflow_uuid, task) => {
        const workflowToUpdateIndex = workflows.findIndex(originalWorkflow => originalWorkflow.uuid === workflow_uuid);
        const taskToUpdate = workflows[workflowToUpdateIndex].tasks.findIndex(originalTask => originalTask.uuid === task.uuid);
        const workflow = workflows[workflowToUpdateIndex];
        workflow.tasks[taskToUpdate] = task;
        workflow.completed_tasks = task.is_completed ? workflow.completed_tasks + 1 : workflow.completed_tasks - 1;
        setWorkflows(Array.from(workflows))
    }
    return (
        <section className="client-workflow--container">
            <section className="client-workflows">
                {workflows.map(workflow => (
                    <Workflow
                        key={workflow.uuid}
                        workflow={workflow}
                        apiHandler={apiHandler}
                        updateTask={updateTask}
                    />
                ))}
            </section>
        </section>
    )
}

export default Workflows;

const Workflow = ({ workflow, apiHandler, updateTask }) => {
    const [errors, setErrors] = useState(false);
    const { workflow_name, completed_tasks, tasks } = workflow
    return (
        <section className="workflow--container">
            <div className="client-page--header">
                <h1>{workflow_name}</h1>
                <h4>{completed_tasks} / {tasks.length} Tasks Completed</h4>
            </div>
            
            <section className="task--container">
                { errors && <Error message={errors} />}
                {tasks.map(task => <Task 
                    key={task.uuid} 
                    task={task} 
                    apiHandler={apiHandler} 
                    updateTask={updateTask} 
                    setErrors={setErrors} 
                    workflow_uuid={workflow.uuid}
                />)}
            </section>
        </section>
    )
}

