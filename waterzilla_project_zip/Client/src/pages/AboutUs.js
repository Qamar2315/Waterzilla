import React, { useEffect, useState } from 'react'
import axios from 'axios';

function AboutUs() {
  const [aboutUs, setAboutUs] = useState();
  useEffect(() => {
    axios.get(`http://localhost:8080/admin/aboutus`).then((res) => {
      setAboutUs(res.data.aboutus)
    })
  }, [])
  return (
    <>
      {
        aboutUs &&
        <div className="py-16 bg-grey-700">
          <div className="container m-auto px-6 text-zinc-200 md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <img className='border rounded' src={aboutUs.image} alt="image" loading="lazy" width={600} height={600} />
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl text-white font-bold md:text-4xl">AboutUs</h2>
                <p className="mt-6 text-grey-100">{aboutUs.aboutUs}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default AboutUs;