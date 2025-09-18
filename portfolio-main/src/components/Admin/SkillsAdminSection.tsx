import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills, updateSkills } from "@/action/skillsActions";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

const SkillsAdminSection = () => {
  const dispatch = useDispatch();
  const { data, loading, error, updateLoading, updateError, updateSuccess } =
    useSelector((state) => state.skills);

  const [skills, setSkills] = useState([]);
  const [placeholders1, setPlaceholders1] = useState([]);
  const [placeholders2, setPlaceholders2] = useState([]);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setSkills(data.skills || []);
      setPlaceholders1(data.placeholders1 || []);
      setPlaceholders2(data.placeholders2 || []);
    }
  }, [data]);

  const inputClass =
    "w-full border border-border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary";

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handlePlaceholderChange = (arrayName, index, value) => {
    if (arrayName === "placeholders1") {
      const newArr = [...placeholders1];
      newArr[index] = value;
      setPlaceholders1(newArr);
    } else {
      const newArr = [...placeholders2];
      newArr[index] = value;
      setPlaceholders2(newArr);
    }
  };

  const handleAddSkill = () => {
    if (skills.length >= 6) {
      alert("You can only add up to 6 skills.");
      return;
    }
    setSkills([...skills, { title: "", description: "", _id: uuidv4(), isNew: true }]);
  };

  const handleAddPlaceholder = (arrayName) => {
    if (arrayName === "placeholders1") {
      if (placeholders1.length >= 6) return alert("Max 6 placeholders allowed in list 1");
      setPlaceholders1([...placeholders1, ""]);
    } else {
      if (placeholders2.length >= 6) return alert("Max 6 placeholders allowed in list 2");
      setPlaceholders2([...placeholders2, ""]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Before sending to backend, strip _id for newly added ones
    const cleanSkills = skills.map((s) => {
      if (s.isNew) {
        const { _id, isNew, ...rest } = s;
        return rest;
      }
      return s;
    });

    dispatch(updateSkills({ skills: cleanSkills, placeholders1, placeholders2 }));
  };

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-xl shadow mt-10 space-y-6 text-white"
    >
      <h2 className="text-2xl font-bold text-center">Skills Section Admin</h2>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        {skills.map((skill, index) => (
          <div key={skill._id} className="space-y-2 p-2 bg-gray-800 rounded">
            <input
              type="text"
              value={skill.title}
              onChange={(e) => handleSkillChange(index, "title", e.target.value)}
              placeholder="Skill Title"
              className={inputClass}
            />
            <textarea
              value={skill.description}
              onChange={(e) =>
                handleSkillChange(index, "description", e.target.value)
              }
              placeholder="Skill Description"
              className={inputClass + " resize-none"}
              rows={3}
            />
          </div>
        ))}
        <Button type="button" onClick={handleAddSkill}>
          Add Skill
        </Button>
      </div>

      {/* Placeholders1 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Placeholders 1</h3>
        {placeholders1.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) =>
              handlePlaceholderChange("placeholders1", index, e.target.value)
            }
            placeholder="Enter URL"
            className={inputClass}
          />
        ))}
        <Button type="button" onClick={() => handleAddPlaceholder("placeholders1")}>
          Add Placeholder 1
        </Button>
      </div>

      {/* Placeholders2 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Placeholders 2</h3>
        {placeholders2.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) =>
              handlePlaceholderChange("placeholders2", index, e.target.value)
            }
            placeholder="Enter URL"
            className={inputClass}
          />
        ))}
        <Button type="button" onClick={() => handleAddPlaceholder("placeholders2")}>
          Add Placeholder 2
        </Button>
      </div>

      {/* Submit */}
      <div className="text-center">
        <Button type="submit" className="bg-primary hover:bg-primary/90 px-6 py-2 rounded">
          {updateLoading ? "Updating..." : "Update Skills"}
        </Button>
        {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
        {updateSuccess && <p className="text-green-500 mt-2">Skills updated successfully!</p>}
      </div>
    </form>
  );
};

export default SkillsAdminSection;
