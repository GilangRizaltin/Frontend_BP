import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar';
import { registerStudent, getBranchOfficeProgram } from '../utils/https/home';

function Home() {
  const [selectedProgram, setSelectedProgram] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState(1);
  const [program, setProgram] = useState([])

  const submitRegister = (e) => {
    e.preventDefault()
    const body = {
      email: e.target.email.value,
      password: e.target.email.value,
      user_type: "Student",
      full_name: e.target.full_name.value,
      address: e.target.address.value,
      class: e.target.class.value,
      program: selectedProgram,
    };
    registerStudent(body)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getBranchOfficeProgram(selectedBranch)
    .then((res) => {
      console.log(res)
      setProgram(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [selectedBranch])

  const onChangeOffice = (e) => {
    e.preventDefault()
    setSelectedBranch(e.target.value)
  }

  const onChangeProgram = (e) => {
    e.preventDefault()
    setSelectedProgram(e.target.value)
  }
  return (
    <>
      <Navbar/>
      <main className='w-screen flex flex-col gap-2 font-semibold px-4 py-8 md:px-12 lg:px-24'>
        <form onSubmit={submitRegister} className='bg-gray-200 px-12 py-8 rounded-lg flex flex-col gap-4'>
          <p>Email</p>
          <div className='w-full p-2 bg-white rounded-md'>
            <input type="text" name="email" id="" className='outline-none w-full'/>
          </div>
          <p>Password</p>
          <div className='w-full p-2 bg-white rounded-md'>
            <input type="text" name="password" id="" className='outline-none w-full'/>
          </div>
          <p>Nama</p>
          <div className='w-full p-2 bg-white rounded-md'>
            <input type="text" name="full_name" id="" className='outline-none w-full'/>
          </div>
          <p>Kelas</p>
          <div className='w-full p-2 bg-white rounded-md'>
            <input type="text" name="class" id="" className='outline-none w-full'/>
          </div>
          <p>Alamat</p>
          <div className='w-full p-2 bg-white rounded-md'>
            <input type="text" name="address" id="" className='outline-none w-full'/>
          </div>
          <p>Cabang</p>
          <div>
            <select name="" id="" className='px-4 py-2 rounded-md' onChange={onChangeOffice}>
              <option value="1">Bogor</option>
              <option value="2">Padang</option>
              <option value="3">Semarang</option>
              <option value="4">Pekanbaru</option>
              <option value="5">Jakarta</option>
              <option value="6">Surabaya</option>
            </select>
          </div>
          <p>Program</p>
          <div>
            <select name="" id="" className='px-4 py-2 rounded-md' onChange={onChangeProgram}>Cabang
              {program && program.map((data, idx) =>  (
                <option value={data.id}>{data.nama_program}, Rp {data.biaya_program}</option>
              ))}
            </select>
          </div>
          <button type='submit' className='bg-orange-400 w-full p-2 rounded-md cursor-pointer'>Daftar</button>
        </form>
      </main>
    </>
  )
}

export default Home
