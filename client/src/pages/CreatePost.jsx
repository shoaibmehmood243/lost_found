import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { FormField, Loader } from '../components';
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    description: ''
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=> {
    setForm({ ...form, [e.target.name]: e.target.value})
  }
  // const imageUpload = async(file)=> {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     let data = "";
  //     await axios.post('https://api.cloudinary.com/v1_1/ddw7rsky1/image/upload', formData).then((res)=> {
  //       data = res.data["secure_url"];
  //     })
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //     alert(error);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.name && form.rollNumber) {
      setLoading(true);
      try {
        // const img = await imageUpload(form.photo);
        // console.log(img);
        const response = await fetch('https://lost-found-nine.vercel.app/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ form: {name: form.name, rollNumber: form.rollNumber, description: form.description} })
        })

        await response.json();
        navigate("/");
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter prompt and image.");
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-start text-[#222328] text-[32px]">Create</h1>
      </div>

      <form className="mt-16 max-w-3xl" encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Your Roll No"
            type="text"
            name="rollNumber"
            placeholder="Ex., Fall-18/BSCS/123"
            value={form.rollNumber}
            handleChange={handleChange}
          />
          <div>
            <label className='mb-2 block'>Decsription</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder='Provide description of the thing lost' rows={5} className="border border-gray-300 bg-transparent rounded-lg p-3 m-0 w-full focus:ring-[#6469ff] focus:border-[#6469ff] outline-none" />
          </div>

          {/* <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={URL.createObjectURL(form.photo)}
                alt={form.name}
                className="w-full h-full object-contain"
              />
            ) : (<>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name=""
                onChange={(e) => setForm({ ...form, photo: e.target.files[0]})}
              />
              <label className="file" htmlFor="file">
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              </label>
            </>)}
          </div> */}
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Provide all of the details to find the lost thing by sharing it to the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost;
