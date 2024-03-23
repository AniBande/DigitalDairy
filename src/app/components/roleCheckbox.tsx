import PropTypes from "prop-types";

const RoleCheckbox = ({ onCheckboxChange, selectedRole }) => {
  return (
    <div className="flex gap-3">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedRole === "farmer" ? "selected" : ""
          } `}
        >
          <span className="label-text">Farmer </span>
          <input
            type="checkbox"
            className="checkbox border-slate-900 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white"
            checked={selectedRole === "farmer"}
            onChange={() => onCheckboxChange("farmer")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedRole === "manager" ? "selected" : ""
          }`}
        >
          <span className="label-text">Manager </span>
          <input
            type="checkbox"
            className="checkbox border-slate-900 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white"
            checked={selectedRole === "manager"}
            onChange={() => onCheckboxChange("manager")}
          />
        </label>
      </div>
    </div>
  );
};

RoleCheckbox.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  selectedRole: PropTypes.string.isRequired,
};

export default RoleCheckbox;
