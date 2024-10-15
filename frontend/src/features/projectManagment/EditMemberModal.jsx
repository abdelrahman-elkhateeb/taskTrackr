/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditMemberModal = ({ isOpen, member, onClose, onUpdateRole }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [role, setRole] = useState("");

  useEffect(() => {
    if (member) {
      setRole(member.role);
    }
  }, [member]);

  const handleSave = () => {
    if (member) {
      const updatedMember = {
        projectId: member.projectId, 
        userEmail: member.user?.email, 
        newRole: role,
        userId: getUserIdFromCookies(), 
      };
      onUpdateRole(updatedMember); 
      onClose();
    }
  };

  const getUserIdFromCookies = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; userId=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; 
  };

  if (!isOpen) return null;

  return (
    <dialog id="edit_member_modal" className="modal" open>
      <div
        className={`modal-box ${
          darkMode ? "bg-dark-bg text-dark-primary" : "bg-light-bg text-light-primary"
        }`}
      >
        <h3 className="font-bold text-lg">Edit Member</h3>
        <div className="py-4">
          <p>
            <strong>Email:</strong> {member.user?.email || "Email not available"}
          </p>
          <div>
            <label htmlFor="role" className="block">
              <strong>Role:</strong>
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select w-full"
            >
              <option value="manager">Manager</option>
              <option value="contributor">Contributor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`btn mr-2 ${darkMode ? "bg-dark-bg" : "bg-light-bg"}`}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className={`btn ${darkMode ? "bg-dark-primary" : "bg-light-primary"}`}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditMemberModal;
