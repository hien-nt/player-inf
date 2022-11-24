import React from "react";
import { Link } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';


export default function ModelCase({ setIsOpen, player }) {
  return (
    <div className="modal-show" onClick={() => setIsOpen(false)}>
      <div
        id="modal1"
        className="modal"
      >
        <div className="modal-content" style={{width:"100%"}}>
          <h4 style={{textAlign:"center"}}>Video for {player.name} </h4>
            <iframe
              width="100%"
              height="400px"
              src={player.clip}
              title={player.name}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
        </div>
        <div className="modal-footer" style={{textAlign:"end"}}>
          <Link className="modal-close red-text" style={{ marginRight: "3%" }}>
            <ClearIcon fontSize="large" sx={{ color: "red" }}/>
          </Link>
        </div>
      </div>
    </div>
    
  );
}
