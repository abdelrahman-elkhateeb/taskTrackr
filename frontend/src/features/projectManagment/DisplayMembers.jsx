import { useState, useRef, useEffect } from "react";
import { UserRoundCog, CircleX } from 'lucide-react';
import { useSelector } from "react-redux";

const DisplayMembers = ({ projectId, members, onDeleteMember }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const modalRef = useRef(null);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (memberToDelete) {
      onDeleteMember(memberToDelete);
      setIsModalOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <h2 className="mt-4 text-xl">Members:</h2>
      <ul className="w-full">
        {members.length === 0 ? (
          <li>No members to display.</li>
        ) : (
          members.map((member) => (
            <li key={member.user._id} className="py-2 flex flex-row justify-between">
              <div><strong>{member.role}</strong></div>
              <div>{member.user.email}</div>
              <div className="flex flex-row">
                <UserRoundCog />
                <CircleX
                  className="text-red-500 cursor-pointer ml-3"
                  onClick={() => handleDeleteClick(member)}
                />
              </div>
            </li>
          ))
        )}
      </ul>

      {isModalOpen && (
        <dialog id="delete_member_modal" className="modal" open ref={modalRef}>
          <div className={`modal-box ${darkMode ? "bg-dark-bg text-dark-primary" : "bg-light-bg text-light-primary"}`}>
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this member?
            </h3>
            <p className="py-4">This action cannot be undone.</p>
            <div className="flex justify-end">
              <button onClick={handleDelete} className={`btn mr-2 ${darkMode ? "bg-dark-bg" : "bg-light-bg"}`}>Delete</button>
              <button onClick={() => setIsModalOpen(false)} className={`btn ${darkMode ? "bg-dark-primary" : "bg-light-primary"}`}>Cancel</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DisplayMembers;
