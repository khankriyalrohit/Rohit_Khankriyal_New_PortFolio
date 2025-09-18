import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero, updateHero } from "@/action/heroActions";
import { Button } from "@/components/ui/button";

const HeroAdminForm = () => {
  const dispatch = useDispatch();
  const { data, loading, error, updateLoading, updateError, updateSuccess } = useSelector(
    (state) => state.hero
  );

  const [texts, setTexts] = useState(["", "", ""]);
  const [summary, setSummary] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setTexts(data.texts || ["", "", ""]);
      setSummary(data.summary || "");
      setAbout(data.about || "");
    }
  }, [data]);

  const handleTextChange = (index, value) => {
    const updatedTexts = [...texts];
    updatedTexts[index] = value;
    setTexts(updatedTexts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateHero({ texts, summary, about }));
  };

  const inputClass =
    "w-full border border-border rounded px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 shadow rounded-lg mt-10 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Hero Section Admin</h2>

      {/* Loading/Error/Success */}
      {loading && <p className="text-center text-gray-300">Loading data...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {updateError && <p className="text-center text-red-500 mb-4">{updateError}</p>}
      {updateSuccess && <p className="text-center text-green-500 mb-4">Hero updated successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Texts array inputs */}
        {texts.map((text, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold mb-1">Text {index + 1}</h3>
            <input
              type="text"
              value={text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              className={inputClass}
              placeholder={`Text ${index + 1}`}
            />
          </div>
        ))}

        {/* Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Summary</h3>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={inputClass + " resize-none"}
            rows={3}
            placeholder="Enter summary"
          />
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-1">About</h3>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className={inputClass + " resize-none"}
            rows={5}
            placeholder="Enter about text"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 px-6 py-2 rounded"
          >
            {updateLoading ? "Updating..." : "Update Hero"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeroAdminForm;
