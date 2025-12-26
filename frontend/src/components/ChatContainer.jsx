import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/usechatstore";
import { useAuthStore } from "../../store/useauthstore";
import ChatHeader from "./ChatHeader";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const {
    selecteduser,
    getMessagesByUserId,
    messages,
    ismessagesloading,
  } = useChatStore();

  const { authUser } = useAuthStore();

  // 🔽 Scroll reference
  const messageEndRef = useRef(null);

  // 🔽 Fetch messages when user changes
  useEffect(() => {
    if (selecteduser?._id) {
      getMessagesByUserId(selecteduser._id);
    }
  }, [selecteduser, getMessagesByUserId]);

  // 🔽 Auto-scroll when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔽 No user selected
  if (!selecteduser) return null;

  const hasMessages = Array.isArray(messages) && messages.length > 0;

  return (
    <>
      {/* HEADER */}
      <ChatHeader />

      {/* MESSAGE AREA */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {ismessagesloading ? (
          <MessagesLoadingSkeleton />
        ) : hasMessages ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isMine =
                msg.senderId?.toString() === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${
                    isMine ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble relative ${
                      isMine
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {/* IMAGE MESSAGE */}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover mb-2"
                      />
                    )}

                    {/* TEXT MESSAGE */}
                    {msg.text && <p>{msg.text}</p>}

                    {/* TIMESTAMP */}
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* 👇 Scroll anchor */}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selecteduser.fullname} />
        )}
      </div>

      {/* INPUT */}
      <MessageInput />
    </>
  );
};

export default ChatContainer;
