import React, { useEffect } from 'react'
import { useChatStore } from '../../store/usechatstore';
import UsersLoadingSkeleton from './UserLodingSkeleton';// ✅ FIXED SPELLING
import NoChatsFound from './NoChatsFound';
import { useAuthStore } from '../../store/useauthstore';



const ChatsList = () => {
  const { getMyChatPartners, chats, isusersloading, setselecteduser,on } =
    useChatStore();
    const {onlineUsers}=useAuthStore(); 
 

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isusersloading) {
    return <UsersLoadingSkeleton />;
  }

  if (chats.length == 0) {
    return <NoChatsFound />;
  }
  console.log(chats);
  return (
    <>
      {Array.isArray(chats) &&chats.map((chat) => (
       

        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setselecteduser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online":"offline"}`}>
            <div className="w-12 h-12 rounded-full overflow-hidden">
  <img
    src={chat.profilepic && chat.profilepic.trim() !== ""
      ? chat.profilepic
      : "/avatar.png"}
    alt={chat.fullname}
    className="w-full h-full object-cover"
  />
</div>

            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullname}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsList;
