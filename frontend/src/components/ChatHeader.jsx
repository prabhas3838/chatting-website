import React from 'react'
import { useChatStore } from '../../store/usechatstore';
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selecteduser, setselecteduser } = useChatStore();

  if (!selecteduser) return null;

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6">
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={
                selecteduser.profilepic && selecteduser.profilepic.trim() !== ""
                  ? selecteduser.profilepic
                  : "/avatar.png"
              }
              alt={selecteduser.fullname}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">
            {selecteduser.fullname}
          </h3>
          <p className="text-slate-400 text-sm">Online</p>
        </div>
      </div>

      <button onClick={() => setselecteduser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
