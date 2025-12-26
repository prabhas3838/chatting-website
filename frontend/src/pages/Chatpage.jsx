import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { useChatStore } from '../../store/usechatstore';
import ProileHeader from '../components/ProileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatsList from '../components/ChatsList';
import NoConversationPlaceHolder from '../components/NoConversationPlaceHolder';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';

const Chatpage = () => {
  const { activeTab, selecteduser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selecteduser ? <ChatContainer /> : <NoConversationPlaceHolder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default Chatpage;
