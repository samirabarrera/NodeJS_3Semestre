import chalk from 'chalk';
const filePath = 'tasks.json';

this.addTask = function (title) {
    const tasksData = this.task();
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    tasksData.tasks.push(newTask);
    this.saveTasks(tasksData);
    console.log(chalk.blue(addTask))
  };

this.listTasks = function () {
    const tasksData = this.task();
    if (tasksData.tasks.length === 0) {
      console.log('No hay tareas registradas.');
    } else {
      tasksData.tasks.forEach((task, index) => {
        console.log(chalk.underline(`${index + 1}. ${task.title} [${task.completed ? 'Completada' : 'Pendiente'}]`));
      });
    }
  };

this.completeTask = function (taskId) {
    const tasksData = this.task();
    const task = tasksData.tasks[taskId - 1];
    if (task) {
      task.completed = true;
      this.saveTasks(tasksData);
      console.log(chalk.green('Tarea marcada como completada.'));
    } else {
      console.log(chalk.red('Número de tarea no válido'));
    }
  };

  this.deleteTask = function (taskId) {
    const tasksData = this.task();
    if (taskId > 0 && taskId <= tasksData.tasks.length) {
      tasksData.tasks.splice(taskId - 1, 1);
      this.saveTasks(tasksData);
      console.log(chalk.strikethrough('Tarea eliminada correctamente.'));
    }
  };

function showMenu() {
    console.log(chalk.bgMagenta('Welcome to my Task Mager!'));
    console.log(chalk.blue('1. Agregar tarea'));
    console.log(chalk.green('2. Listar tareas'));
    console.log(chalk.underline('3. Marcar tarea como completada'));
    console.log(chalk.strikethrough('4. Eliminar tarea'));
}