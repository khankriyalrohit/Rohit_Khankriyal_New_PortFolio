import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, addProject, deleteProject } from "../../action/projectsActions";
import { Button } from "@/components/ui/button";

const ProjectsAdminSection = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data: projects,
    error,
    addLoading,
    addSuccess,
    deleteLoading,
    deleteSuccess,
  } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    fullDescription: "",
    technologies: "",
    liveLink: "",
    codeLink: "",
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch, addSuccess, deleteSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
    };
    dispatch(addProject(projectData));
    setFormData({
      title: "",
      image: "",
      description: "",
      fullDescription: "",
      technologies: "",
      liveLink: "",
      codeLink: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const inputClass =
    "w-full border border-border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <section className="max-w-6xl mx-auto p-6 bg-gray-900 rounded-xl shadow mt-10 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Projects Admin Section</h2>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-300">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="p-5 bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            {proj.image && (
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-semibold">{proj.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{proj.description}</p>
            <p className="text-sm text-gray-400 mt-2">{proj.fullDescription}</p>
            <p className="text-sm text-green-400 mt-2">
              Tech: {proj.technologies.join(", ")}
            </p>
            <div className="mt-3 space-x-2">
              {proj.liveLink && (
                <a
                  href={proj.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Live
                </a>
              )}
              {proj.codeLink && (
                <a
                  href={proj.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline text-sm"
                >
                  Code
                </a>
              )}
            </div>

            <Button
              onClick={() => handleDelete(proj._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm self-start"
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        ))}
      </div>

      {/* Add Project Form */}
      <form
        onSubmit={handleAddProject}
        className="space-y-4 bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-2 text-center">Add New Project</h3>

        {[
          { label: "Title", name: "title", type: "text", required: true },
          { label: "Image URL", name: "image", type: "text" },
          { label: "Short Description", name: "description", type: "text", required: true },
          { label: "Full Description", name: "fullDescription", type: "textarea" },
          { label: "Technologies (comma separated)", name: "technologies", type: "text" },
          { label: "Live Link", name: "liveLink", type: "text" },
          { label: "Code Link", name: "codeLink", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-sm">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows={3}
                className={inputClass + " resize-none"}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                className={inputClass}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </div>
        ))}

        <div className="text-center">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 px-6 py-2 rounded"
            disabled={addLoading}
          >
            {addLoading ? "Adding..." : "Add Project"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProjectsAdminSection;
