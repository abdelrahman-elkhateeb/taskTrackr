import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import Cookies from "js-cookie";

const AddMember = ({ onAddMember }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("manager");
  const modalRef = useRef(null);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const { id } = useParams();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async () => {
    const userId = Cookies.get("userId");
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Projects/assign-role",
        {
          projectId: id,
          userEmail: email,
          role,
          userId
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        onAddMember({ email, role, user: response.data.user });
        setIsModalOpen(false);
        setEmail("");
        setRole("manager");
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <>
      <button
        className={`btn rounded-lg mb-4 ${
          darkMode
            ? "bg-dark-primary text-light-primary hover:bg-dark-pHover border-dark-primary hover:border-dark-pHover"
            : "bg-light-primary text-light-bg hover:bg-light-pHover border-light-primary hover:border-light-pHover"
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        Add Member
      </button>

      {isModalOpen && (
        <dialog id="add_member_modal" className="modal" open ref={modalRef}>
          <div
            className={`modal-box ${
              darkMode
                ? "bg-dark-bg text-dark-primary"
                : "bg-light-bg text-light-primary"
            }`}
          >
            <h3 className="font-bold text-lg">Add a new member</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-sm">
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input input-bordered w-full ${
                      darkMode
                        ? "bg-dark-primary text-light-primary"
                        : "bg-light-primary text-dark-primary"
                    }`}
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm">
                  Role:
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`select select-bordered w-full ${
                      darkMode
                        ? "bg-dark-primary text-light-primary"
                        : "bg-light-primary text-dark-primary"
                    }`}
                  >
                    <option value="manager">Manager</option>
                    <option value="contributor">Contributor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </label>
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className={`btn ${
                    darkMode
                      ? "bg-dark-primary text-dark-bg hover:bg-dark-bg hover:border-dark-primary hover:text-dark-primary"
                      : "bg-light-primary text-light-bg hover:bg-light-bg border-light-primary hover:border-light-primary hover:text-light-primary"
                  }`}
                  onClick={handleSubmit}
                >
                  Add Member
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`btn ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary hover:bg-dark-primary border-dark-primary hover:border-dark-primary hover:text-dark-bg"
                      : "bg-light-bg text-light-primary hover:bg-light-primary border-light-primary hover:border-light-primary hover:text-light-bg"
                  }`}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default AddMember;
