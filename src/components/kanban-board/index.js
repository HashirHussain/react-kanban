import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: "1", stage: 0 },
        { name: "2", stage: 0 },
      ],
      newTaskName: "",
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];

    this.handleAddNewTask = this.handleAddNewTask.bind(this);
    this.handleNewTaskNameChange = this.handleNewTaskNameChange.bind(this);
    this.handleOnNext = this.handleOnNext.bind(this);
    this.handleOnPrev = this.handleOnPrev.bind(this);
    this.handleOnTaskDelete = this.handleOnTaskDelete.bind(this);
  }

  handleNewTaskNameChange(e) {
    this.setState({ newTaskName: e.target.value });
  }

  handleAddNewTask(evt) {
    evt.preventDefault();
    if (this.state.newTaskName) {
      const allTasks = this.state.tasks;
      allTasks.push({
        name: this.state.newTaskName.trim(),
        stage: 0,
      });
      this.setState({
        tasks: allTasks,
        newTaskName: "",
      });
    }
  }

  handleOnNext(taskName, currentStage) {
    var allTasks = this.state.tasks;

    for (let i in allTasks) {
      if (allTasks[i].name === taskName) {
        allTasks[i].stage = ++currentStage;
        break;
      }
    }

    this.setState({
      tasks: allTasks,
    });
  }

  handleOnPrev(taskName, currentStage) {
    var allTasks = this.state.tasks;

    for (let i in allTasks) {
      if (allTasks[i].name === taskName) {
        allTasks[i].stage = --currentStage;
        break;
      }
    }

    this.setState({
      tasks: allTasks,
    });
  }

  handleOnTaskDelete(taskName) {
    const allTasks = this.state.tasks.filter((task) => task.name !== taskName);
    this.setState({
      tasks: allTasks,
    });
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <form name="formAddTask" onSubmit={this.handleAddNewTask}>
            <input
              name="newTaskName"
              value={this.state.newTaskName}
              onChange={this.handleNewTaskNameChange}
              id="create-task-input"
              type="text"
              className="large"
              placeholder="New task name"
              data-testid="create-task-input"
            />
            <button
              type="submit"
              className="ml-30"
              data-testid="create-task-button"
            >
              Create task
            </button>
          </form>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                className="icon-only x-small mx-2"
                                disabled={task.stage === 0}
                                onClick={this.handleOnPrev.bind(
                                  this,
                                  task.name,
                                  task.stage
                                )}
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                className="icon-only x-small mx-2"
                                disabled={
                                  task.stage === this.stagesNames.length - 1
                                }
                                onClick={this.handleOnNext.bind(
                                  this,
                                  task.name,
                                  task.stage
                                )}
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                              <button
                                className="icon-only danger x-small mx-2"
                                onClick={this.handleOnTaskDelete.bind(
                                  this,
                                  task.name
                                )}
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
