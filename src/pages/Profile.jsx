import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import { getStudentProfile, updateStudentProfile } from '../utils/https/profile'
import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector(state => state.user.userInfo)
  const token = user.token

  const [dataProfile, setDataProfile] = useState({
    data: null
  })
  const [update, setUpdate] = useState(false)

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target;
    setDataProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUpdate(true)
  };

  useEffect(() => {
    getStudentProfile(token)
    .then((res) => {
      // console.log(res)
      setDataProfile(res.data.data[0])
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  const submitUpdate = () => {
    if (!update) {
      return null
    }
    const {nama, kelas, alamat} = dataProfile
    const body = {
      nama: nama,
      kelas: kelas,
      alamat: alamat
    }
    updateStudentProfile(token, body)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    setUpdate(false)
  }
  return (
    <>
      <Navbar/>
      <main className='w-screen flex flex-col gap-2 font-semibold px-4 py-8 md:px-12 lg:px-24'>
        <div className='flex items-center gap-4'>
          <ion-icon name="book-outline"></ion-icon>
          <p>Selamat Datang</p>
        </div>
        <p className='text-3xl'>{dataProfile && dataProfile.nama}</p>
        <div className='bg-gray-200 px-12 py-8 rounded-lg'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
              <p>Nama</p>
              <div className='bg-white w-full p-2 rounded-md'>
                <input type="text" name="nama" onChange={handleChange} id="" value={dataProfile && dataProfile.nama} className='outline-none w-full'/>
              </div>
              <p>Kelas</p>
              <div className='bg-white w-full p-2 rounded-md'>
                <input type="number" name="kelas" onChange={handleChange} id="" value={dataProfile && dataProfile.kelas}  className='outline-none w-full'/>
              </div>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
              <p>Alamat</p>
              <div className='bg-white w-full p-2 rounded-md'>
                <input type="text" name="alamat" id="" onChange={handleChange} value={dataProfile && dataProfile.alamat} className='outline-none w-full' />
              </div>
              <p>Program</p>
              <div className='bg-white w-full p-2 rounded-md'>
                <input type="text" name="Program" id="" value={dataProfile && `${dataProfile.Program} (${dataProfile.Lokasi})`} className='outline-none w-full' disabled/>
              </div>
            </div>
          </div>
          <button className={`p-2 w-full rounded-lg mt-8 ${update ? "bg-orange-400 cursor-pointer" : "bg-white"}`} onClick={submitUpdate}>Update Profile</button>
        </div>
      </main>
    </>
  )
}

export default Profile
