import React, { useEffect } from "react";
import "./Cubes.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "@/action/skillsActions";

const SkillBox = ({ images }) => {
  return (
    <div className="skillbox">
      {images.map((img, index) => (
        <div className={`skillbox-side skillbox-side-${index + 1}`} key={index}>
          <img src={img} alt={`Skill ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

const HexaSkills3D = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.skills);

  const placeholders1 = data?.placeholders1 || [];
  const placeholders2 = data?.placeholders2 || [];

  useEffect(() => {
    if (!data) dispatch(fetchSkills());
  }, [dispatch, data]);

  if (loading) return <p className="text-center text-muted-foreground">Loading skills...</p>;
  if (error) return <p className="text-center text-red-500">Error loading skills</p>;

  return (
    <div className="skills3d-container">
      {placeholders1.length > 0 && (
        <div className="skills3d-wrapper">
          <SkillBox images={placeholders1} />
        </div>
      )}
      {placeholders2.length > 0 && (
        <div className="skills3d-wrapper">
          <SkillBox images={placeholders2} />
        </div>
      )}
    </div>
  );
};

export default HexaSkills3D;
