import React from 'react'
import { FaFacebookSquare, FaMapMarkedAlt, FaImages, FaInstagram, FaCalendarCheck, FaPhoneSquare } from 'react-icons/fa'
import { MdMail, MdOndemandVideo, MdRateReview } from 'react-icons/md'

type Types = {
  name: string
  size?: string
}

const GetIcon = ({ name, size = `20` }: Types) => {
  switch (name) {
    case `MdRateReview`:
      return <MdRateReview size={size} />
    case `MdOndemandVideo`:
      return <MdOndemandVideo size={size} />
    case `MdMail`:
      return <MdMail size={size} />
    case `FaFacebookSquare`:
      return <FaFacebookSquare size={size} />
    case `FaMapMarkedAlt`:
      return <FaMapMarkedAlt size={size} />
    case `FaImages`:
      return <FaImages size={size} />
    case `FaInstagram`:
      return <FaInstagram size={size} />
    case `FaCalendarCheck`:
      return <FaCalendarCheck size={size} />
    case `FaPhoneSquare`:
      return <FaPhoneSquare size={size} />
    default:
      return null
  }
}

export default GetIcon
