import { axiosInstance } from '../src/lib/axios';
import {create} from 'zustand';
import toast from 'react-hot-toast';
import { useAuthStore } from './useauthstore';

export const useChatStore = create((set, get) => ({

    allcontacts:[],
    chats:[],
    messages:[],

    activeTab:"chats", 
    selecteduser:null,

    isusersloading:false,
    ismessagesloading:false,
    isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled")) === true,


    tooggleSound:()=>{
        const current=get().isSoundEnabled;
        localStorage.setItem('isSoundEnabled',!current);
        set({isSoundEnabled:!current});
    },

    setActiveTab:(tabname)=>{
        set({activeTab:tabname});
    },

    setselecteduser:(user)=>{
        set({selecteduser:user});
    },

    getAllcontacts:async()=>{
        set({isusersloading:true});
        try {
            const res=await axiosInstance.get('/messages/contacts');
            set({allcontacts:res.data});

            
        } catch (error) {
            toast.error("Failed to load contacts");
            console.log("Error fetching contacts:",error);
        }finally{
            set({isusersloading:false});
        }
    },

    getMyChatPartners: async () => {
        set({ isusersloading: true });
        try {
          const res = await axiosInstance.get("/messages/chats");
          set({ chats: res.data });

        } catch (error) {
          toast.error("Failed to load chats");
          console.log("Error fetching chat partners:", error);
        } finally {
          set({ isusersloading: false });
        }
      }


      ,
      getMessagesByUserId:async(userId)=>{
        set({ismessagesloading:true});
        try {
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error("Failed to load messages");
            console.log("Error fetching messages:",error);
        }finally{
            set({ismessagesloading:false});
        }
      },

      sendMessage: async (messageData) => {
        const { selecteduser, messages } = get();
        const { authUser } = useAuthStore.getState();
    
       
    
        try {
          const res = await axiosInstance.post(`/messages/send/${selecteduser._id}`, messageData);
          set({ messages: messages.concat(res.data) });
        } catch (error) {
          // remove optimistic message on failure
          set({ messages: messages });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      },
    
      




}))