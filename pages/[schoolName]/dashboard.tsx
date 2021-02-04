import React from 'react'
import Link from 'next/link'
import GroupIcon from '@material-ui/icons/Group'
import SchoolIcon from '@material-ui/icons/School'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import ChatIcon from '@material-ui/icons/Chat'
import DateRangeIcon from '@material-ui/icons/DateRange'

const Dashboard = () => {
  const links = [
    { href: '/schoolName/teams', icon: <GroupIcon />, label: 'Teams' },
    { href: '/schoolName/courses', icon: <SchoolIcon />, label: 'Courses' },
    { href: '/schoolName/drive', icon: <InsertDriveFileIcon />, label: 'Drive' },
    { href: '/schoolName/chat', icon: <ChatIcon />, label: 'Chat' },
    { href: '/schoolName/calendar', icon: <DateRangeIcon />, label: 'Calendar' },
  ]

  return (
    <>
      <div className="grid gap-4 grid-cols-3">
        {links.map(({ href, icon, label }, key) => (
          <Link key={key} href={href}>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 hover:shadow-lg cursor-pointer h-24 w-64">
              <div className="flex-shrink-0">{icon}</div>
              <div className="text-xl font-medium text-black">{label}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Dashboard
