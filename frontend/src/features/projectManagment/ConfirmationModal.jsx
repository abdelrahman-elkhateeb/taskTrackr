/* eslint-disable react/prop-types */

const ConfirmationModal = ({ isOpen, onClose, onConfirm, missionTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold">Delete Mission</h2>
        <p>Are you sure you want to delete the mission &quot;{missionTitle}&quot;?</p>
        <div className="flex justify-end mt-4">
          <button className="btn btn-secondary mr-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
