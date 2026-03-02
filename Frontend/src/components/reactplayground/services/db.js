import localforage from 'localforage';

const projectStore = localforage.createInstance({
  name: 'react-playground-projects',
});

export async function getProject(projectName) {
  return projectStore.getItem(projectName);
}

export async function saveProject(projectName, files) {
  return projectStore.setItem(projectName, files);
}

export async function deleteProject(projectName) {
  return projectStore.removeItem(projectName);
}

export async function listProjects() {
  return projectStore.keys();
}
