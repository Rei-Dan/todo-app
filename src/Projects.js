export default function createNewProject(title) {
  class Project {
    constructor(title) {
      this.title = title;
    }
  }
  return new Project(title);
}
