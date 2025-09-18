import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExperience,
  addExperience,
  deleteExperience,
} from "../../action/experienceActions";
import { Button } from "@/components/ui/button";

const ExperienceAdminSection = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data: experiences,
    error,
    addLoading,
    addSuccess,
    deleteLoading,
    deleteSuccess,
  } = useSelector((state) => state.experience);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    description: "",
    technologies: "",
  });

  useEffect(() => {
    dispatch(fetchExperience());
  }, [dispatch, addSuccess, deleteSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    const expData = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      duration: formData.duration,
      description: formData.description.split("\n"),
      technologies: formData.technologies.split(",").map((t) => t.trim()),
    };
    dispatch(addExperience(expData));
    setFormData({
      title: "",
      company: "",
      location: "",
      duration: "",
      description: "",
      technologies: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      dispatch(deleteExperience(id));
    }
  };

  const inputClass =
    "w-full border border-border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <section className="max-w-6xl mx-auto p-6 bg-gray-900 rounded-xl shadow mt-10 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Experience Admin Section
      </h2>

      {/* Loading / Error States */}
      {loading && <p className="text-center text-gray-300">Loading experiences...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Experience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="p-5 bg-gray-800 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-sm text-gray-300">
                {exp.company} • {exp.location}
              </p>
              <p className="text-sm text-gray-400">{exp.duration}</p>
              <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                {exp.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p className="text-sm text-green-400 mt-2">
                Tech: {exp.technologies.join(", ")}
              </p>
            </div>
            <Button
              onClick={() => handleDelete(exp._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm self-start"
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        ))}
      </div>

      {/* Add Experience Form */}
      <form
        onSubmit={handleAddExperience}
        className="space-y-4 bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-2 text-center">Add New Experience</h3>

        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            name="title"
            className={inputClass}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Company</label>
          <input
            type="text"
            name="company"
            className={inputClass}
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Location</label>
          <input
            type="text"
            name="location"
            className={inputClass}
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Duration</label>
          <input
            type="text"
            name="duration"
            className={inputClass}
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Description (one per line)</label>
          <textarea
            name="description"
            rows={3}
            className={inputClass + " resize-none"}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm">Technologies (comma separated)</label>
          <input
            type="text"
            name="technologies"
            className={inputClass}
            value={formData.technologies}
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 px-6 py-2 rounded"
            disabled={addLoading}
          >
            {addLoading ? "Adding..." : "Add Experience"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ExperienceAdminSection;
