import { React, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function Student() {
  const [formData, setFormData] = useState({
    grid: "",
    name: "",
    course: "",
    phone: "",
    city: "",
  });

  const [students, setStudent] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("Student Data")) || [];
    setStudent(allStudents);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.grid || !formData.name || !formData.course || !formData.phone || !formData.city) {
      alert("Field required");
      return;
    }

    if (index !== -1) {
      const updateStudent = [...students];
      updateStudent[index] = formData;
      setStudent(updateStudent);
      localStorage.setItem("Student Data", JSON.stringify(updateStudent));
      setIndex(-1);
    } else {

      const newStudent = [...students, formData];
      setStudent(newStudent);
      localStorage.setItem("Student Data", JSON.stringify(newStudent));
    }

    setFormData({
      grid: "",
      name: "",
      course: "",
      phone: "",
      city: "",
    });
  };

  const handleDelete = (i) => {
    const allStudent = [...students];
    allStudent.splice(i, 1);
    setStudent(allStudent);
    localStorage.setItem("Student List", JSON.stringify(allStudent));
  };

  const handleUpdate = (i) => {
    setFormData(students[i]);
    setIndex(i);
  };

  return (
    <div className="h-160 bg-blue-200 flex items-center justify-center p-6 rounded-xl">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl p-6">
        <h2 className="text-2xl font-bold mb-4">Student Data List</h2>
        <form className="flex flex-wrap  mb-6" onSubmit={handleFormSubmit}>
          {["grid", "name", "course", "phone", "city"].map((field) => (
            <div key={field} className="flex-2 mx-1">
              <input type="text" name={field} value={formData[field]} placeholder={`Enter ${field}`}  onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400 outline-none"/>
            </div>
          ))}
          <div className="w-full">
            <button className="w-75 bg-teal-600 text-white mt-5 p-3 rounded-lg hover:bg-teal-700 transition">
              {index !== -1 ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-orange-100 text-left">
                <th className="px-6 py-3 text-sm font-semibold">Gr ID</th>
                <th className="px-6 py-3 text-sm font-semibold">Student Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Course Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Phone Number</th>
                <th className="px-6 py-3 text-sm font-semibold">City</th>
                <th className="px-6 py-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, i) => (
                  <tr key={i} className="border-b border-gray-300 last:border-none hover:bg-gray-50">
                    <td className="px-6 py-3">{student.grid}</td>
                    <td className="px-6 py-3">{student.name}</td>
                    <td className="px-6 py-3">{student.course}</td>
                    <td className="px-6 py-3">{student.phone}</td>
                    <td className="px-6 py-3">{student.city}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(i)}>
                        <MdDeleteForever size={20} />
                      </button>
                      <button className="text-blue-500 hover:text-blue-700" onClick={() => handleUpdate(i)}>
                        <FaPencilAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default Student;

