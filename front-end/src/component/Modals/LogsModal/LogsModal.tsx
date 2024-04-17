import React, { useEffect, useState } from 'react'
import {motion, AnimatePresence} from 'framer-motion'

import "./LogsModal.css"
import axios from 'axios';

function LogsModal({show, room, onCancel}) {
    if (!show) {
      return null;
    }


    const [banned, setBanned] = useState([]);

    useEffect(() => {
        if (room.members) {
            const bannedMembers = room.members.filter(member => member.status === 'banned');
            setBanned(bannedMembers);
        }
    }, [room]);
    banned.length > 0 && console.log(banned);
    const backdrop = {
        visible : {opacity: 1},
        hidden: {opacity: 0}
    }

    const modal = {
        hidden :{
            y :"-100vh",
            opacity: 0 },
        visible: {
            y : "200px",
            opacity: 1,
            transition : {delay: 0.5}
        }
    }

    const handleUnban = (friendId) => {
        console.log("clicked = ",friendId)
        axios.post(`${import.meta.env.VITE_url_back}/api/room/unbanuser`,{id: friendId, name: room.name}, {withCredentials:true});
    
    }

    return (
        <AnimatePresence>

        <motion.div className="modal-backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="modal-content-logs"
            variants={modal}>
                <div className='banned-container'>
                {
                    banned && banned.map((friend) => (

                        <div className="banned-members" key={friend.id}>
                                    
                            <div className="amis-image">
                                <img src={friend.avatar}/>
                            </div>
                    
                            <div className="amis-infos">
                                <p className="amis-name"><p>{friend.login}</p></p>
                            </div>
                    
                            <div className="amis-status unblock" onClick={() => handleUnban(friend.id)}>Unban</div>
                    
                        </div>
                    ))
                }
                </div>

                <div className="butt-cancel-logs">
                    <div className="But-modal Cancel-But-logs"
                    onClick={onCancel}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="ai ai-Cross"
                        >
                            <path d="M20 20L4 4m16 0L4 20" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </motion.div>
      </AnimatePresence>

    );
  }
  export default LogsModal