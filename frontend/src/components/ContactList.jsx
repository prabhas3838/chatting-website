import React, { use } from 'react'
import { useChatStore } from '../../store/usechatstore'
import UsersLoadingSkeleton from './UserLodingSkeleton';
import { useEffect } from 'react'
import { useAuthStore } from '../../store/useauthstore';;

const ContactList = () => {
  const {getAllcontacts,allcontacts, setselecteduser,isusersloading}=useChatStore();
  const {onlineUsers}=useAuthStore(); 

  useEffect(() => {
    getAllcontacts();
  }, [getAllcontacts]);

  if (isusersloading) {
    return <UsersLoadingSkeleton></UsersLoadingSkeleton>
  }

  
  return (
    <>
    {allcontacts.map((contact) => (
      <div
        key={contact._id}
        className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
        onClick={() => setselecteduser(contact)}
      >
        <div className="flex items-center gap-3">
          <div className={`avatar ${onlineUsers.includes(contact._id) ? "online":"offline"}`}>
            <div className="size-12 rounded-full">
              <img src={contact.profilepic || "/avatar.png"} />
            </div>
          </div>
          <h4 className="text-slate-200 font-medium">{contact.fullname}</h4>
        </div>
      </div>
    ))}
  </>
  )
}

export default ContactList
