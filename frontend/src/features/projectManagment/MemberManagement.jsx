/* eslint-disable react/prop-types */
import DisplayMembers from "./DisplayMembers";
import AddMemberModal from "./AddMemberModal";

const MemberManagement = ({
  members,
  handleDeleteMember,
  isModalOpen,
  setIsModalOpen,
  email,
  setEmail,
  role,
  setRole,
  loading,
  handleSubmit,
  error,
  darkMode,
  handleUpdateRole,
  setIsEditModalOpen,
  isEditModalOpen,
  auth,
}) => {
  return (
    <>
      <button
        className={`btn rounded-lg my-4 ${
          darkMode
            ? "bg-dark-primary text-dark-bg border-dark-primary hover:border-dark-primary hover:bg-dark-bg hover:text-dark-primary"
            : "bg-light-primary text-light-bg border-light-primary hover:border-light-primary hover:bg-light-bg hover:text-light-primary"
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        Add Member
      </button>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={email}
        setEmail={setEmail}
        role={role}
        setRole={setRole}
        loading={loading}
        onSubmit={handleSubmit}
        error={error}
        darkMode={darkMode}
      />

      <DisplayMembers
        initialMembers={members}
        onDeleteMember={handleDeleteMember}
        handleUpdateRole={handleUpdateRole}
        setIsEditModalOpen={setIsEditModalOpen}
        isEditModalOpen={isEditModalOpen}
        auth={auth}
      />
    </>
  );
};

export default MemberManagement;
