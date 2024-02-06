import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getStudentData, updateStudentProfile, deleteStudent } from '../utils/https/dashboard'
import { useSelector } from 'react-redux'

function Dashboard() {
  const user = useSelector(state => state.user.userInfo);
  const token = user.token
  const role = user.user_type
  const [studentData, setStudentData] = useState(null)
  const [studentDataIdx, setStudentDataIdx] = useState({})
  const [studentIdx, setStudentIdx] = useState(0)
  const [showUpdateStudent, setShowUpdateStudent] = useState(false)

  useEffect(() => {
    getStudentData(token)
    .then((res) => {
      console.log(res)
      setStudentData(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const editStudent = (id, no) => {
    setShowUpdateStudent(true);
    setStudentDataIdx(studentData[id])
    setStudentIdx(no)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setStudentDataIdx((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitUpdate = () => {
    const body = {
      nama: studentDataIdx.Full_name,
      alamat: studentDataIdx.Alamat,
      kelas: studentDataIdx.Kelas
    }
    updateStudentProfile(token, body, studentIdx)
    .then((res) => {
      console.log(res)
      setShowUpdateStudent(false)
    })
    .catch((err) => {
      console.log(err)
    })
    console.log(studentIdx)
  }

  const deleteStudentData = (id) => {
    deleteStudent(token, id)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (  
    <>
      <Navbar/>
      <main className='w-screen min-h-[90%] flex flex-col gap-2 font-semibold px-4 py-8 md:px-12 lg:px-24'>
        <div className='flex items-center gap-4'>
          <ion-icon name="location-outline"></ion-icon>
          <p>Location</p>
        </div>
        <p className='text-3xl'>{studentData && studentData[0].Lokasi}</p>
        <div className=''>
          <div className="text-sm font-medium text-secondary overflow-x-scroll">
            <table className='table-auto lg:table-fixed w-full text-base'>
              <thead>
                <tr className='border-b border-gray-500'>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Kelas</th>
                  <th>Program Les</th>
                  {role === "Head Office" && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                    {studentData && studentData.map((data, idx) => (
                      <tr
                        className={`border-b border-[#E8E8E84D]${
                          idx % 2 == 0 ? " bg-[#F9FAFB]" : ""
                        }`}
                        key={idx}
                      >
                        <td className="px-6 py-4 text-center">{idx + 1}</td>
                        <td className="text-center">{data.Full_name}</td>
                        <td className="text-center">{data.Alamat}</td>
                        <td className="text-center">{data.Kelas}</td>
                        <td className="text-center">{data.Program}</td>
                        {role === "Head Office" && 
                        <td className="text-center">
                        <div className="flex gap-y-2 items-center xl:flex-row xl:justify-center xl:gap-x-2">
                          <div
                            className="p-1 bg-black rounded-full cursor-pointer"
                          >
                            <button className='w-8 h-8 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center'
                            onClick={() => {editStudent(idx, data.No)}}>
                              <ion-icon name="pencil-outline"></ion-icon>
                            </button>
                          </div>
                          <div
                            className="p-1 bg-black rounded-full cursor-pointer"
                          >
                            <button className='w-8 h-8 bg-red-300 text-red-800 rounded-full flex items-center justify-center'
                            onClick={() => {deleteStudentData(data.No)}}>
                              <ion-icon name="trash-outline"></ion-icon>
                            </button>
                          </div>
                        </div>
                      </td>}
                      </tr>
                    ))}
                  </tbody>
            </table>
          </div>
        </div>
      </main>
      {showUpdateStudent && 
      <div
      className={`flex fixed inset-0 items-center justify-center z-50 outline-none modal w-full h-full bg-zinc-600/90`}
      id="myModals"
    >
      <div
        className="flex flex-col gap-7 modal-content bg-orange-200 p-8 rounded shadow-lg w-[300px] md:w-[500px] justify-center"
      >
        <p className="">Nama</p>
        <div className='w-full bg-white p-2 rounded-md'>
          <input type="text" name="Full_name" onChange={handleChange} value={studentDataIdx && studentDataIdx.Full_name} id="" className='outline-none'/>
        </div>
        <p className="">Kelas</p>
        <div className='w-full bg-white p-2 rounded-md'>
          <input type="text" name="Kelas" onChange={handleChange} value={studentDataIdx && studentDataIdx.Kelas} id="" className='outline-none'/>
        </div>
        <p className="">Alamat</p>
        <div className='w-full bg-white p-2 rounded-md'>
          <input type="text" name="Alamat" onChange={handleChange} value={studentDataIdx && studentDataIdx.Alamat} id="" className='outline-none'/>
        </div>
        <div className="flex justify-end items-center gap-4 text-black">
          <button
            className="flex-1 text-base bg-white border-2 border-solid border-gray-300 rounded-xl"
            id="submitModalBtn" onClick={submitUpdate}
          >
            Update
          </button>
          <button
            className="flex-1 text-base bg-orange-500 border-2 border-solid border-gray-300 rounded-xl"
            id="closeModalBtn" onClick={() => {setShowUpdateStudent(false)}}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>}
    </>
  )
}

export default Dashboard
