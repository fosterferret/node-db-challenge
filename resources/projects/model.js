const db = require("../../data/dbConfig");

function getProjects() {
  return db("projects");
}

function getProjectTasks(id) {
  return db("tasks")
    .select("id", "description", "notes", "completed")
    .where({ project_id: id });
}

function getProjectResources(project_id) {
  return db("resources as r")
    .join("project-resources as pr", "pr.resource_id", "r.id")
    .select("r.id", "r.resource_name", "r.description")
    .where({ project_id });
}

async function getProjectById(id) {
  const promises = [
    db("projects")
      .where({ id })
      .first(),
    getProjectTasks(id),
    getProjectResources(id)
  ];

  let results = await Promise.all(promises);
  const [project, tasks, resources] = results;
  return { ...project, tasks, resources };
}

async function addProject(project) {
  const ids = await db("projects").insert(project);
  return await db("projects").where({ id: ids[0] });
}

module.exports = {
  getProjects,
  addProject,
  getProjectTasks,
  getProjectResources,
  getProjectById
};
