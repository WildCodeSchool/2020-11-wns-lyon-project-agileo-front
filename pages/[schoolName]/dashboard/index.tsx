import React from 'react'
import Link from 'next/link'
import GroupIcon from '@material-ui/icons/Group'
import SchoolIcon from '@material-ui/icons/School'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import ChatIcon from '@material-ui/icons/Chat'
import DateRangeIcon from '@material-ui/icons/DateRange'
import VoiceChatIcon from '@material-ui/icons/VoiceChat'

const Dashboard = () => {
  const links = [
    {
      id: 2,
      src: '',
      href: '/schoolName/dashboard/team',
      icon: <GroupIcon />,
      label: 'Team',
    },
    {
      id: 3,
      src: '',
      href: '/schoolName/dashboard/courses',
      icon: <SchoolIcon />,
      label: 'Courses',
    },
    {
      id: 4,
      src: '',
      href: '/schoolName/dashboard/file-manager',
      icon: <InsertDriveFileIcon />,

      label: 'File Manager',
    },
    {
      id: 5,
      src: '',
      href: '/schoolName/dashboard/chat',
      icon: <ChatIcon />,
      label: 'Chat',
    },
    {
      id: 6,
      src: '',
      href: '/schoolName/dashboard/calendar',
      icon: <DateRangeIcon />,

      label: 'Calendar',
    },
    {
      id: 7,
      src: '',
      href: '/schoolName/dashboard/meet',
      icon: <VoiceChatIcon />,
      label: 'Meet',
    },
  ]

  return (
    <>
      <div className="grid gap-4 grid-cols-3">
        {links.map(({ id, href, icon, label }) => (
          <Link key={id} href={href}>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 hover:shadow-lg cursor-pointer">
              <div className="flex-shrink-0">{icon}</div>
              <div>
                <div className="text-xl font-medium text-black">{label}</div>
                <p className="text-gray-500">You have a new message!</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Dashboard
