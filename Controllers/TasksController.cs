using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static List<TaskItem> _tasks = new List<TaskItem>
    {
        new TaskItem { Id = 1, Title = "Learn C#", IsCompleted = true },
        new TaskItem { Id = 2, Title = "Build Backend API", IsCompleted = false }
    };

    [HttpGet]
    public ActionResult<IEnumerable<TaskItem>> GetTasks()
    {
        return Ok(_tasks);
    }

    [HttpPost]
    public ActionResult<TaskItem> AddTask(TaskItem newTask)
    {
        newTask.Id = _tasks.Count > 0 ? _tasks.Max(t => t.Id) + 1 : 1;
        _tasks.Add(newTask);
        return Ok(newTask);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        task.IsCompleted = !task.IsCompleted; 
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        _tasks.Remove(task);
        return Ok();
    }
}